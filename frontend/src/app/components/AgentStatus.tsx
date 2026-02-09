"use client";

import { useEffect, useState } from "react";

type AgentState = "RUNNING" | "NOT_RUNNING" | "UNKNOWN";

export default function AgentStatus() {
  const [state, setState] = useState<AgentState>("UNKNOWN");

  useEffect(() => {
    checkLocalAgent();
  }, []);

  async function checkLocalAgent() {
    try {

      const res = await fetch("https://localhost:9797/health", { cache: "no-store" });

      if (!res.ok) throw new Error("Agent unreachable");

      setState("RUNNING");
    } catch {
      setState("NOT_RUNNING");
    }
  }

  // ---- UI ----

  if (state === "RUNNING") {
    return <p>✅ CheckTop Agent detected</p>;
  }

  if (state === "NOT_RUNNING") {
    return <p>❌ CheckTop Agent not running on this machine</p>;
  }

  return <p>ℹ️ Run the CheckTop Local Agent to enable diagnostics.</p>;
}
