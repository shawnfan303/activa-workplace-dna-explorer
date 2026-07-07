"use client";

import { useEffect, useState } from "react";
import { fetchSharedUsageCount, readUsageCount, usageCounterBase, usageCounterEventName } from "@/lib/usageCounter";

type UsageCounterProps = {
  count?: number;
  variant?: "default" | "compact";
};

export function UsageCounter({ count, variant = "default" }: UsageCounterProps) {
  const [sharedCount, setSharedCount] = useState(usageCounterBase);
  const displayCount = count ?? sharedCount;

  useEffect(() => {
    if (typeof count === "number") {
      return;
    }

    setSharedCount(readUsageCount());

    fetchSharedUsageCount()
      .then((nextCount) => setSharedCount(nextCount))
      .catch(() => {
        setSharedCount(readUsageCount());
      });

    function handleUsageUpdate(event: Event) {
      const nextCount = (event as CustomEvent<number>).detail;
      if (typeof nextCount === "number") {
        setSharedCount(nextCount);
      }
    }

    window.addEventListener(usageCounterEventName, handleUsageUpdate);
    return () => window.removeEventListener(usageCounterEventName, handleUsageUpdate);
  }, [count]);

  if (variant === "compact") {
    return (
      <div className="inline-flex min-w-[156px] items-center justify-center border border-aurora-line bg-white px-4 py-2 text-sm font-semibold tabular-nums text-aurora-ink shadow-[0_10px_24px_rgba(32,33,36,0.05)]">
        已使用：{displayCount.toLocaleString("zh-TW")}人次
      </div>
    );
  }

  return (
    <div className="inline-flex items-center border border-aurora-red bg-white px-4 py-3 shadow-subtle">
      <p className="text-sm font-semibold text-aurora-ink">
        已使用：<span className="text-lg text-aurora-red">{displayCount.toLocaleString("zh-TW")}</span>人次
      </p>
    </div>
  );
}
