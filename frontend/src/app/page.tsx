import AgentStatus from "@/app/components/AgentStatus";

export default function HomePage() {
  return (
    <main>
      <h1>CheckTop</h1>
      <p>Secure Local Diagnostics</p>

      <AgentStatus />

      <button>
        Run Diagnostics
      </button>
    </main>
  );
}
