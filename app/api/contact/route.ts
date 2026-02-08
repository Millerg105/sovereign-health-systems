import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Note: You must set these in your environment variables (Vercel/Local)
const resend = new Resend(process.env.RESEND_API_KEY);
const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;

// Simple in-memory rate limiting (Note: This is per-serverless-instance)
// For robust rate limiting in production, use Upstash/Redis.
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_COUNT = 3; // 3 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export async function POST(req: Request) {
    try {
        // 1. Get Client IP for Rate Limiting
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

        // 2. Perform Rate Limiting
        const now = Date.now();
        const userRateData = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

        if (now - userRateData.lastRequest > RATE_LIMIT_WINDOW) {
            userRateData.count = 1;
            userRateData.lastRequest = now;
        } else {
            userRateData.count++;
        }
        rateLimitMap.set(ip, userRateData);

        if (userRateData.count > RATE_LIMIT_COUNT) {
            return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
        }

        // 3. Payload Size Limit
        const rawBody = await req.text();
        if (rawBody.length > 5000) {
            return NextResponse.json({ message: 'Payload too large' }, { status: 413 });
        }

        const body = JSON.parse(rawBody);
        const { name, email, clinicName, revenue, problems, honeypot, source } = body;

        // 4. Security: Prevent malicious injection patterns (Basic)
        const maliciousPattern = /<script|javascript:|on\w+=/i;
        if (maliciousPattern.test(JSON.stringify(body))) {
            return NextResponse.json({ message: 'Invalid input characters' }, { status: 400 });
        }

        // 5. Basic Honeypot Antispam
        if (honeypot) {
            return NextResponse.json({ message: 'Spam detected' }, { status: 400 });
        }

        // 6. Server-side validation
        if (!email) {
            return NextResponse.json({ message: 'Missing email' }, { status: 400 });
        }

        const timestamp = new Date().toISOString();
        const leadData = {
            ...body,
            timestamp,
            ip, // For internal tracking if needed
            id: Math.random().toString(36).substring(7)
        };

        // Failsafe Local Logging
        try {
            const logPath = path.join(process.cwd(), 'leads.log');
            const logEntry = JSON.stringify(leadData) + '\n';
            fs.appendFileSync(logPath, logEntry);
        } catch (e) {
            console.error('Local Logging Error:', e);
        }

        // Forward to Zapier Webhook (Server-side environment variable)
        if (ZAPIER_WEBHOOK_URL) {
            try {
                fetch(ZAPIER_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(leadData)
                }).catch(err => console.error('Zapier Forwarding Error:', err));
            } catch (e) {
                console.error('Zapier fetch failed:', e);
            }
        }

        // Send Email Notification via Resend
        if (process.env.RESEND_API_KEY) {
            try {
                const { data, error } = await resend.emails.send({
                    from: 'Sovereign Leads <onboarding@resend.dev>',
                    to: ['miller@sovereignhealthsystems.co.uk'],
                    subject: `[LEAD] ${source || 'New Inquiry'}: ${clinicName || name || 'Anonymous'}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #1a1a1a; border-radius: 12px; background: #fafafa;">
                            <h2 style="color: #0891b2; margin-top: 0;">New Sovereign Lead Generated</h2>
                            <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">Source: <strong>${source || 'Website'}</strong></p>
                            
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td>${name || 'Not provided'}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Clinic:</strong></td><td>${clinicName || 'Not provided'}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Inquiry/ROI Data:</strong></td><td>${revenue || 'N/A'}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Pain Points:</strong></td><td>${problems || 'N/A'}</td></tr>
                                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>IP Address:</strong></td><td>${ip}</td></tr>
                            </table>

                            <div style="margin-top: 30px; padding: 15px; background: #0891b2; color: white; border-radius: 8px; text-align: center;">
                                <a href="mailto:${email}" style="color: white; text-decoration: none; font-weight: bold;">Reply to Lead Immediately</a>
                            </div>
                            
                            <p style="font-size: 11px; color: #999; margin-top: 40px; text-align: center;">
                                System ID: ${leadData.id} • Sent via Sovereign Health Systems API
                            </p>
                        </div>
                    `,
                });

                if (error) console.error('Resend Error:', error);
            } catch (e) {
                console.error('Email sending failed:', e);
            }
        }

        return NextResponse.json({ success: true, id: leadData.id });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
