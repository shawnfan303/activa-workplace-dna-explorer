"use client";

import { useRef, useState } from "react";
import type { CaseBriefModel } from "@/lib/caseTypes";

type SelectedCaseBriefProps = {
  model: CaseBriefModel;
};

function themeSummary(items: string[]) {
  return items.length > 0 ? items.join("、") : "尚未選擇案例";
}

export function SelectedCaseBrief({ model }: SelectedCaseBriefProps) {
  const briefRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const averageScore =
    model.selectedCases.length > 0 ? Math.round(model.selectedCases.reduce((sum, item) => sum + item.score, 0) / model.selectedCases.length) : 0;

  async function exportPdf() {
    if (!briefRef.current) {
      return;
    }

    setIsExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(briefRef.current, {
        backgroundColor: "#ffffff",
        scale: 2
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imageWidth = pageWidth - margin * 2;
      const sourcePageHeight = Math.floor((canvas.width * (pageHeight - margin * 2)) / imageWidth);
      const pageCanvas = document.createElement("canvas");
      const pageContext = pageCanvas.getContext("2d");
      let renderedHeight = 0;
      let pageIndex = 0;

      pageCanvas.width = canvas.width;
      pageCanvas.height = sourcePageHeight;

      while (renderedHeight < canvas.height && pageContext) {
        const remainingSourceHeight = Math.min(sourcePageHeight, canvas.height - renderedHeight);
        pageContext.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageContext.fillStyle = "#ffffff";
        pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageContext.drawImage(canvas, 0, renderedHeight, canvas.width, remainingSourceHeight, 0, 0, canvas.width, remainingSourceHeight);

        if (pageIndex > 0) {
          pdf.addPage();
        }

        const pageImageHeight = (remainingSourceHeight * imageWidth) / canvas.width;
        pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", margin, margin, imageWidth, pageImageHeight);
        renderedHeight += sourcePageHeight;
        pageIndex += 1;
      }

      pdf.save(`AURORA-case-match-brief-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className="border border-aurora-line bg-white p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-aurora-red">案例匹配摘要</p>
          <h2 className="mt-1 text-2xl font-semibold text-aurora-ink">拜訪前案例儀表板</h2>
        </div>
        <div className="flex flex-wrap gap-2 screen-only">
          <button type="button" onClick={exportPdf} disabled={isExporting} className="bg-aurora-red px-4 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60">
            {isExporting ? "PDF 產生中" : "輸出PDF"}
          </button>
        </div>
      </div>

      <div ref={briefRef} className="mt-5 space-y-5 bg-white text-aurora-ink">
        <div className="border border-aurora-line bg-aurora-soft p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora-red">AURORA / AID public case dashboard</p>
              <h3 className="mt-2 text-2xl font-semibold">案例匹配摘要</h3>
              <p className="mt-2 text-sm leading-6 text-aurora-graphite">以公開案例來源、需求條件與角色化溝通重點，整理成可供拜訪前討論的儀表板。</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="border border-aurora-line bg-white p-3">
                <p className="text-2xl font-semibold text-aurora-red">{model.selectedCases.length}</p>
                <p className="mt-1 text-xs text-aurora-graphite">已選案例</p>
              </div>
              <div className="border border-aurora-line bg-white p-3">
                <p className="text-2xl font-semibold text-aurora-ink">{averageScore}</p>
                <p className="mt-1 text-xs text-aurora-graphite">平均匹配</p>
              </div>
              <div className="border border-aurora-line bg-white p-3">
                <p className="text-2xl font-semibold text-aurora-ink">{model.solutionThemes.length}</p>
                <p className="mt-1 text-xs text-aurora-graphite">解決主題</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {model.needAssumptions.map((item) => (
            <div key={item.label} className="border border-aurora-line p-4">
              <p className="text-xs font-semibold text-aurora-red">{item.label}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-aurora-ink">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden border border-aurora-line">
          <div className="border-b border-aurora-line bg-aurora-soft px-4 py-3">
            <h3 className="text-lg font-semibold">推薦公開案例比較</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-white text-xs text-aurora-graphite">
                <tr>
                  <th className="border-b border-aurora-line px-4 py-3">案例</th>
                  <th className="border-b border-aurora-line px-4 py-3">來源</th>
                  <th className="border-b border-aurora-line px-4 py-3">匹配分數</th>
                  <th className="border-b border-aurora-line px-4 py-3">解決主題</th>
                  <th className="border-b border-aurora-line px-4 py-3">拜訪情境</th>
                </tr>
              </thead>
              <tbody>
                {model.selectedCases.length > 0 ? (
                  model.selectedCases.map((item) => (
                    <tr key={item.id} className="border-b border-aurora-line last:border-b-0">
                      <td className="px-4 py-3 font-semibold text-aurora-ink">{item.title}</td>
                      <td className="px-4 py-3 text-aurora-graphite">{item.source_url.includes("aid.aurora.com.tw") ? "大震設計" : "震旦家具"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-10 font-semibold">{item.score}</span>
                          <div className="h-2 w-28 bg-aurora-line">
                            <div className="h-2 bg-aurora-red" style={{ width: `${item.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-aurora-graphite">{item.solution_themes.join("、")}</td>
                      <td className="px-4 py-3 text-aurora-graphite">{item.recommended_for.join("、")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-6 text-aurora-graphite" colSpan={5}>
                      請先從推薦結果中加入 1–3 個案例。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {model.strategyCards.map((item) => (
            <div key={item.title} className="border border-aurora-line p-4">
              <p className="text-sm font-semibold text-aurora-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-aurora-graphite">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="border border-aurora-line p-4">
            <p className="text-sm font-semibold text-aurora-red">建議營業開場話術</p>
            <p className="mt-3 text-sm leading-7 text-aurora-ink">{model.openingTalk}</p>
          </div>
          <div className="border border-aurora-line p-4">
            <p className="text-sm font-semibold text-aurora-red">對應解決方案主題</p>
            <p className="mt-3 text-sm leading-7 text-aurora-ink">{themeSummary(model.solutionThemes)}</p>
            <p className="mt-4 text-sm font-semibold text-aurora-red">角色化提醒</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-aurora-graphite">
              {model.stakeholderPoints.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-aurora-line p-4">
            <p className="text-sm font-semibold text-aurora-red">建議展廳參觀重點</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-aurora-graphite">
              {model.showroomFocus.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-aurora-line p-4">
            <p className="text-sm font-semibold text-aurora-red">後續行動建議</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-aurora-graphite">
              {model.nextActions.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="border border-aurora-line bg-aurora-soft p-4 text-xs leading-6 text-aurora-graphite">{model.disclaimer}</p>
      </div>
    </section>
  );
}
