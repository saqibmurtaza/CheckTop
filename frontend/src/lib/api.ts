// src/lib/api.ts — FINAL PRODUCTION VERSION (NO LOCALHOST)

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://checktop-tool.onrender.com";

/**
 * Triggers diagnostics via Render backend.
 * Backend / n8n handles agent invocation.
 */
export async function triggerDiagnostics(): Promise<void> {
  const response = await fetch(`${API_BASE}/api/run-diagnostics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to trigger diagnostics");
  }
}

/**
 * Fetches final merged diagnostic report from backend.
 */
export async function fetchFinalReport(): Promise<any> {
  const res = await fetch(`${API_BASE}/api/fetch-final-report-json`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Report not ready");
  }

  return res.json();
}

/**
 * Retries fetching the report until available.
 */
export async function fetchReportWithRetry(
  retries = 10,
  delayMs = 5000
): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await fetchFinalReport();
      if (data) return data;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error("Diagnostics timed out");
}

/**
 * Generates and downloads a PDF summary of the diagnostic results.
 */
export async function downloadReportPdf(reportJson: any) {
  try {
    const jsPDF = (await import("jspdf")).default;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("CheckTop Diagnostic Report", 10, 20);

    doc.setFontSize(10);
    const content = JSON.stringify(reportJson, null, 2);
    const lines = doc.splitTextToSize(content, 180);

    doc.text(lines, 10, 30);
    doc.save(`Diagnostic_Report_${reportJson.job_id || "export"}.pdf`);
  } catch {
    const blob = new Blob([JSON.stringify(reportJson, null, 2)], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Health_Check_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
