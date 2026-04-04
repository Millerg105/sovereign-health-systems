/*
 * Twilio Missed-Call Text-Back Webhook
 *
 * Dashboard setup:
 *
 * 1. Phone number → Voice config → "A call comes in" → TwiML Bin:
 *
 *    <?xml version="1.0" encoding="UTF-8"?>
 *    <Response>
 *      <Dial timeout="20">+44XXXXXXXXXX</Dial>
 *      <Say voice="alice">Sorry we missed your call. We'll text you a link to book a time.</Say>
 *    </Response>
 *
 *    Replace +44XXXXXXXXXX with the real forwarding number.
 *    timeout="20" gives ~4 rings before Twilio gives up.
 *
 * 2. Phone number → Status callback URL:
 *    https://sovereignsystem.co.uk/api/twilio/missed-call  (POST)
 *
 * 3. Add env vars to Vercel project settings:
 *    TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TWILIO_WEBHOOK_URL
 */

import { NextResponse } from "next/server"
import { validateRequest } from "twilio"
import { getTwilioClient } from "@/lib/twilio"

/* ── Rate Limiting (per caller number) ── */

const smsRateLimitMap = new Map<string, { count: number; lastRequest: number }>()
const SMS_RATE_LIMIT_COUNT = 1
const SMS_RATE_LIMIT_WINDOW = 5 * 60 * 1000

/* ── Constants ── */

const MISSED_CALL_SMS =
  "Hey! Sorry we missed your call. Book a time that works for you here: https://sovereignsystem.co.uk/book — Sovereign Systems"

/* ── Signature Validation ── */

function isValidTwilioSignature(
  signature: string | null,
  url: string,
  params: Record<string, string>,
): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (!signature || !authToken) return false
  return validateRequest(authToken, signature, url, params)
}

/* ── Route Handler ── */

export async function POST(req: Request) {
  try {
    // Parse form-urlencoded body (Twilio sends x-www-form-urlencoded, not JSON)
    const bodyText = await req.text()
    const params = Object.fromEntries(new URLSearchParams(bodyText))

    // Validate Twilio signature
    const signature = req.headers.get("x-twilio-signature")
    const webhookUrl = process.env.TWILIO_WEBHOOK_URL

    if (!webhookUrl) {
      console.error("TWILIO_WEBHOOK_URL is not configured")
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    if (!isValidTwilioSignature(signature, webhookUrl, params)) {
      console.error("Invalid Twilio signature rejected")
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Extract fields
    const callStatus = params.CallStatus ?? ""
    const from = params.From ?? ""
    const to = params.To ?? ""
    const callSid = params.CallSid ?? ""
    const direction = params.Direction ?? ""

    // Only process inbound missed calls
    if (direction !== "inbound") {
      return NextResponse.json({ success: true, action: "ignored", reason: "outbound call" })
    }

    if (callStatus !== "no-answer" && callStatus !== "busy") {
      return NextResponse.json({ success: true, action: "ignored", reason: callStatus })
    }

    // Validate caller number (E.164 format, not anonymous/blocked)
    if (!from || !from.startsWith("+") || from.length < 8) {
      console.error("Invalid or blocked caller number:", from)
      return NextResponse.json({ success: true, action: "skipped", reason: "invalid caller" })
    }

    // Rate limit per caller number
    const now = Date.now()
    const callerRateData = smsRateLimitMap.get(from) || { count: 0, lastRequest: now }

    if (now - callerRateData.lastRequest > SMS_RATE_LIMIT_WINDOW) {
      callerRateData.count = 1
      callerRateData.lastRequest = now
    } else {
      callerRateData.count += 1
    }
    smsRateLimitMap.set(from, callerRateData)

    if (callerRateData.count > SMS_RATE_LIMIT_COUNT) {
      console.error("SMS rate limit hit for:", from)
      return NextResponse.json({ success: true, action: "rate_limited" })
    }

    // Log the missed call
    console.error(
      `Missed call: CallSid=${callSid} From=${from} To=${to} Status=${callStatus}`
    )

    // Send SMS
    const twilio = getTwilioClient()
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER

    if (!twilioPhone) {
      console.error("TWILIO_PHONE_NUMBER is not configured")
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    await twilio.messages.create({
      body: MISSED_CALL_SMS,
      from: twilioPhone,
      to: from,
    })

    return NextResponse.json({ success: true, action: "sms_sent" })
  } catch (error) {
    console.error("Twilio Missed Call API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
