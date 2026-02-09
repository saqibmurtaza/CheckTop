
// // Local agent trigger URL
// export const LOCAL_AGENT_TRIGGER_URL =
//   process.env.NEXT_PUBLIC_LOCAL_AGENT_TRIGGER_URL ??
//   "http://localhost:5000/run-diagnostics";

// // Placeholder for PDF filename (will generate from local report JSON)
// export const REPORT_PDF_FILENAME = "CheckTop_Diagnostic_Report.pdf";

// // Base URL for Render workflow API
// export const RENDER_WORKFLOW_BASE_URL =
//   process.env.NEXT_PUBLIC_RENDER_WORKFLOW_BASE_URL ??
//   "https://checktop-tool.onrender.com";


// E:\CheckTop\frontend\src\config\env.ts

// Local agent URLs - YOUR AGENT RUNS ON PORT 9797
export const LOCAL_AGENT_HEALTH_URL =
  process.env.NEXT_PUBLIC_LOCAL_AGENT_HEALTH_URL ??
  "http://localhost:9797/health"; 

export const LOCAL_AGENT_TRIGGER_URL =
  process.env.NEXT_PUBLIC_LOCAL_AGENT_TRIGGER_URL ??
  "http://localhost:9797/run-diagnostics"; 

// Local agent report URL
export const LOCAL_AGENT_REPORT_URL =
  process.env.NEXT_PUBLIC_LOCAL_AGENT_REPORT_URL ??
  "http://localhost:9797/last-report"; 

// Placeholder for PDF filename (will generate from local report JSON)
export const REPORT_PDF_FILENAME = "CheckTop_Diagnostic_Report.pdf";

// Base URL for Render workflow API
export const RENDER_WORKFLOW_BASE_URL =
  process.env.NEXT_PUBLIC_RENDER_WORKFLOW_BASE_URL ??
  "https://checktop-tool.onrender.com";