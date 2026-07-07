export function StakeholderQuestionCard({ groups }: { groups: Array<{ stakeholder: string; opening_angle: string; questions: string[]; tone: string }> }) {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-aurora-red">Stakeholder playbooks</p>
        <h2 className="text-3xl font-semibold text-aurora-ink">角色化問題</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <article key={group.stakeholder} className="border border-aurora-line bg-white p-5">
            <p className="text-lg font-semibold text-aurora-ink">{group.stakeholder}</p>
            <p className="mt-2 text-sm leading-6 text-aurora-graphite">{group.opening_angle}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-aurora-ink">
              {group.questions.map((question) => <li key={question}>- {question}</li>)}
            </ul>
            <p className="mt-4 bg-aurora-soft p-3 text-xs leading-5 text-aurora-graphite">建議語氣：{group.tone}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
