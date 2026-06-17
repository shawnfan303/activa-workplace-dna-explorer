"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import scenes from "@/data/workplace-scenes.json";
import { DNARadar } from "@/components/DNARadar";
import { ResultSummary } from "@/components/ResultSummary";
import { SceneCard } from "@/components/SceneCard";
import { getImplementationDirections, getRecommendationReason, matchScenes } from "@/lib/recommendations";
import { modeLabels, workplaceModes } from "@/lib/scoring";
import type { WorkplaceDnaResult, WorkplaceScene } from "@/lib/types";

const typedScenes = scenes as WorkplaceScene[];
const storageKey = "activa-workplace-dna-result";

function formatPercent(score: number, maxScore: number) {
  if (maxScore === 0) {
    return 0;
  }
  return Math.round((score / maxScore) * 100);
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

    const originalTitle = document.title;
    document.title = "ACTIVA Workplace DNA 診斷結果";
    window.print();
    document.title = originalTitle;
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
              <button type="button" onClick={handleDownload} className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">
                下載診斷結果
              </button>
              <a href="mailto:?subject=預約 ACTIVA 展廳" className="border border-aurora-red px-5 py-3 text-sm font-semibold text-aurora-red transition hover:bg-aurora-red hover:text-white">
                預約展廳
              </a>
              <a href="mailto:?subject=聯絡 ACTIVA 業務" className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
                聯絡業務
              </a>
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
                <p className="mt-5 border-t border-aurora-line pt-4 text-sm font-semibold text-aurora-red">CTA：預約展廳 / 聯絡業務 / 啟動場景顧問討論</p>
              </div>
            </section>
          </section>
        </>
      ) : null}
    </section>
  );
}
