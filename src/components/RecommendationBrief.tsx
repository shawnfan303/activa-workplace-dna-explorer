import { downloadMarkdown } from "@/src/lib/exportMarkdown";

type RecommendationBriefProps = {
  markdown: string;
};

export function RecommendationBrief({ markdown }: RecommendationBriefProps) {
  async function copyBrief() {
    await navigator.clipboard.writeText(markdown);
  }

  return (
    <section className="border border-aurora-line bg-white p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-aurora-red">正式摘要</p>
          <h2 className="mt-1 text-2xl font-semibold text-aurora-ink">產品與場景推薦摘要</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={copyBrief} className="bg-aurora-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">複製摘要</button>
          <button type="button" onClick={() => downloadMarkdown("aurora-product-scene-brief.md", markdown)} className="border border-aurora-line px-4 py-2 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">匯出 Markdown</button>
          <button type="button" onClick={() => window.print()} className="border border-aurora-line px-4 py-2 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">列印 PDF</button>
        </div>
      </div>
      <pre className="mt-5 max-h-[640px] overflow-auto whitespace-pre-wrap border border-aurora-line bg-aurora-soft p-5 text-sm leading-7 text-aurora-ink print:max-h-none print:border-0 print:bg-white print:p-0">{markdown}</pre>
    </section>
  );
}

