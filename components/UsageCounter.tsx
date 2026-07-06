"use client";

import { useEffect, useState } from "react";
import { fetchSharedUsageCount, readUsageCount, usageCounterBase, usageCounterEndpoint, usageCounterEventName } from "@/lib/usageCounter";

export function UsageCounter() {
  const [count, setCount] = useState(usageCounterBase);
  const [status, setStatus] = useState<"loading" | "shared" | "local">("loading");

  useEffect(() => {
    setCount(readUsageCount());
    setStatus(usageCounterEndpoint ? "loading" : "local");

    if (usageCounterEndpoint) {
      fetchSharedUsageCount()
        .then((nextCount) => {
          setCount(nextCount);
          setStatus("shared");
        })
        .catch(() => {
          setCount(readUsageCount());
          setStatus("local");
        });
    }

    function handleUsageUpdate(event: Event) {
      const nextCount = (event as CustomEvent<number>).detail;
      if (typeof nextCount === "number") {
        setCount(nextCount);
        setStatus(usageCounterEndpoint ? "shared" : "local");
      }
    }

    window.addEventListener(usageCounterEventName, handleUsageUpdate);
    return () => window.removeEventListener(usageCounterEventName, handleUsageUpdate);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 border border-aurora-red bg-white px-5 py-4 shadow-subtle">
      <span className="h-2.5 w-2.5 bg-aurora-red" aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-aurora-red">Usage counter</p>
        <p className="mt-1 text-sm font-semibold text-aurora-ink">
          已使用：<span className="text-2xl text-aurora-red">{count.toLocaleString("zh-TW")}</span>人次
        </p>
        <p className="mt-1 text-xs text-aurora-graphite">
          {status === "shared" ? "全站共用累計" : status === "loading" ? "讀取共用累計中" : "暫以本機數字顯示"}
        </p>
      </div>
    </div>
  );
}
