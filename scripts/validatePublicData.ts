const fs = require("fs");
const path = require("path");

const allowedDomains = ["https://www.aurora.com.tw/of/", "https://aid.aurora.com.tw/"];
const sensitiveKeywords = ["報價", "毛利", "成交", "折扣", "庫存", "合約", "付款條件", "客戶窗口", "聯絡人", "手機", "Email", "內部", "未公開", "設計圖", "平面圖", "施工圖", "保證", "一定有效", "最低價"];
const files = ["products.json", "scenes.json", "solutions.json", "designServices.json"].map((name) => path.join(process.cwd(), "src", "data", name));

function hasEmail(text) {
  return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text);
}

function hasPhone(text) {
  return /(?:\+?886[-\s]?)?0?9\d{2}[-\s]?\d{3}[-\s]?\d{3}|0\d{1,2}[-\s]?\d{6,8}/.test(text);
}

function hasPrice(text) {
  return /(?:NT\$|NTD|TWD|\$|新台幣|元|萬|億)\s?\d|(?:\d[\d,]*)\s?(?:元|萬|億)/.test(text);
}

function validateRecord(record, file, index) {
  const issues = [];
  const text = JSON.stringify(record);
  if (!record.source_url) issues.push("missing source_url");
  if (record.source_url && !allowedDomains.some((domain) => record.source_url.startsWith(domain))) issues.push("source_url outside allowed domains");
  if (!record.review_status) issues.push("missing review_status");
  if (hasEmail(text)) issues.push("possible email");
  if (hasPhone(text)) issues.push("possible phone number");
  if (hasPrice(text)) issues.push("possible price or amount");
  sensitiveKeywords.forEach((keyword) => {
    if (text.includes(keyword)) issues.push(`sensitive keyword: ${keyword}`);
  });
  return issues.map((issue) => `${file}#${index + 1}: ${issue}`);
}

const errors = [];
files.forEach((file) => {
  const records = JSON.parse(fs.readFileSync(file, "utf8"));
  records.forEach((record, index) => errors.push(...validateRecord(record, path.relative(process.cwd(), file), index)));
});

if (errors.length > 0) {
  console.error("Public data validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Public data validation passed.");

