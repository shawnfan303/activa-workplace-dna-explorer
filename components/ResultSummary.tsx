import { modeLabels } from "@/lib/scoring";
import type { WorkplaceDnaResult } from "@/lib/types";

export function ResultSummary({ result }: { result: WorkplaceDnaResult }) {
  return (
    <div className="bg-aurora-soft p-6">
      <p className="text-sm text-aurora-graphite">最高分主模式</p>
      <p className="mt-2 text-3xl font-semibold text-aurora-red">{modeLabels[result.dominantMode]}</p>
      <p className="mt-3 text-sm leading-6 text-aurora-graphite">完成時間：{new Date(result.completedAt).toLocaleString("zh-TW")}</p>
    </div>
  );
}
