import Twilio from "twilio"

let twilioClient: ReturnType<typeof Twilio> | null = null

export function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!accountSid || !authToken) {
    throw new Error(
      "Twilio client is not configured. Add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN."
    )
  }

  if (!twilioClient) {
    twilioClient = Twilio(accountSid, authToken)
  }

  return twilioClient
}
