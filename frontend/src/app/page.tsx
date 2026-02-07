// "use client";

// import { useState } from "react";
// import { triggerDiagnostics, fetchReportWithRetry, downloadReportPdf } from "@/lib/api";

// export default function HomePage() {
//   const [status, setStatus] = useState<"idle" | "running" | "completed">("idle");
//   const [error, setError] = useState<string | null>(null);
//   const [report, setReport] = useState<any | null>(null);
//   const [prettyReport, setPrettyReport] = useState<string>("");

//   const handleStartDiagnostics = async () => {
//     setStatus("running");
//     setError(null);
//     setReport(null);
//     setPrettyReport("");

//     try {
//       // 1. Kick off the agent
//       await triggerDiagnostics();

//       // 2. Poll for the report
//       const finalReport = await fetchReportWithRetry();
//       setReport(finalReport);

//       // 3. Get the pretty text report
//       try {
//         const response = await fetch('http://localhost:5000/simple-report');
//         if (response.ok) {
//           const result = await response.json();
//           if (result.success && result.textSummary) {
//             setPrettyReport(result.textSummary);
//           }
//         }
//       } catch (parseError) {
//         console.log("Could not get pretty report");
//       }

//       setStatus("completed");
//     } catch (err: any) {
//       setError(err.message || "Failed to complete diagnostics");
//       setStatus("idle");
//     }
//   };

//   return (
//     <main style={{ padding: "2rem", fontFamily: "monospace", maxWidth: "900px", margin: "0 auto" }}>
//       <h1 style={{ fontFamily: "sans-serif" }}>CheckTop Laptop Diagnostics</h1>

//       <section style={{ marginBottom: "2rem" }}>
//         <button 
//           onClick={handleStartDiagnostics} 
//           disabled={status === "running"}
//           style={{
//             padding: "12px 24px",
//             fontSize: "16px",
//             backgroundColor: status === "running" ? "#ccc" : "#0070f3",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: status === "running" ? "not-allowed" : "pointer",
//             fontFamily: "sans-serif"
//           }}
//         >
//           {status === "running" ? "Running Checks... Please check your terminal" : "Start Laptop Health Check"}
//         </button>
//       </section>

//       {error && (
//         <div style={{ 
//           backgroundColor: "#ffebee", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           borderLeft: "4px solid #f44336"
//         }}>
//           <p style={{ color: "#c62828", margin: 0, fontFamily: "sans-serif" }}>
//             <strong>Error:</strong> {error}
//           </p>
//         </div>
//       )}

//       {status === "completed" && prettyReport && (
//         <div style={{ 
//           border: "1px solid #e0e0e0", 
//           padding: "2rem", 
//           borderRadius: "8px",
//           backgroundColor: "#fafafa",
//           marginTop: "2rem"
//         }}>
//           <h2 style={{ color: "#333", marginBottom: "1.5rem", textAlign: "center", fontFamily: "sans-serif" }}>
//             📋 Laptop Health Report
//           </h2>
          
//           {/* Display the pretty text report - EXACTLY as parser generates */}
//           <pre style={{ 
//             whiteSpace: "pre-wrap",
//             fontFamily: "monospace",
//             fontSize: "14px",
//             lineHeight: "1.5",
//             backgroundColor: "white",
//             padding: "1.5rem",
//             borderRadius: "4px",
//             border: "1px solid #e0e0e0",
//             overflowX: "auto"
//           }}>
//             {prettyReport}
//           </pre>
          
//           <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "center", fontFamily: "sans-serif" }}>
//             <button 
//               onClick={() => report && downloadReportPdf(report)}
//               disabled={!report}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: report ? "#0070f3" : "#ccc",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: report ? "pointer" : "not-allowed"
//               }}
//             >
//               Download Full Report (PDF)
//             </button>
            
//             <button 
//               onClick={() => {
//                 if (prettyReport) {
//                   const blob = new Blob([prettyReport], { type: 'text/plain' });
//                   const url = URL.createObjectURL(blob);
//                   const a = document.createElement('a');
//                   a.href = url;
//                   a.download = `Laptop_Health_Report_${new Date().toISOString().slice(0, 10)}.txt`;
//                   a.click();
//                   URL.revokeObjectURL(url);
//                 }
//               }}
//               disabled={!prettyReport}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: prettyReport ? "#4caf50" : "#ccc",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: prettyReport ? "pointer" : "not-allowed"
//               }}
//             >
//               Download Text Report
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { triggerDiagnostics, fetchReportWithRetry, downloadReportPdf } from "@/lib/api";

export default function LandingPage() {
  const [status, setStatus] = useState<"idle" | "running" | "completed" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any | null>(null);
  const [prettyReport, setPrettyReport] = useState<string>("");
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);

  const handleStartDiagnostics = async () => {
    setStatus("running");
    setError(null);
    setReport(null);
    setPrettyReport("");
    setDiagnosticResults(null);

    try {
      // 1. Kick off the agent
      await triggerDiagnostics();

      // 2. Poll for the report
      const finalReport = await fetchReportWithRetry();
      setReport(finalReport);

      // 3. Get the pretty text report
      // try {
      //   const response = await fetch('http://localhost:5000/simple-report');
      //   if (response.ok) {
      //     const result = await response.json();
      //     if (result.success) {
      //       if (result.textSummary) {
      //         setPrettyReport(result.textSummary);
      //       }
      //       if (result.data) {
      //         setDiagnosticResults(result.data);
      //       }
      //     }
      //   }
      // } catch (parseError) {
      //   console.log("Could not get parsed report");
      // }

      setStatus("completed");
    } catch (err: any) {
      setError(err.message || "Failed to complete diagnostics");
      setStatus("failed");
    }
  };


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
          
          <button
            // onClick={handleStartDiagnostics}
            onClick={() => {
              alert("Please install the CheckTop Diagnostic Agent first.");
            }}

            disabled={status === "running"}
            style={{
              background: "#ff6b35",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: 600,
              padding: "16px 48px",
              borderRadius: "8px",
              border: "none",
              cursor: status === "running" ? "not-allowed" : "pointer",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              if (status !== "running") {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
              }
            }}
            onMouseOut={(e) => {
              if (status !== "running") {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            {status === "running" ? "Running Diagnostics..." : "Start Laptop Check"}
          </button>
        </div>
      </section>

    
      {/* Diagnostic Results Area - SIMPLIFIED */}
      <section style={{ padding: "60px 20px", background: "#f8f9fa", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {status === "idle" && (
              <div style={{ color: "#5f6368" }}>
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔍</div>
                <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                  Embedded CheckTop Diagnostic Tool
                </div>
                <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#80868b" }}>
                  Click "Start Laptop Check" above to begin diagnostics
                </div>
              </div>
            )}
            
            {status === "running" && (
              <div style={{ color: "#5f6368" }}>
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔧</div>
                <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                  Running Diagnostics...
                </div>
                <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#80868b" }}>
                  Please wait while we check your laptop's health
                </div>
                <div style={{
                  marginTop: "30px",
                  width: "200px",
                  height: "4px",
                  background: "#f1f3f4",
                  borderRadius: "2px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: "70%",
                    height: "100%",
                    background: "#1a73e8",
                    animation: "loading 2s ease-in-out infinite"
                  }}></div>
                </div>
                <style jsx>{`
                  @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                  }
                `}</style>
              </div>
            )}
            
            {status === "completed" && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
                <div style={{ fontSize: "1.2rem", marginBottom: "10px", fontWeight: 600, color: "#34a853" }}>
                  Diagnostics Complete
                </div>
                <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#5f6368", marginBottom: "40px" }}>
                  Your laptop health report is ready for download
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => report && downloadReportPdf(report)}
                    style={{
                      padding: "12px 24px",
                      background: "#1a73e8",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    📄 Download Full Report (PDF)
                  </button>
                  
                  {/* <button
                    onClick={() => {
                      if (prettyReport) {
                        const blob = new Blob([prettyReport], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `CheckTop_Report_${new Date().toISOString().slice(0, 10)}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }
                      }}
                      disabled={!prettyReport}
                      style={{
                        padding: "12px 24px",
                        background: prettyReport ? "#34a853" : "#ccc",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: prettyReport ? "pointer" : "not-allowed",
                        fontSize: "1rem",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                  >
                    📝 Download Text Report
                  </button> */}
                  
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setReport(null);
                      setPrettyReport("");
                    }}
                    style={{
                      padding: "12px 24px",
                      background: "#f8f9fa",
                      color: "#5f6368",
                      border: "1px solid #dadce0",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: 600
                    }}
                  >
                    Run New Check
                  </button>
                </div>
                
                {/* Success Message */}
                <div style={{
                  marginTop: "40px",
                  padding: "15px",
                  background: "#f0f7ff",
                  borderRadius: "8px",
                  maxWidth: "500px",
                  fontSize: "0.9rem",
                  color: "#1a73e8"
                }}>
                  <strong>✓ Success!</strong> Report saved locally. You can download it anytime.
                </div>
              </div>
            )}
            
            {status === "failed" && (
              <div style={{ color: "#5f6368" }}>
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>❌</div>
                <div style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#ea4335" }}>
                  Diagnostics Failed
                </div>
                {error && (
                  <div style={{ marginTop: "20px", padding: "15px", background: "#fce8e6", borderRadius: "8px", color: "#c5221f", maxWidth: "500px" }}>
                    {error}
                  </div>
                )}
                <button
                  onClick={handleStartDiagnostics}
                  style={{
                    marginTop: "30px",
                    padding: "12px 24px",
                    background: "#1a73e8",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 600
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Download Agent Section */}
<section style={{ padding: "80px 20px", background: "#ffffff" }}>
  <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
    <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "20px", color: "#1a73e8" }}>
      Download & Run Diagnostics
    </h2>

    <p style={{ fontSize: "1.2rem", color: "#5f6368", maxWidth: "700px", margin: "0 auto 30px" }}>
      To accurately check your laptop’s health, CheckTop uses a secure local diagnostic agent.
      The agent runs directly on your laptop and performs all checks locally.
    </p>

    {/* Trust bullets */}
    <div style={{ maxWidth: "500px", margin: "0 auto 40px", textAlign: "left" }}>
      {[
        "Runs only on your laptop",
        "No remote access or screen control",
        "No personal files or browsing data collected",
        "Runs only when you click Start Laptop Check"
      ].map((item, index) => (
        <div key={index} style={{ marginBottom: "12px", paddingLeft: "28px", position: "relative" }}>
          <span style={{
            position: "absolute",
            left: 0,
            color: "#34a853",
            fontWeight: "bold"
          }}>
            ✓
          </span>
          {item}
        </div>
      ))}
    </div>

    {/* Download Button */}
    <a
      href="/downloads/CheckTop-Diagnostic-Agent.exe"
      style={{
        display: "inline-block",
        background: "#1a73e8",
        color: "white",
        padding: "16px 36px",
        borderRadius: "8px",
        fontSize: "1.1rem",
        fontWeight: 600,
        textDecoration: "none"
      }}
    >
      Download CheckTop Diagnostic Agent (Windows)
    </a>

    <div style={{ marginTop: "12px", fontSize: "0.9rem", color: "#80868b" }}>
      Windows 10 / 11 · One-time install · Takes less than 1 minute
    </div>
  </div>
</section>


      {/* Tool Description Section */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "40px", color: "#1a73e8", textAlign: "center" }}>
            CheckTop - Tool
          </h2>
          
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "30px", textAlign: "center", lineHeight: "1.6" }}>
              Instantly check a laptop's battery, performance, storage, and display health directly in your browser.
            </p>
            
            <div style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
              {["One-time secure agent installation required", "No data stored on our servers", "Diagnostics run locally on your device", "Designed for non-technical users"].map((item, index) => (
                <div key={index} style={{ marginBottom: "16px", paddingLeft: "32px", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, color: "#34a853", fontWeight: "bold", fontSize: "1.2rem" }}>✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <div style={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center", color: "#1a73e8", marginTop: "40px", paddingTop: "30px", borderTop: "2px solid #f1f3f4" }}>
              One-time install. No technical knowledge required.
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: "80px 20px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "40px", color: "#1a73e8", textAlign: "center" }}>
            PROBLEM IN BUYING
          </h2>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "30px", textAlign: "center", color: "#202124" }}>
            Buying a Used Laptop Can Be Risky
          </h3>
          
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {[
              "Sellers may hide battery or performance issues",
              "Some problems are not visible during quick inspection",
              "Repair costs can be high after purchase",
              "Most buyers don't know what to check"
            ].map((item, index) => (
              <div key={index} style={{ marginBottom: "16px", paddingLeft: "32px", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, color: "#ea4335", fontWeight: "bold", fontSize: "1.2rem" }}>!</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "40px", color: "#1a73e8", textAlign: "center" }}>
            Tool Features
          </h2>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "30px", textAlign: "center", color: "#202124" }}>
            What CheckTop Checks for You?
          </h3>
          
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {[
              "Battery Health – Detects weak or degraded batteries",
              "CPU & Performance – Identifies throttling or overheating",
              "Storage Health – Checks drive condition and free space",
              "Display Issues – Identifies dead pixels and screen problems",
              "Ports & Audio – Verifies USB, HDMI, and speaker functionality",
              "Overall Verdict – Clear GOOD / FAIR / POOR assessment"
            ].map((item, index) => (
              <div key={index} style={{ 
                marginBottom: "16px", 
                paddingLeft: "32px", 
                position: "relative",
                padding: "12px",
                background: index % 2 === 0 ? "#f8f9fa" : "transparent",
                borderRadius: "6px"
              }}>
                <div style={{ position: "absolute", left: "12px", color: "#34a853", fontWeight: "bold", fontSize: "1.2rem" }}>✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procedure Section */}
      <section style={{ padding: "80px 20px", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "40px", color: "#1a73e8", textAlign: "center" }}>
            Procedure
          </h2>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "30px", textAlign: "center", color: "#202124" }}>
            How It Works?
          </h3>
          
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {[
              { number: "1", title: "Click Start Laptop Check" },
              { number: "2", title: "Allow the system to run basic diagnostics" },
              { number: "3", title: "Review your laptop health report" },
              { number: "4", title: "Download the report as a PDF" }
            ].map((step, index) => (
              <div key={index} style={{ marginBottom: "40px", textAlign: "center" }}>
                <div style={{
                  display: "inline-block",
                  width: "50px",
                  height: "50px",
                  background: "#1a73e8",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  lineHeight: "50px",
                  marginBottom: "16px"
                }}>
                  {step.number}
                </div>
                <div style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "8px", color: "#202124" }}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#202124", color: "white", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "20px" }}>CheckTop by Digital SM Studio</div>
          <div style={{ color: "#9aa0a6", fontSize: "0.9rem", marginTop: "20px" }}>
            © {new Date().getFullYear()} CheckTop. All diagnostics run locally on your device.
          </div>
        </div>
      </footer>
    </div>
  );
}

