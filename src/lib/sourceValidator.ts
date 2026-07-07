import type { PublicSourceMeta } from "@/src/types/recommender";
import { validatePublicSafeText } from "./sensitiveDataGuard";

export const allowedDomains = ["https://www.aurora.com.tw/of/", "https://aid.aurora.com.tw/"];

export function isAllowedSourceUrl(sourceUrl: string) {
  return allowedDomains.some((domain) => sourceUrl.startsWith(domain));
}

export function isDisplayableReviewStatus(status: PublicSourceMeta["review_status"]) {
  return status === "approved_public" || status === "sample_pending_review";
}

export function validatePublicRecord(record: Partial<PublicSourceMeta> & Record<string, unknown>) {
  const issues: string[] = [];
  if (!record.source_url || typeof record.source_url !== "string") issues.push("missing_source_url");
  if (typeof record.source_url === "string" && !isAllowedSourceUrl(record.source_url)) issues.push("disallowed_domain");
  if (!record.review_status) issues.push("missing_review_status");
  const textCheck = validatePublicSafeText(JSON.stringify(record));
  issues.push(...textCheck.issues);
  return { safe: issues.length === 0, issues };
}

