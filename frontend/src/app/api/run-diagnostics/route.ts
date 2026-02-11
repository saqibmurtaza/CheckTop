import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward to n8n webhook that triggers the local agent
    const webhookUrl = process.env.AGENT_COMMAND_ENDPOINT;
    if (!webhookUrl) throw new Error("AGENT_COMMAND_ENDPOINT not set");

    const res = await fetch(`${process.env.RENDER_PUBLIC_BASE_URL}${webhookUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-shared-secret": process.env.AGENT_SHARED_SECRET || ""
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Failed to trigger n8n workflow");

    return NextResponse.json({ success: true, message: "Diagnostics triggered" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
