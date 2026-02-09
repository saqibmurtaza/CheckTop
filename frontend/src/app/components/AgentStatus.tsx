"use client";

import { useEffect, useState } from "react";

export default function AgentStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">(
    "checking"
  );

  useEffect(() => {
    fetch("http://127.0.0.1:9797/health")
      .then(() => setStatus("online"))
      .catch(() => setStatus("offline"));
  }, []);

  if (status === "checking") return <p>Checking agent…</p>;
  if (status === "offline") return <p>Agent not running</p>;

  return <p>Agent connected</p>;
}
