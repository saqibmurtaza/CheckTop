// //  src/lib/api.ts - EXACT VERSION FOR YOUR page.tsx
// const LOCAL_AGENT_URL = "http://localhost:5000";

// /**
//  * Triggers the local agent to start diagnostics.
//  * Matches agent.js POST /run-diagnostics
//  */
// export async function triggerDiagnostics(): Promise<{ 
//   status: string; 
//   message: string;
// }> {
//   try {
//     const response = await fetch(`${LOCAL_AGENT_URL}/run-diagnostics`, { 
//       method: "POST",
//       headers: { "Content-Type": "application/json" }
//     });
    
//     if (!response.ok) {
//       throw new Error("Failed to trigger local agent. Is the agent running?");
//     }
    
//     return response.json();
//   } catch (error) {
//     return {
//       status: "ERROR",
//       message: "Make sure the CheckTop Agent is running"
//     };
//   }
// }

// /**
//  * Fetches the local report saved by the agent after execution.
//  */
// export async function fetchLocalReport(): Promise<any> {
//   const res = await fetch(`${LOCAL_AGENT_URL}/last-report`, {
//     method: "GET",
//     cache: "no-store"
//   });

//   if (!res.ok) {
//     throw new Error("Report not ready or agent unreachable.");
//   }
  
//   return res.json();
// }

// /**
//  * Retries fetching the report. Diagnostics take time (execSync + user input),
//  * so we poll until the file is available.
//  */
// export async function fetchReportWithRetry(
//   retries = 10,
//   delayMs = 5000
// ): Promise<any> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       const data = await fetchLocalReport();
//       if (data) return data;
//     } catch (e) {
//       // Silently wait for next retry
//     }
//     await new Promise(resolve => setTimeout(resolve, delayMs));
//   }
//   throw new Error("Diagnostics timed out or were cancelled.");
// }

// /**
//  * Generates and downloads a PDF summary of the diagnostic results.
//  */
// export async function downloadReportPdf(reportJson: any) {
//   try {
//     // Dynamic import to avoid bundle issues
//     const jsPDF = (await import("jspdf")).default;
//     const doc = new jsPDF();
    
//     doc.setFontSize(16);
//     doc.text("CheckTop Diagnostic Report", 10, 20);
    
//     doc.setFontSize(10);
//     const content = JSON.stringify(reportJson, null, 2);
//     const lines = doc.splitTextToSize(content, 180);
    
//     doc.text(lines, 10, 30);
//     doc.save(`Diagnostic_Report_${reportJson.job_id || "export"}.pdf`);
//   } catch (error) {
//     console.error("PDF generation failed:", error);
//     // Fallback: Create a downloadable text file
//     const blob = new Blob([JSON.stringify(reportJson, null, 2)], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `Health_Check_${Date.now()}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//   }
// }

// // Export additional functions if needed elsewhere
// export async function getSimpleReport() {
//   try {
//     const res = await fetch(`${LOCAL_AGENT_URL}/simple-report`);
//     if (!res.ok) throw new Error("Report not ready");
//     return res.json();
//   } catch (error) {
//     return {
//       success: false,
//       simpleMessage: "Health check results not available yet"
//     };
//   }
// }

// export async function saveReportAsText() {
//   try {
//     const res = await fetch(`${LOCAL_AGENT_URL}/save-report`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" }
//     });
//     return res.json();
//   } catch (error) {
//     return {
//       success: false,
//       message: "Could not save report"
//     };
//   }
// }