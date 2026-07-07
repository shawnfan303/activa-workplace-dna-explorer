export function normalizeTags(items: string[] | undefined) {
  return Array.from(new Set((items ?? []).map((item) => item.trim()).filter(Boolean)));
}

export function normalizePublicRecord<T extends Record<string, unknown>>(record: T) {
  return {
    ...record,
    review_status: record.review_status ?? "pending_review"
  };
}

