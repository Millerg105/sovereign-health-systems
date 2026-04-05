import { NextResponse } from "next/server"
import { Resend } from "resend"
import { google } from "googleapis"
import { getSupabaseServerClient } from "@/lib/supabase-server"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

/* ── Google Calendar ── */

const GCAL_CALENDAR_ID = "contact.sovereignsystems@gmail.com"
const GCAL_TIMEZONE = "Europe/London"

const CALL_DURATION_MINUTES: Record<string, number> = {
  "15-Min Quick Call": 15,
  "30-Min Strategy Audit": 30,
  "Full Discovery Session": 60,
}

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n")

  if (!clientEmail || !privateKey) return null

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  })

  return google.calendar({ version: "v3", auth })
}

function parseTimeTo24h(timeStr: string): { hours: number; minutes: number } {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return { hours: 9, minutes: 0 }
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const period = match[3].toUpperCase()
  if (period === "PM" && hours !== 12) hours += 12
  if (period === "AM" && hours === 12) hours = 0
  return { hours, minutes }
}

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()
const RATE_LIMIT_COUNT = 3
const RATE_LIMIT_WINDOW = 60 * 1000
const MAX_JSON_PAYLOAD = 10000

const INTERNAL_EMAIL = "contact.sovereignsystems@gmail.com"

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let result = "SV-"
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

/* ── Email Templates ── */

function buildCustomerEmail(data: {
  ref: string; callType: string; bookingDateDisplay: string; time: string; name: string
}): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #1a1a1a; border-radius: 12px; background: #fafafa;">
      <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #0891b2;">
        <h1 style="color: #0891b2; margin: 0; font-size: 24px;">Booking Confirmed</h1>
        <p style="color: #666; margin: 8px 0 0; font-size: 13px;">Reference: <strong>${escapeHtml(data.ref)}</strong></p>
      </div>

      <div style="padding: 25px 0;">
        <p style="font-size: 15px; color: #333; margin: 0 0 20px;">Hi ${escapeHtml(data.name)},</p>
        <p style="font-size: 14px; color: #555; line-height: 1.6; margin: 0 0 20px;">
          Your strategy call has been booked. Here are your details:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; width: 120px;"><strong>Call Type</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">${escapeHtml(data.callType)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;"><strong>Date</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">${escapeHtml(data.bookingDateDisplay)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;"><strong>Time</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">${escapeHtml(data.time)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #888; font-size: 13px;"><strong>Reference</strong></td>
            <td style="padding: 12px 0; color: #333; font-size: 14px; font-family: monospace;">${escapeHtml(data.ref)}</td>
          </tr>
        </table>

        <div style="background: #f0fdfa; border: 1px solid #0891b2; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <p style="font-size: 13px; color: #333; margin: 0; font-weight: bold;">What happens next:</p>
          <ul style="font-size: 13px; color: #555; margin: 8px 0 0; padding-left: 20px; line-height: 1.8;">
            <li>Miller will review your details and prepare for the call</li>
            <li>You'll receive a reminder 1 hour before your appointment</li>
            <li>No preparation needed on your end — just show up</li>
          </ul>
        </div>
      </div>

      <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999; margin: 0;">
          Need to reschedule? Reply to this email or message us on WhatsApp.
        </p>
        <p style="font-size: 11px; color: #bbb; margin: 10px 0 0;">
          Sovereign Systems &bull; sovereignsystem.co.uk
        </p>
      </div>
    </div>
  `
}

function buildInternalEmail(data: {
  ref: string; callType: string; bookingDateDisplay: string; time: string
  name: string; business: string; phone: string; email: string; helpText: string; ip: string
}): string {
  return `
    <div style="font-family: sans-serif; max-width: 720px; margin: auto; padding: 25px; border: 1px solid #1a1a1a; border-radius: 12px; background: #fafafa;">
      <h2 style="color: #0891b2; margin-top: 0;">New Booking Received</h2>
      <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">
        Reference: <strong>${escapeHtml(data.ref)}</strong>
      </p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Call Type</strong></td><td>${escapeHtml(data.callType)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Date</strong></td><td>${escapeHtml(data.bookingDateDisplay)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Time</strong></td><td>${escapeHtml(data.time)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Business</strong></td><td>${escapeHtml(data.business)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Notes</strong></td><td>${escapeHtml(data.helpText || "None")}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>IP</strong></td><td>${escapeHtml(data.ip)}</td></tr>
      </table>

      <div style="margin-top: 30px; padding: 15px; background: #0891b2; color: white; border-radius: 8px; text-align: center;">
        <a href="mailto:${escapeHtml(data.email)}" style="color: white; text-decoration: none; font-weight: bold;">Reply to Customer</a>
      </div>

      <p style="font-size: 11px; color: #999; margin-top: 40px; text-align: center;">
        Ref: ${escapeHtml(data.ref)} &bull; Sent via Sovereign Booking API
      </p>
    </div>
  `
}

/* ── Route Handler ── */

export async function POST(req: Request) {
  try {
    // Rate limiting
    const forwarded = req.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1"
    const now = Date.now()
    const userRateData = rateLimitMap.get(ip) || { count: 0, lastRequest: now }

    if (now - userRateData.lastRequest > RATE_LIMIT_WINDOW) {
      userRateData.count = 1
      userRateData.lastRequest = now
    } else {
      userRateData.count += 1
    }
    rateLimitMap.set(ip, userRateData)

    if (userRateData.count > RATE_LIMIT_COUNT) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 },
      )
    }

    // Parse and validate
    const rawBody = await req.text()
    if (rawBody.length > MAX_JSON_PAYLOAD) {
      return NextResponse.json({ message: "Payload too large" }, { status: 413 })
    }

    const body = JSON.parse(rawBody) as Record<string, unknown>

    const maliciousPattern = /<script|javascript:|on\w+=/i
    if (maliciousPattern.test(JSON.stringify(body))) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 })
    }

    if (body.honeypot) {
      return NextResponse.json({ message: "Spam detected" }, { status: 400 })
    }

    const callType = String(body.callType ?? "").trim()
    const bookingDateISO = String(body.bookingDateISO ?? "").trim()
    const bookingDateDisplay = String(body.bookingDateDisplay ?? "").trim()
    const time = String(body.time ?? "").trim()
    const name = String(body.name ?? "").trim()
    const business = String(body.business ?? "").trim()
    const phone = String(body.phone ?? "").trim()
    const email = String(body.email ?? "").trim()
    const helpText = String(body.helpText ?? "").trim()

    if (!callType || !bookingDateISO || !bookingDateDisplay || !time || !name || !business || !phone || !email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 })
    }

    const parsedDate = new Date(bookingDateISO)
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ message: "Invalid date" }, { status: 400 })
    }
    const bookingDate = parsedDate.toISOString().split("T")[0]

    // Generate server-side ref
    const ref = generateRef()

    // Insert into Supabase
    const supabase = getSupabaseServerClient()
    const { error: dbError } = await supabase.from("bookings").insert({
      ref,
      call_type: callType,
      booking_date: bookingDate,
      booking_date_display: bookingDateDisplay,
      booking_time: time,
      name,
      business,
      phone,
      email,
      help_text: helpText,
      ip_address: ip,
    })

    if (dbError) {
      console.error("Supabase insert error:", dbError)
      return NextResponse.json(
        { message: "Failed to save booking. Please try again." },
        { status: 502 },
      )
    }

    // Send emails
    if (resend) {
      const customerHtml = buildCustomerEmail({ ref, callType, bookingDateDisplay, time, name })
      const internalHtml = buildInternalEmail({
        ref, callType, bookingDateDisplay, time, name, business, phone, email, helpText, ip,
      })

      const [customerResult, internalResult] = await Promise.allSettled([
        resend.emails.send({
          from: "Sovereign Systems <bookings@sovereignsystem.co.uk>",
          to: [email],
          subject: `Booking Confirmed — ${ref}`,
          html: customerHtml,
        }),
        resend.emails.send({
          from: "Sovereign Systems <bookings@sovereignsystem.co.uk>",
          to: [INTERNAL_EMAIL],
          subject: `[BOOKING] ${callType}: ${name} — ${ref}`,
          html: internalHtml,
        }),
      ])

      if (customerResult.status === "rejected") {
        console.error("Customer email failed:", customerResult.reason)
      }
      if (internalResult.status === "rejected") {
        console.error("Internal email failed:", internalResult.reason)
      }
    }

    // Create Google Calendar event
    const calendar = getCalendarClient()
    if (calendar) {
      try {
        const { hours, minutes } = parseTimeTo24h(time)
        const startDate = new Date(bookingDateISO)
        startDate.setHours(hours, minutes, 0, 0)
        const durationMin = CALL_DURATION_MINUTES[callType] ?? 45
        const endDate = new Date(startDate.getTime() + durationMin * 60 * 1000)

        await calendar.events.insert({
          calendarId: GCAL_CALENDAR_ID,
          requestBody: {
            summary: `${callType} — ${name} (${business})`,
            description: [
              `Booking Ref: ${ref}`,
              `Call Type: ${callType}`,
              `Client: ${name}`,
              `Business: ${business}`,
              `Phone: ${phone}`,
              `Email: ${email}`,
              helpText ? `Notes: ${helpText}` : "",
            ].filter(Boolean).join("\n"),
            start: { dateTime: startDate.toISOString(), timeZone: GCAL_TIMEZONE },
            end: { dateTime: endDate.toISOString(), timeZone: GCAL_TIMEZONE },
            reminders: {
              useDefault: false,
              overrides: [
                { method: "popup", minutes: 60 },
                { method: "popup", minutes: 15 },
              ],
            },
          },
        })
      } catch (calError) {
        console.error("Google Calendar event failed:", calError)
      }
    }

    return NextResponse.json({ success: true, ref })
  } catch (error) {
    console.error("Booking API Error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
