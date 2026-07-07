export const usageCounterBase = 3899;
export const usageCounterStorageKey = "activa-workplace-dna-usage-count";
export const usageCounterEventName = "activa-workplace-dna-usage-count-updated";
export const usageCounterEndpoint = process.env.NEXT_PUBLIC_USAGE_COUNTER_ENDPOINT ?? "";

const caseMatchUsageCounterBase = 1889;
const caseMatchCounterNamespace = "aurora-case-match-engine";
const caseMatchCounterName = "public-usage";
const caseMatchCounterApiBaseUrl = `https://api.counterapi.dev/v1/${caseMatchCounterNamespace}/${caseMatchCounterName}`;

type CounterApiResponse = {
  count?: number;
};

function toDisplayCount(apiCount: number | undefined) {
  return caseMatchUsageCounterBase + Math.max(apiCount ?? 0, 0);
}

async function readCounter(endpoint: string) {
  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    if (response.status === 400 || response.status === 404) {
      return caseMatchUsageCounterBase;
    }

    throw new Error(`Usage counter request failed: ${response.status}`);
  }

  const data = (await response.json()) as CounterApiResponse;
  return toDisplayCount(data.count);
}

export function readUsageCount() {
  if (typeof window === "undefined") {
    return usageCounterBase;
  }

  const storedValue = Number(window.localStorage.getItem(usageCounterStorageKey));
  return Number.isFinite(storedValue) ? Math.max(usageCounterBase, storedValue) : usageCounterBase;
}

export function incrementUsageCount() {
  if (typeof window === "undefined") {
    return usageCounterBase;
  }

  const nextCount = readUsageCount() + 1;
  window.localStorage.setItem(usageCounterStorageKey, String(nextCount));
  window.dispatchEvent(new CustomEvent(usageCounterEventName, { detail: nextCount }));
  return nextCount;
}

function buildCounterUrl(action: "get" | "increment") {
  if (!usageCounterEndpoint) {
    return "";
  }

  const url = new URL(usageCounterEndpoint);
  url.searchParams.set("action", action);
  return url.toString();
}

export async function fetchSharedUsageCount() {
  const counterUrl = buildCounterUrl("get");
  if (!counterUrl) {
    return readUsageCount();
  }

  const response = await fetch(counterUrl, { method: "GET", cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to fetch shared usage count.");
  }

  const data = (await response.json()) as { count?: number };
  const count = Number(data.count);
  if (!Number.isFinite(count)) {
    throw new Error("Invalid shared usage count response.");
  }

  window.localStorage.setItem(usageCounterStorageKey, String(Math.max(usageCounterBase, count)));
  window.dispatchEvent(new CustomEvent(usageCounterEventName, { detail: Math.max(usageCounterBase, count) }));
  return Math.max(usageCounterBase, count);
}

export async function incrementSharedUsageCount() {
  const counterUrl = buildCounterUrl("increment");
  if (!counterUrl) {
    return incrementUsageCount();
  }

  const response = await fetch(counterUrl, { method: "GET", cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to increment shared usage count.");
  }

  const data = (await response.json()) as { count?: number };
  const count = Number(data.count);
  if (!Number.isFinite(count)) {
    throw new Error("Invalid shared usage count response.");
  }

  window.localStorage.setItem(usageCounterStorageKey, String(Math.max(usageCounterBase, count)));
  window.dispatchEvent(new CustomEvent(usageCounterEventName, { detail: Math.max(usageCounterBase, count) }));
  return Math.max(usageCounterBase, count);
}

export function getCaseMatchFallbackUsageCount() {
  return caseMatchUsageCounterBase;
}

export async function getCaseMatchUsageCount() {
  return readCounter(caseMatchCounterApiBaseUrl);
}

export async function incrementCaseMatchUsageCount() {
  return readCounter(`${caseMatchCounterApiBaseUrl}/up`);
}

export function getFallbackUsageCount() {
  return usageCounterBase;
}
