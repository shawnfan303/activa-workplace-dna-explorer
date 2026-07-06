"use client";

import { useEffect, useState } from "react";
import { fetchSharedUsageCount, readUsageCount, usageCounterBase, usageCounterEndpoint, usageCounterEventName } from "@/lib/usageCounter";

export function UsageCounter() {
  const [count, setCount] = useState(usageCounterBase);

  useEffect(() => {
    setCount(readUsageCount());

    if (usageCounterEndpoint) {
      fetchSharedUsageCount()
        .then((nextCount) => setCount(nextCount))
        .catch(() => {
          setCount(readUsageCount());
        });
    }

    function handleUsageUpdate(event: Event) {
      const nextCount = (event as CustomEvent<number>).detail;
      if (typeof nextCount === "number") {
        setCount(nextCount);
      }
    }

    window.addEventListener(usageCounterEventName, handleUsageUpdate);
    return () => window.removeEventListener(usageCounterEventName, handleUsageUpdate);
  }, []);

  return (
    <div className="inline-flex items-center border border-aurora-red bg-white px-4 py-3 shadow-subtle">
      <p className="text-sm font-semibold text-aurora-ink">
        已使用：<span className="text-lg text-aurora-red">{count.toLocaleString("zh-TW")}</span>人次
      </p>
    </div>
  );
}
