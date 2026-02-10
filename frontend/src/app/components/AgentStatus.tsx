"use client";

export default function AgentStatus() {
  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <p>ℹ️ Local diagnostics require the CheckTop Diagnostic Agent.</p>
      <p>
        Download, run the agent, keep it open, then click <strong>“Run Diagnostics”</strong> on this page.
      </p>
      <a
        href="/downloads/CheckTop-Diagnostic-Agent.exe"
        download
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: "4px",
          textDecoration: "none"
        }}
      >
        Download Agent
      </a>
    </div>
  );
}
