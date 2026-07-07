import type { DiscoveryCounters } from "@/src/types/discovery";

const typeLabels: Record<string, string> = {
  strategic: "策略",
  spatial: "空間",
  user_experience: "體驗",
  operation: "維運",
  sustainability: "ESG",
  technology: "科技",
  exhibition: "展廳",
  budget_context: "前置釐清",
  lifecycle: "生命週期",
  brand: "品牌"
};

export function QuestionCounter({ counters }: { counters: DiscoveryCounters }) {
  return (
    <section className="border border-aurora-line bg-white p-4">
      <p className="font-semibold text-aurora-ink">問診題數計數器</p>
      <p className="mt-1 text-2xl font-semibold text-aurora-ink">{counters.questions.total} 題</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {Object.entries(counters.questions.byType).map(([type, count]) => (
          <span key={type} className="border border-aurora-line px-2 py-1 text-xs text-aurora-graphite">
            {typeLabels[type] ?? type} {count}
          </span>
        ))}
      </div>
    </section>
  );
}
