import AgentStatus from "@/app/components/AgentStatus";

export default function HomePage() {
  return (
    <main>
      <h1>CheckTop</h1>
      <p>Secure Local Diagnostics</p>

      {/* Client-only agent detection */}
      <AgentStatus />
    </main>
  );
}
