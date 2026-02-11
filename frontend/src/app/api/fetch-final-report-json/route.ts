// // import { NextResponse } from "next/server";

// // export async function GET() {
// //   // Fallback to empty strings to satisfy TypeScript's 'string' requirement
// //   const apiBase = process.env.NEXT_PUBLIC_API_BASE || "";
// //   const sharedSecret = process.env.NEXT_PUBLIC_SHARED_SECRET || "";

// //   if (!apiBase) {
// //     return NextResponse.json({ error: "Configuration error: API Base missing" }, { status: 500 });
// //   }

// //   try {
// //     const res = await fetch(`${apiBase}/webhook/checktop-agent-result`, {
// //       method: "GET",
// //       headers: { 
// //         "X-Shared-Secret": sharedSecret 
// //       }
// //     });

// //     if (!res.ok) {
// //       return NextResponse.json({ error: "Report not ready" }, { status: 404 });
// //     }

// //     const data = await res.json();
// //     return NextResponse.json(data);
// //   } catch (error) {
// //     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
// //   }
// // }

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     // Forward to n8n webhook that returns merged agent report
//     const webhookUrl = process.env.AGENT_RESULT_ENDPOINT;
//     if (!webhookUrl) throw new Error("AGENT_RESULT_ENDPOINT not set");

//     const res = await fetch(`${process.env.RENDER_PUBLIC_BASE_URL}${webhookUrl}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-shared-secret": process.env.AGENT_SHARED_SECRET || ""
//       }
//     });

//     if (!res.ok) throw new Error("Failed to fetch final report");

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
