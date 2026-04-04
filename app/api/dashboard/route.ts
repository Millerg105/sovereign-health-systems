import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET() {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Dashboard fetch error:", error)
      return NextResponse.json(
        { message: "Failed to fetch bookings." },
        { status: 502 },
      )
    }

    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error("Dashboard route error:", err)
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    )
  }
}
