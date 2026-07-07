type MatchScoreBadgeProps = {
  score: number;
  label?: string;
};

export function MatchScoreBadge({ score, label = "匹配分數" }: MatchScoreBadgeProps) {
  const tone = score >= 70 ? "bg-emerald-50 text-emerald-800 border-emerald-200" : score >= 40 ? "bg-amber-50 text-amber-800 border-amber-200" : "bg-red-50 text-red-800 border-red-200";
  return (
    <div className={`inline-flex min-w-24 flex-col border px-3 py-2 ${tone}`}>
      <span className="text-lg font-semibold leading-none">{score}</span>
      <span className="mt-1 text-xs font-medium">{label}</span>
    </div>
  );
}

