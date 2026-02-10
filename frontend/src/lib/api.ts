// src/lib/api.ts - Render-only API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://checktop-tool.onrender.com";

export async function triggerDiagnostics(): Promise<void> {
  const res = await fetch(`${API_BASE}/api/run-diagnostics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Failed to trigger diagnostics via Render API");
}

export async function fetchFinalReport(): Promise<any> {
  const res = await fetch(`${API_BASE}/api/fetch-final-report-json`, { cache: "no-store" });
  if (!res.ok) throw new Error("Report not ready yet");
  return res.json();
}
