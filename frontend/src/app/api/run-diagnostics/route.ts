import { NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://checktop-tool.onrender.com";

export async function POST() {
  const res = await fetch(`${API_BASE}/api/run-diagnostics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return NextResponse.json(
      { success: false },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true });
}
