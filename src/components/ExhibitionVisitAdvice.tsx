type ExhibitionVisitAdviceProps = {
  advice: string[];
};

export function ExhibitionVisitAdvice({ advice }: ExhibitionVisitAdviceProps) {
  return (
    <section className="border border-aurora-line bg-white p-5">
      <p className="text-sm font-semibold text-aurora-red">展廳體驗建議</p>
      <h2 className="mt-1 text-2xl font-semibold text-aurora-ink">建議展廳參觀重點</h2>
      <ul className="mt-4 space-y-3">
        {advice.map((item) => (
          <li key={item} className="border-l-4 border-aurora-red bg-aurora-soft px-4 py-3 text-sm leading-7 text-aurora-graphite">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

