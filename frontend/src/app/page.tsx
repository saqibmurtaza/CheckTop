"use client";

import { useState } from "react";
import { triggerDiagnostics, fetchFinalReport } from "@/lib/api";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const runDiagnostics = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await triggerDiagnostics();
      const report = await fetchFinalReport();
      setMessage(`Diagnostics completed. Job ID: ${report.job_id}`);
    } catch (err: any) {
      setMessage(err.message || "Failed to run diagnostics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>CheckTop</h1>
      <p>Secure Local Diagnostics</p>
      <button onClick={runDiagnostics} disabled={loading}>
        {loading ? "Running..." : "Run Diagnostics"}
      </button>
      {message && <p>{message}</p>}
    </main>
  );
}
