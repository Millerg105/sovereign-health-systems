import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  authenticateRequest,
  buildMailto,
  buildWhatsapp,
  findLead,
  loadState,
  mutateLead,
  routeChannel,
  saveState,
  todayISO,
  type Channel,
} from "@/lib/hq";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body: {
    leadId?: number;
    channelOverride?: Channel;
    confirmSend?: boolean; // required for irreversible Resend sends
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body.leadId !== "number") {
    return NextResponse.json({ error: "Body must include leadId" }, { status: 400 });
  }

  const state = await loadState(auth.userId);
  const lead = findLead(state, body.leadId);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  if (!lead.pitchSubject || !lead.pitchBody) {
    return NextResponse.json(
      { error: "Lead has no pitch yet. Run /api/make-pitch first." },
      { status: 400 },
    );
  }

  const channel: Channel = body.channelOverride || routeChannel(lead);

  if (channel === "gmail-mailto") {
    if (!lead.email) {
      return NextResponse.json({ error: "Lead has no email — cannot send via Gmail." }, { status: 400 });
    }
    const url = buildMailto(lead.email, lead.pitchSubject, lead.pitchBody);
    return NextResponse.json({ channel, url, leadId: body.leadId });
  }

  if (channel === "whatsapp") {
    if (!lead.phone) {
      return NextResponse.json({ error: "Lead has no phone — cannot send via WhatsApp." }, { status: 400 });
    }
    const url = buildWhatsapp(lead.phone, `${lead.pitchSubject}\n\n${lead.pitchBody}`);
    return NextResponse.json({ channel, url, leadId: body.leadId });
  }

  // Resend — actually sends. Require explicit confirmation.
  if (channel === "resend") {
    if (!body.confirmSend) {
      return NextResponse.json({
        channel,
        requiresConfirm: true,
        preview: {
          from: "Sovereign Bookings <bookings@sovereignsystem.co.uk>",
          to: lead.email,
          subject: lead.pitchSubject,
          bodyPreview: (lead.pitchBody || "").slice(0, 240),
        },
      });
    }
    if (!lead.email) {
      return NextResponse.json({ error: "Lead has no email — cannot send via Resend." }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "RESEND_API_KEY missing on server" }, { status: 500 });

    const resend = new Resend(apiKey);
    const r = await resend.emails.send({
      from: "Sovereign Bookings <bookings@sovereignsystem.co.uk>",
      to: lead.email,
      subject: lead.pitchSubject,
      text: lead.pitchBody,
    });
    if (r.error) {
      return NextResponse.json({ error: `Resend failed: ${r.error.message}` }, { status: 502 });
    }

    const patch = {
      lastSentAt: new Date().toISOString(),
      lastSentChannel: "resend",
      lastSentMessageId: r.data?.id,
      lastContact: todayISO(),
    };
    const newState = mutateLead(state || {}, body.leadId, patch);
    await saveState(auth.userId, newState);

    return NextResponse.json({ channel, sent: true, messageId: r.data?.id, leadId: body.leadId });
  }

  return NextResponse.json({ error: `Unknown channel: ${channel}` }, { status: 400 });
}
