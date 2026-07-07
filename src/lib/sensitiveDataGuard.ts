const sensitiveKeywords = [
  "報價",
  "毛利",
  "成交",
  "折扣",
  "庫存",
  "合約",
  "付款條件",
  "客戶窗口",
  "聯絡人",
  "手機",
  "電話",
  "Email",
  "地址",
  "內部",
  "未公開",
  "設計圖",
  "平面圖",
  "施工圖",
  "保證",
  "一定有效",
  "最低價",
  "預算",
  "金額",
  "CRM",
  "案號",
  "採購單",
  "發票"
];

export function containsEmail(text: string) {
  return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text);
}

export function containsPhoneNumber(text: string) {
  return /(?:\+?886[-\s]?)?0?9\d{2}[-\s]?\d{3}[-\s]?\d{3}|0\d{1,2}[-\s]?\d{6,8}/.test(text);
}

export function containsAddressLikeText(text: string) {
  return /(?:縣|市).{0,12}(?:區|鄉|鎮|市).{0,20}(?:路|街|巷|弄|號|樓)/.test(text);
}

export function containsPriceOrAmount(text: string) {
  return /(?:NT\$|NTD|TWD|\$|新台幣|元|萬|億)\s?\d|(?:\d[\d,]*)\s?(?:元|萬|億)/.test(text);
}

export function containsSensitiveKeywords(text: string) {
  return sensitiveKeywords.some((keyword) => text.includes(keyword));
}

export function validatePublicSafeText(text: string) {
  const issues = [];
  if (containsEmail(text)) issues.push("疑似 Email");
  if (containsPhoneNumber(text)) issues.push("疑似電話");
  if (containsAddressLikeText(text)) issues.push("疑似地址");
  if (containsPriceOrAmount(text)) issues.push("疑似價格或金額");
  if (containsSensitiveKeywords(text)) issues.push("疑似敏感關鍵字");
  return { safe: issues.length === 0, issues, checkedSegments: text.trim() ? 1 : 0 };
}

export function blockUnsafeRecord<T extends { review_status?: string }>(record: T) {
  const result = validatePublicSafeText(JSON.stringify(record));
  return result.safe ? record : { ...record, review_status: "blocked", blocked_reasons: result.issues };
}

export function sanitizeUserInput<T extends Record<string, string[]>>(input: T) {
  const nextInput = { ...input };
  Object.entries(nextInput).forEach(([key, values]) => {
    nextInput[key as keyof T] = values.filter((value) => validatePublicSafeText(value).safe) as T[keyof T];
  });
  return nextInput;
}

export const publicSensitiveKeywords = sensitiveKeywords;
