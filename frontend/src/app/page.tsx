"use client";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)",
        color: "white",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, marginBottom: "16px", lineHeight: "1.2" }}>
            CheckTop
          </h1>
          <div style={{ fontSize: "1.8rem", fontWeight: 300, marginBottom: "40px", opacity: 0.9 }}>
            Laptop Health Check Before You Buy
          </div>
        </div>
      </section>

      {/* Download Agent Section - MOVED TO TOP */}
      <section style={{ padding: "80px 20px", background: "#ffffff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "20px", color: "#1a73e8" }}>
            Download & Run Diagnostics
          </h2>

          <div style={{
            background: "#f8f9fa",
            borderRadius: "16px",
            padding: "48px",
            marginBottom: "40px",
            border: "2px solid #e8f0fe"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🖥️</div>
            <p style={{ fontSize: "1.3rem", color: "#202124", maxWidth: "600px", margin: "0 auto 30px", fontWeight: 500 }}>
              Download the CheckTop Agent, run it, and get your complete laptop health report in 2 minutes
            </p>

            {/* Download Button */}
            <a
              href="/downloads/CheckTop-Diagnostic-Agent.exe"
              style={{
                display: "inline-block",
                background: "#1a73e8",
                color: "white",
                padding: "20px 48px",
                borderRadius: "40px",
                fontSize: "1.3rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(26,115,232,0.3)",
                transition: "transform 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              ⬇️ Download CheckTop Agent (Windows)
            </a>

            <div style={{ marginTop: "20px", fontSize: "1rem", color: "#5f6368" }}>
              Windows 10 / 11 • 5 MB • Takes less than 1 minute
            </div>
          </div>

          {/* Simple Steps */}
          <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap", marginTop: "40px" }}>
            {[
              { step: "1", title: "Download", desc: "Download the CheckTop Agent" },
              { step: "2", title: "Run", desc: "Double-click to run diagnostics" },
              { step: "3", title: "Get Report", desc: "View your complete health report" }
            ].map((item) => (
              <div key={item.step} style={{ flex: "1", minWidth: "200px", padding: "24px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "#1a73e8",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  lineHeight: "48px",
                  margin: "0 auto 16px"
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "8px", color: "#202124" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#5f6368" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div style={{
            marginTop: "60px",
            padding: "24px",
            background: "#e8f0fe",
            borderRadius: "12px",
            display: "inline-block"
          }}>
            <span style={{ color: "#1a73e8", fontWeight: 600 }}>✓ Runs completely offline • No data sent to cloud</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 20px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "40px", color: "#1a73e8", textAlign: "center" }}>
            What CheckTop Checks
          </h2>
          
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {[
              "🔋 Battery Health – Detects weak or degraded batteries",
              "⚡ CPU & Performance – Identifies throttling or overheating",
              "💾 Storage Health – Checks drive condition and free space",
              "🖥️ Display Issues – Identifies dead pixels and screen problems",
              "🔌 Ports & Audio – Verifies USB, HDMI, and speaker functionality",
              "📊 Overall Verdict – Clear GOOD / FAIR / POOR assessment"
            ].map((item, index) => (
              <div key={index} style={{ 
                marginBottom: "16px", 
                padding: "16px",
                background: index % 2 === 0 ? "#f8f9fa" : "transparent",
                borderRadius: "8px",
                fontSize: "1.1rem"
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#202124", color: "white", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "20px" }}>CheckTop by Digital SM Studio</div>
          <div style={{ color: "#9aa0a6", fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} CheckTop. All diagnostics run locally on your device.
          </div>
        </div>
      </footer>
    </div>
  );
}