import { NextResponse } from "next/server";

export async function POST() {
  // Ensure we have the secret, otherwise throw a clear error
  const sharedSecret = process.env.NEXT_PUBLIC_SHARED_SECRET || "";
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;

  if (!apiBase) {
    return NextResponse.json({ error: "API Base URL is not configured" }, { status: 500 });
  }

  const res = await fetch(`${apiBase}/webhook/checktop-agent-command`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Adding the '!' or a fallback tells TS this won't be undefined
      "X-Shared-Secret": sharedSecret 
    },
    body: JSON.stringify({ action: "RUN_DIAGNOSTIC" })
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to trigger diagnostics" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}