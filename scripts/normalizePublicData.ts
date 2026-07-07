const fs = require("fs");
const path = require("path");

const structuredDir = path.join(process.cwd(), "data", "structured");
fs.mkdirSync(structuredDir, { recursive: true });

const manifest = {
  generated_at: new Date().toISOString(),
  review_status: "pending_review",
  note: "Normalization scaffold. Human reviewers must convert allowed public pages into src/data/*.json and approve records before production display.",
  outputs: [
    "src/data/products.json",
    "src/data/scenes.json",
    "src/data/solutions.json",
    "src/data/designServices.json"
  ]
};

fs.writeFileSync(path.join(structuredDir, "normalization-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
console.log("Created normalization manifest:", path.join(structuredDir, "normalization-manifest.json"));

