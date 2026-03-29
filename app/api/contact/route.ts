import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_COUNT = 3;
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_JSON_PAYLOAD = 15000;
const MAX_ATTACHMENTS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf", "video/mp4"];

type ParsedRequest = {
  body: Record<string, unknown>;
  attachments: File[];
  rawLength: number;
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const normalizeString = (value: unknown) => String(value ?? "").trim();

const normalizeArray = (value: unknown) => {
  if (Array.isArray(value)) return value.map((item) => normalizeString(item)).filter(Boolean);
  const normalized = normalizeString(value);
  return normalized ? [normalized] : [];
};

async function parseRequest(req: Request): Promise<ParsedRequest> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();

    const getString = (key: string) => normalizeString(formData.get(key));
    const getAllStrings = (key: string) => formData.getAll(key).map((value) => normalizeString(value)).filter(Boolean);
    const attachments = formData
      .getAll("attachments")
      .filter((value): value is File => value instanceof File && value.size > 0);

    const body = {
      source: getString("source"),
      name: getString("name"),
      email: getString("email"),
      business: getString("business"),
      phone: getString("phone"),
      location: getString("location"),
      currentSite: getString("currentSite"),
      businessDesc: getString("businessDesc"),
      idealCustomer: getString("idealCustomer"),
      differentiator: getString("differentiator"),
      dream: getString("dream"),
      headache: getString("headache"),
      hasLogo: getString("hasLogo"),
      colours: getString("colours"),
      notes: getString("notes"),
      honeypot: getString("honeypot"),
      services: getAllStrings("services"),
      findYou: getAllStrings("findYou"),
      contactMethod: getAllStrings("contactMethod"),
      vibe: getAllStrings("vibe"),
      timeline: getAllStrings("timeline"),
    };

    const rawLength = JSON.stringify({
      ...body,
      attachments: attachments.map((file) => ({ name: file.name, size: file.size, type: file.type })),
    }).length;

    return { body, attachments, rawLength };
  }

  const rawBody = await req.text();
  if (rawBody.length > MAX_JSON_PAYLOAD) {
    throw new Error("PAYLOAD_TOO_LARGE");
  }

  return { body: JSON.parse(rawBody), attachments: [], rawLength: rawBody.length };
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

    const now = Date.now();
    const userRateData = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

    if (now - userRateData.lastRequest > RATE_LIMIT_WINDOW) {
      userRateData.count = 1;
      userRateData.lastRequest = now;
    } else {
      userRateData.count += 1;
    }
    rateLimitMap.set(ip, userRateData);

    if (userRateData.count > RATE_LIMIT_COUNT) {
      return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { body, attachments, rawLength } = await parseRequest(req);

    if (rawLength > 80000) {
      return NextResponse.json({ message: "Payload too large" }, { status: 413 });
    }

    const maliciousPattern = /<script|javascript:|on\w+=/i;
    if (maliciousPattern.test(JSON.stringify(body))) {
      return NextResponse.json({ message: "Invalid input characters" }, { status: 400 });
    }

    const source = normalizeString(body.source);
    const email = normalizeString(body.email);
    const honeypot = normalizeString(body.honeypot);

    if (honeypot) {
      return NextResponse.json({ message: "Spam detected" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ message: "Missing email" }, { status: 400 });
    }

    if (attachments.length > MAX_ATTACHMENTS) {
      return NextResponse.json({ message: `You can upload up to ${MAX_ATTACHMENTS} files.` }, { status: 400 });
    }

    for (const file of attachments) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return NextResponse.json({ message: `Unsupported file type: ${file.name}` }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ message: `${file.name} is larger than 10 MB.` }, { status: 400 });
      }
    }

    const timestamp = new Date().toISOString();
    const leadData = {
      ...body,
      email,
      source,
      timestamp,
      ip,
      id: Math.random().toString(36).substring(7),
      attachmentNames: attachments.map((file) => file.name),
    };

    try {
      const logPath = path.join(process.cwd(), "leads.log");
      const logEntry = JSON.stringify(leadData) + "\n";
      fs.appendFileSync(logPath, logEntry);
    } catch (error) {
      console.error("Local Logging Error:", error);
    }

    if (ZAPIER_WEBHOOK_URL) {
      try {
        fetch(ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
        }).catch((error) => console.error("Zapier Forwarding Error:", error));
      } catch (error) {
        console.error("Zapier fetch failed:", error);
      }
    }

    if (!resend) {
      return NextResponse.json(
        { message: "Email delivery is not configured yet. Add RESEND_API_KEY in Vercel before using this form live." },
        { status: 503 },
      );
    }

    const name = normalizeString(body.name);
    const business = normalizeString(body.business);
    const clinicName = normalizeString(body.clinicName);
    const revenue = normalizeString(body.revenue);
    const problems = normalizeString(body.problems);
    const phone = normalizeString(body.phone);
    const location = normalizeString(body.location);
    const currentSite = normalizeString(body.currentSite);
    const businessDesc = normalizeString(body.businessDesc);
    const idealCustomer = normalizeString(body.idealCustomer);
    const differentiator = normalizeString(body.differentiator);
    const dream = normalizeString(body.dream);
    const headache = normalizeString(body.headache);
    const hasLogo = normalizeString(body.hasLogo);
    const colours = normalizeString(body.colours);
    const notes = normalizeString(body.notes);
    const services = normalizeArray(body.services);
    const findYou = normalizeArray(body.findYou);
    const contactMethod = normalizeArray(body.contactMethod);
    const vibe = normalizeArray(body.vibe);
    const timeline = normalizeArray(body.timeline);

    const isClientInquiry = source === "Client Inquiry";
    const inquiryName = business || clinicName || name || "Anonymous";
    const attachmentRows = attachments.length
      ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Attachments</strong></td><td>${attachments.map((file) => escapeHtml(file.name)).join("<br />")}</td></tr>`
      : "";

    const clientInquiryHtml = `
      <div style="font-family: sans-serif; max-width: 720px; margin: auto; padding: 25px; border: 1px solid #1a1a1a; border-radius: 12px; background: #fafafa;">
        <h2 style="color: #0891b2; margin-top: 0;">New Client Inquiry Received</h2>
        <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">Source: <strong>${escapeHtml(source || "Website")}</strong></p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td>${escapeHtml(name || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Business</strong></td><td>${escapeHtml(business || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td>${escapeHtml(phone || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Area</strong></td><td>${escapeHtml(location || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Current Site</strong></td><td>${escapeHtml(currentSite || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Business Description</strong></td><td>${escapeHtml(businessDesc || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Ideal Customer</strong></td><td>${escapeHtml(idealCustomer || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Differentiator</strong></td><td>${escapeHtml(differentiator || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Services</strong></td><td>${escapeHtml(services.length ? services.join(", ") : "None selected")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Dream Outcome</strong></td><td>${escapeHtml(dream || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>How They Find You</strong></td><td>${escapeHtml(findYou.length ? findYou.join(", ") : "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Contact Method</strong></td><td>${escapeHtml(contactMethod.length ? contactMethod.join(", ") : "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Biggest Headache</strong></td><td>${escapeHtml(headache || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Logo Status</strong></td><td>${escapeHtml(hasLogo || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Colours</strong></td><td>${escapeHtml(colours || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Vibe</strong></td><td>${escapeHtml(vibe.length ? vibe.join(", ") : "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Timeline</strong></td><td>${escapeHtml(timeline.length ? timeline.join(", ") : "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Notes</strong></td><td>${escapeHtml(notes || "Not provided")}</td></tr>
          ${attachmentRows}
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>IP Address</strong></td><td>${escapeHtml(ip)}</td></tr>
        </table>
        <div style="margin-top: 30px; padding: 15px; background: #0891b2; color: white; border-radius: 8px; text-align: center;">
          <a href="mailto:${escapeHtml(email)}" style="color: white; text-decoration: none; font-weight: bold;">Reply to Inquiry</a>
        </div>
        <p style="font-size: 11px; color: #999; margin-top: 40px; text-align: center;">
          System ID: ${escapeHtml(leadData.id)} • Sent via Sovereign Systems API
        </p>
      </div>
    `;

    const defaultLeadHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #1a1a1a; border-radius: 12px; background: #fafafa;">
        <h2 style="color: #0891b2; margin-top: 0;">New Sovereign Lead Generated</h2>
        <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">Source: <strong>${escapeHtml(source || "Website")}</strong></p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td>${escapeHtml(name || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Clinic:</strong></td><td>${escapeHtml(clinicName || "Not provided")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Inquiry/ROI Data:</strong></td><td>${escapeHtml(revenue || "N/A")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Pain Points:</strong></td><td>${escapeHtml(problems || "N/A")}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>IP Address:</strong></td><td>${escapeHtml(ip)}</td></tr>
        </table>
        <div style="margin-top: 30px; padding: 15px; background: #0891b2; color: white; border-radius: 8px; text-align: center;">
          <a href="mailto:${escapeHtml(email)}" style="color: white; text-decoration: none; font-weight: bold;">Reply to Lead Immediately</a>
        </div>
        <p style="font-size: 11px; color: #999; margin-top: 40px; text-align: center;">
          System ID: ${escapeHtml(leadData.id)} • Sent via Sovereign Systems API
        </p>
      </div>
    `;

    const attachmentsForEmail = await Promise.all(
      attachments.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
        contentType: file.type,
      })),
    );

    const { error } = await resend.emails.send({
      from: "Sovereign Leads <onboarding@resend.dev>",
      to: ["miller.glenholmes@outlook.com"],
      subject: `[LEAD] ${source || "New Inquiry"}: ${inquiryName}`,
      html: isClientInquiry ? clientInquiryHtml : defaultLeadHtml,
      attachments: attachmentsForEmail,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ message: "Email delivery failed. Please try again in a moment." }, { status: 502 });
    }

    return NextResponse.json({ success: true, id: leadData.id });
  } catch (error) {
    if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
      return NextResponse.json({ message: "Payload too large" }, { status: 413 });
    }

    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
