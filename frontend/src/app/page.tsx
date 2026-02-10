"use client";

import { triggerDiagnostics } from "@/lib/api";
import AgentStatus from "@/app/components/AgentStatus";

export default function HomePage() {
  async function onRunDiagnostics() {
    await triggerDiagnostics();
  }

  return (
    <main>
      <h1>CheckTop</h1>
      <p>Secure Local Diagnostics</p>

      <AgentStatus />

      <button onClick={onRunDiagnostics}>
        Run Diagnostics
      </button>
    </main>
  );
}
