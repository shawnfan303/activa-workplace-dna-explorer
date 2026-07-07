export function ExhibitionAdviceCard({ advice }: { advice: string[] }) {
  return (
    <section className="border border-aurora-line bg-white p-6">
      <p className="text-sm font-semibold text-aurora-red">Exhibition planning</p>
      <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">展廳參觀建議</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {advice.map((item, index) => (
          <div key={item} className="bg-aurora-soft p-4">
            <p className="text-xs font-semibold text-aurora-red">重點 {index + 1}</p>
            <p className="mt-2 text-sm leading-7 text-aurora-ink">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
