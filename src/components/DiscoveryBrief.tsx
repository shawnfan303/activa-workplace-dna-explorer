import { downloadMarkdown } from "@/src/lib/exportMarkdown.discovery";

type DiscoveryBriefProps = {
  markdown: string;
  onCopy: () => void;
  onExport: () => void;
  onPrint: () => void;
};

export function DiscoveryBrief({ markdown, onCopy, onExport, onPrint }: DiscoveryBriefProps) {
  async function copyBrief() {
    await navigator.clipboard.writeText(markdown);
    onCopy();
  }

  function exportBrief() {
    downloadMarkdown("aurora-discovery-brief.md", markdown);
    onExport();
  }

  function printBrief() {
    onPrint();
    window.print();
  }

  return (
    <section className="border border-aurora-line bg-white p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-aurora-red">Discovery brief</p>
          <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">拜訪摘要</h2>
        </div>
        <div className="screen-only flex flex-wrap gap-2">
          <button type="button" onClick={copyBrief} className="border border-aurora-line px-4 py-2 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">複製摘要</button>
          <button type="button" onClick={exportBrief} className="border border-aurora-line px-4 py-2 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">匯出 Markdown</button>
          <button type="button" onClick={printBrief} className="bg-aurora-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">列印 PDF</button>
        </div>
      </div>
      <pre className="print-report mt-5 max-h-[720px] overflow-auto whitespace-pre-wrap bg-aurora-soft p-5 text-sm leading-7 text-aurora-ink">{markdown}</pre>
    </section>
  );
}
