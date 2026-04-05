import { NextResponse } from "next/server"

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
      const missing = [
        !url && "NEXT_PUBLIC_SUPABASE_URL",
        !key && "SUPABASE_SERVICE_ROLE_KEY",
      ].filter(Boolean)
      console.error("Dashboard: missing env vars:", missing.join(", "))
      return NextResponse.json(
        { message: `Missing env vars: ${missing.join(", ")}` },
        { status: 500 },
      )
    }

    // Dynamic import to avoid throwing at module level if env vars are missing
    const { getSupabaseServerClient } = await import("@/lib/supabase-server")
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Dashboard fetch error:", error.message, error.code)
      return NextResponse.json(
        { message: `Supabase error: ${error.message}` },
        { status: 502 },
      )
    }

    return NextResponse.json(data ?? [])
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("Dashboard route error:", msg)
    return NextResponse.json(
      { message: msg },
      { status: 500 },
    )
  }
}
