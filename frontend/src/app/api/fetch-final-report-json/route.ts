// import { NextRequest, NextResponse } from "next/server";
// import { existsSync, readFileSync } from "fs";
// import { join } from "path";
// import { homedir } from "os";

// export async function GET(req: NextRequest) {
//   const reportPath = join(homedir(), "AppData", "Roaming", "CheckTop Local Agent", "last_report.json");

//   if (!existsSync(reportPath)) {
//     return NextResponse.json({ error: "Report not ready yet" }, { status: 404 });
//   }

//   try {
//     const report = JSON.parse(readFileSync(reportPath, "utf-8"));
//     return NextResponse.json(report, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to read report" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";

export async function GET(req: NextRequest) {
  const reportPath = join(homedir(), "AppData", "Roaming", "CheckTop Local Agent", "last_report.json");

  if (!existsSync(reportPath)) {
    return NextResponse.json({ error: "Report not ready yet" }, { status: 404 });
  }

  try {
    const report = JSON.parse(readFileSync(reportPath, "utf-8"));
    return NextResponse.json(report, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to read report" }, { status: 500 });
  }
}