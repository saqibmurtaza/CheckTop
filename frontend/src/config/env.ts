// // src/config/env.ts

// // Local agent trigger URL
// export const LOCAL_AGENT_TRIGGER_URL =
//   process.env.NEXT_PUBLIC_LOCAL_AGENT_TRIGGER_URL ??
//   "http://localhost:5000/run-diagnostics";

// // Placeholder for PDF URL (will generate from local report JSON)
// export const REPORT_PDF_FILENAME = "CheckTop_Diagnostic_Report.pdf";

// Local agent trigger URL
export const LOCAL_AGENT_TRIGGER_URL =
  process.env.NEXT_PUBLIC_LOCAL_AGENT_TRIGGER_URL ??
  "http://localhost:5000/run-diagnostics";

// Placeholder for PDF filename (will generate from local report JSON)
export const REPORT_PDF_FILENAME = "CheckTop_Diagnostic_Report.pdf";

// Base URL for Render workflow API
export const RENDER_WORKFLOW_BASE_URL =
  process.env.NEXT_PUBLIC_RENDER_WORKFLOW_BASE_URL ??
  "https://checktop-tool.onrender.com";
