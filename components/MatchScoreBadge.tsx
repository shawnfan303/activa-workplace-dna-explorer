type MatchScoreBadgeProps = {
  score: number;
};

export function MatchScoreBadge({ score }: MatchScoreBadgeProps) {
  const tone =
    score >= 70
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : score >= 40
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-red-200 bg-red-50 text-red-800";

  return (
    <div className={`inline-flex flex-col border px-3 py-2 ${tone}`}>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span>{score}</span>
        <span className="text-xs font-medium">/ 100</span>
      </div>
      <span className="mt-1 text-[11px] font-medium">案例與條件的匹配分數</span>
    </div>
  );
}
