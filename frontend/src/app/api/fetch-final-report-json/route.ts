import { NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://checktop-tool.onrender.com";

export async function GET() {
  const res = await fetch(`${API_BASE}/api/fetch-final-report-json`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Report not ready" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
