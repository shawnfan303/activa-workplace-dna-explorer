const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "data", "raw", "aid");
fs.mkdirSync(outDir, { recursive: true });

const payload = {
  source: "https://aid.aurora.com.tw/",
  allowed_domain: true,
  mode: "offline_placeholder",
  review_status: "pending_review",
  note: "Codex environment did not fetch live pages. Replace this placeholder with public website crawl output before normalization.",
  captured_at: new Date().toISOString()
};

fs.writeFileSync(path.join(outDir, "offline-placeholder.json"), JSON.stringify(payload, null, 2), "utf8");
console.log("Created AID raw placeholder:", path.join(outDir, "offline-placeholder.json"));

