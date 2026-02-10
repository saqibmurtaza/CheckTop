import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  // Respond to preflight
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE}/webhook/checktop-agent-command`;
    const body = await req.json();

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AGENT_SHARED_SECRET}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json({ error: "Failed to trigger diagnostics" }, { status: 500 });
  }
}
