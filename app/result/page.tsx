"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import scenes from "@/data/workplace-scenes.json";
import { assetPath } from "@/lib/assets";
import { DNARadar } from "@/components/DNARadar";
import { ResultSummary } from "@/components/ResultSummary";
import { SceneCard } from "@/components/SceneCard";
import { getImplementationDirections, getRecommendationReason, matchScenes } from "@/lib/recommendations";
import { modeLabels, workplaceModes } from "@/lib/scoring";
import type { WorkplaceDnaResult, WorkplaceScene } from "@/lib/types";

const typedScenes = scenes as WorkplaceScene[];
const storageKey = "activa-workplace-dna-result";
const ctaLinks = [
  { label: "下載診斷結果", href: "", variant: "primary" },
  { label: "預約展廳", href: "https://www.aurora.com.tw/of/showroom", variant: "redOutline" },
  { label: "聯絡業務", href: "https://www.aurora.com.tw/of/serviceLocation", variant: "neutral" },
  { label: "官方網頁", href: "https://www.aurora.com.tw/of/", variant: "neutral" },
  { label: "更多新知", href: "https://www.aurora.com.tw/of/explore", variant: "neutral" },
  { label: "型錄下載", href: "https://www.aurora.com.tw/of/catalog-download-all", variant: "neutral" }
];

function formatPercent(score: number, maxScore: number) {
  if (maxScore === 0) {
    return 0;
  }
  return Math.round((score / maxScore) * 100);
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function buttonClass(variant: string) {
  if (variant === "primary") {
    return "bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800";
  }

  if (variant === "redOutline") {
    return "border border-aurora-red px-5 py-3 text-sm font-semibold text-aurora-red transition hover:bg-aurora-red hover:text-white";
  }

  return "border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red";
}

export default function ResultPage() {
  const [result, setResult] = useState<WorkplaceDnaResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setResult(JSON.parse(stored) as WorkplaceDnaResult);
    }
  }, []);

  const matchedScenes = useMemo(() => matchScenes(result, typedScenes, 5), [result]);
  const implementationDirections = useMemo(() => (result ? getImplementationDirections(result) : []), [result]);

  function handleDownload() {
    if (!result) {
      return;
    }

    const reportWindow = window.open("", "_blank", "noopener,noreferrer,width=1100,height=900");
    if (!reportWindow) {
      window.print();
      return;
    }

    const maxScore = Math.max(...Object.values(result.scores), 1);
    const scoreBlocks = workplaceModes
      .map((mode) => {
        const percent = formatPercent(result.scores[mode], maxScore);
        return `
          <div class="score">
            <div><strong>${escapeHtml(modeLabels[mode])}</strong><span>${result.scores[mode]} 分</span></div>
            <div class="bar"><i style="width:${percent}%"></i></div>
          </div>
        `;
      })
      .join("");
    const sceneBlocks = matchedScenes
      .map(
        (scene, index) => `
          <article class="scene">
            <div class="scene-head">
              <div>
                <p>TOP ${index + 1} / ${escapeHtml(modeLabels[scene.mode])}</p>
                <h3>${escapeHtml(scene.title)}</h3>
              </div>
              <span>${escapeHtml(scene.people)}</span>
            </div>
            <p class="reason">推薦理由：${escapeHtml(getRecommendationReason(scene, result))}</p>
            <div class="columns">
              <section><h4>需求</h4><ul>${scene.needs
                .slice(0, 2)
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join("")}</ul></section>
              <section><h4>特點</h4><ul>${scene.features
                .slice(0, 2)
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join("")}</ul></section>
            </div>
          </article>
        `
      )
      .join("");
    const directionBlocks = implementationDirections.map((item, index) => `<li><strong>${index + 1}.</strong> ${escapeHtml(item)}</li>`).join("");
    const logoSrc = `${window.location.origin}${assetPath("/images/aurora-furniture-logo.png")}`;

    reportWindow.document.write(`<!doctype html>
      <html lang="zh-Hant">
        <head>
          <meta charset="utf-8" />
          <title>ACTIVA Workplace DNA 診斷結果</title>
          <style>
            @page { margin: 14mm; size: A4; }
            * { box-sizing: border-box; }
            body { margin: 0; color: #202124; background: #fff; font-family: Arial, "Microsoft JhengHei", sans-serif; }
            main { max-width: 960px; margin: 0 auto; padding: 28px; }
            header { border-bottom: 4px solid #c8102e; padding-bottom: 24px; }
            img.logo { width: 180px; height: auto; margin-bottom: 22px; }
            .eyebrow, .red { color: #c8102e; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; font-size: 12px; }
            h1 { margin: 8px 0 0; font-size: 34px; line-height: 1.2; }
            h2 { margin: 8px 0 0; font-size: 24px; }
            .summary { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 22px; }
            .box, .score, .scene, .cta { border: 1px solid #e5e7eb; padding: 16px; }
            .box p { margin: 0; color: #4b5563; font-size: 13px; }
            .box strong { display: block; margin-top: 8px; color: #c8102e; font-size: 22px; }
            section { margin-top: 28px; }
            .scores { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
            .score div:first-child { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; }
            .score span { color: #c8102e; font-weight: 700; }
            .bar { height: 8px; background: #f7f7f8; margin-top: 12px; }
            .bar i { display: block; height: 8px; background: #c8102e; }
            .scene { margin-top: 12px; break-inside: avoid; }
            .scene-head { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; }
            .scene-head p { margin: 0; color: #c8102e; font-size: 12px; font-weight: 700; }
            h3 { margin: 6px 0 0; font-size: 19px; }
            .scene-head span { color: #4b5563; white-space: nowrap; font-weight: 700; }
            .reason { margin: 12px 0 0; padding: 12px; border-left: 4px solid #c8102e; background: #f7f7f8; font-size: 13px; line-height: 1.6; }
            .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 12px; }
            h4 { margin: 0; font-size: 13px; }
            ul { margin: 8px 0 0; padding-left: 18px; color: #4b5563; font-size: 13px; line-height: 1.7; }
            .directions li { margin-bottom: 10px; }
            .directions strong { color: #c8102e; }
            .cta { border-color: #c8102e; background: #f7f7f8; }
            .actions { display: flex; gap: 10px; margin-top: 20px; }
            button, a.button { display: inline-block; border: 1px solid #c8102e; background: #c8102e; color: white; padding: 10px 14px; font-weight: 700; text-decoration: none; cursor: pointer; }
            a.button.secondary { background: white; color: #c8102e; }
            @media print { .actions { display: none; } main { padding: 0; } }
          </style>
        </head>
        <body>
          <main>
            <header>
              <img class="logo" src="${logoSrc}" alt="Aurora Furniture" />
              <p class="eyebrow">ACTIVA Workplace DNA Report</p>
              <h1>企業 Workplace DNA 診斷結果</h1>
              <div class="summary">
                <div class="box"><p>最高分主模式</p><strong>${escapeHtml(modeLabels[result.dominantMode])}</strong></div>
                <div class="box"><p>報告日期</p><strong>${new Date(result.completedAt).toLocaleDateString("zh-TW")}</strong></div>
              </div>
            </header>
            <section><p class="red">01 / Workplace DNA Score</p><h2>企業 Workplace DNA 分數</h2><div class="scores">${scoreBlocks}</div></section>
            <section><p class="red">02 / Recommended Scenes</p><h2>推薦場景 Top 5</h2>${sceneBlocks}</section>
            <section><p class="red">03 / Implementation Direction</p><h2>建議導入方向</h2><ol class="directions">${directionBlocks}</ol></section>
            <section class="cta"><p class="red">Next Step</p><h2>預約展廳</h2><p>建議攜帶本報告至 NEXt-WORK 或 ACTIVA 展示場景，依主模式與 Top 5 場景卡進行空間需求盤點、場景優先級排序與導入路線討論。</p></section>
            <div class="actions"><button onclick="window.print()">下載 / 另存 PDF</button><a class="button secondary" href="https://www.aurora.com.tw/of/showroom" target="_blank">預約展廳</a></div>
          </main>
          <script>setTimeout(() => window.print(), 400);</script>
        </body>
      </html>`);
    reportWindow.document.close();
  }

  return (
    <section className="aurora-container py-12 md:py-16">
      <div className="screen-only grid gap-8 border-b border-aurora-line pb-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">Workplace DNA Result</p>
          <h1 className="mt-3 text-4xl font-semibold text-aurora-ink">你的 Workplace DNA 診斷結果</h1>
          <p className="mt-4 leading-7 text-aurora-graphite">依據 10 題問卷加權計算六種辦公模式分數，並推薦最適合的 ACTIVA 辦公場景卡。</p>
        </div>
        {result ? (
          <ResultSummary result={result} />
        ) : (
          <div className="bg-aurora-soft p-6">
            <p className="text-base leading-7 text-aurora-graphite">尚未找到問卷結果。請先完成問卷，再查看完整雷達分數與場景推薦。</p>
            <Link href="/quiz" className="mt-4 inline-block bg-aurora-red px-5 py-3 text-sm font-semibold text-white">
              前往問卷
            </Link>
          </div>
        )}
      </div>

      {result ? (
        <>
          <section className="screen-only mt-10 border border-aurora-line bg-white p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-aurora-red">Radar score</p>
                <h2 className="mt-2 text-2xl font-semibold text-aurora-ink">Workplace DNA 雷達分數</h2>
              </div>
              <p className="text-sm leading-6 text-aurora-graphite">分數越高，代表企業目前越需要該類辦公場景支援。</p>
            </div>
            <DNARadar scores={result.scores} />
          </section>

          <section className="screen-only mt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-aurora-red">Recommended scenes</p>
                <h2 className="mt-2 text-2xl font-semibold text-aurora-ink">推薦 5 張辦公場景卡</h2>
              </div>
              <p className="text-sm text-aurora-graphite">依據六維分數與場景卡分數相似度排序</p>
            </div>
            <div className="mt-6 grid gap-5">
              {matchedScenes.map((scene) => (
                <SceneCard key={scene.id} scene={scene} reason={getRecommendationReason(scene, result)} />
              ))}
            </div>
          </section>

          <section className="screen-only mt-10 border-t border-aurora-line pt-8">
            <div className="flex flex-wrap gap-3">
              {ctaLinks.map((item) =>
                item.label === "下載診斷結果" ? (
                  <button key={item.label} type="button" onClick={handleDownload} className={buttonClass(item.variant)}>
                    {item.label}
                  </button>
                ) : (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={buttonClass(item.variant)}>
                    {item.label}
                  </a>
                )
              )}
            </div>
          </section>

          <section className="print-report hidden bg-white text-aurora-ink">
            <header className="border-b-4 border-aurora-red pb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">ACTIVA Workplace DNA Report</p>
              <h1 className="mt-3 text-4xl font-semibold">企業 Workplace DNA 診斷結果</h1>
              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div className="border border-aurora-line p-4">
                  <p className="text-aurora-graphite">最高分主模式</p>
                  <p className="mt-2 text-2xl font-semibold text-aurora-red">{modeLabels[result.dominantMode]}</p>
                </div>
                <div className="border border-aurora-line p-4">
                  <p className="text-aurora-graphite">報告日期</p>
                  <p className="mt-2 text-xl font-semibold">{new Date(result.completedAt).toLocaleDateString("zh-TW")}</p>
                </div>
              </div>
            </header>

            <section className="mt-8">
              <p className="text-sm font-semibold text-aurora-red">01 / Workplace DNA Score</p>
              <h2 className="mt-2 text-2xl font-semibold">企業 Workplace DNA 分數</h2>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {workplaceModes.map((mode) => {
                  const maxScore = Math.max(...Object.values(result.scores), 1);
                  const percent = formatPercent(result.scores[mode], maxScore);
                  return (
                    <div key={mode} className="border border-aurora-line p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">{modeLabels[mode]}</span>
                        <span className="text-aurora-red">{result.scores[mode]} 分</span>
                      </div>
                      <div className="mt-3 h-2 bg-aurora-soft">
                        <div className="h-2 bg-aurora-red" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-8">
              <p className="text-sm font-semibold text-aurora-red">02 / Recommended Scenes</p>
              <h2 className="mt-2 text-2xl font-semibold">推薦場景 Top 5</h2>
              <div className="mt-5 space-y-4">
                {matchedScenes.map((scene, index) => (
                  <article key={scene.id} className="break-inside-avoid border border-aurora-line p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-aurora-red">
                          TOP {index + 1} / {modeLabels[scene.mode]}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold">{scene.title}</h3>
                      </div>
                      <p className="whitespace-nowrap text-sm font-semibold text-aurora-graphite">{scene.people}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6">推薦理由：{getRecommendationReason(scene, result)}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm leading-6">
                      <div>
                        <p className="font-semibold">需求</p>
                        <ul className="mt-2 space-y-1 text-aurora-graphite">
                          {scene.needs.slice(0, 2).map((item) => (
                            <li key={item}>- {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold">特點</p>
                        <ul className="mt-2 space-y-1 text-aurora-graphite">
                          {scene.features.slice(0, 2).map((item) => (
                            <li key={item}>- {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 grid grid-cols-[1.1fr_0.9fr] gap-5">
              <div className="border border-aurora-line p-5">
                <p className="text-sm font-semibold text-aurora-red">03 / Implementation Direction</p>
                <h2 className="mt-2 text-2xl font-semibold">建議導入方向</h2>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-aurora-graphite">
                  {implementationDirections.map((item, index) => (
                    <li key={item}>
                      <span className="font-semibold text-aurora-red">{index + 1}. </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="border border-aurora-red bg-aurora-soft p-5">
                <p className="text-sm font-semibold text-aurora-red">Next Step</p>
                <h2 className="mt-2 text-2xl font-semibold">預約展廳</h2>
                <p className="mt-4 text-sm leading-6 text-aurora-graphite">
                  建議攜帶本報告至 NEXt-WORK 或 ACTIVA 展示場景，依主模式與 Top 5 場景卡進行空間需求盤點、場景優先級排序與導入路線討論。
                </p>
                <p className="mt-5 border-t border-aurora-line pt-4 text-sm font-semibold text-aurora-red">CTA：預約展廳 / 聯絡業務 / 官方網頁 / 更多新知 / 型錄下載</p>
              </div>
            </section>
          </section>
        </>
      ) : null}
    </section>
  );
}
