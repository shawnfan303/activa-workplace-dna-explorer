import type { Metadata } from "next";
import Link from "next/link";
import { UsageCounter } from "@/components/UsageCounter";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  title: "顧客經營工具箱",
  description: "讓營業依照案件前期開發進度，挑選 Discovery Assistant、Workplace DNA 與 Case Match Engine。"
};

const tools = [
  {
    step: "01",
    phase: "拜訪前",
    need: "還不確定客戶真正需求，需要先整理拜訪方向",
    name: "Discovery Assistant",
    href: "/discovery-assistant",
    role: "拜訪前釐清需求",
    description: "協助營業把客戶背景、專案情境、利害關係人、痛點與可能追問方向整理成一份可帶去拜訪的需求探索摘要。",
    outputs: ["需求探索摘要", "關鍵提問清單", "利害關係人切入點", "展廳導覽建議"],
    cta: "用這個工具釐清需求"
  },
  {
    step: "02",
    phase: "需求轉譯",
    need: "已掌握初步需求，需要轉成工作模式與辦公場景",
    name: "Workplace DNA",
    href: "/",
    role: "將需求轉為工作模式人格／場景",
    description: "把客戶的抽象需求轉換成專注、協作、專案、學習、社交與放鬆等工作模式，讓營業能用場景語言與客戶討論。",
    outputs: ["Workplace DNA 分數", "主導工作模式", "ACTIVA 場景推薦", "結果頁與場景卡"],
    cta: "進入 Workplace DNA 首頁"
  },
  {
    step: "03",
    phase: "案例佐證",
    need: "需要公開案例支撐提案，讓客戶更容易理解方向",
    name: "Case Match Engine",
    href: "/case-match",
    role: "找到可借鏡的公開案例",
    description: "依據客戶情境與需求方向，找出可借鏡的公開案例，協助營業準備提案素材與顧問式說明。",
    outputs: ["案例匹配結果", "可借鏡重點", "提案可用案例語言", "公開來源脈絡"],
    cta: "用這個工具找案例"
  }
];

export default function CustomerToolboxPage() {
  return (
    <section className="min-h-screen bg-white">
      <div className="aurora-container py-8 md:py-10">
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-aurora-line pb-6">
          <div className="flex items-center gap-5">
            <img className="h-11 w-auto" src={`${assetPath("/images/aurora-furniture-logo.png")}?v=transparent`} alt="震旦家具 AURORA Furniture" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-aurora-red">Sales development toolbox</p>
          </div>
          <UsageCounter variant="compact" />
        </header>

        <div className="py-8">
          <div>
            <h1 className="whitespace-nowrap text-[clamp(2.35rem,5.8vw,4.9rem)] font-semibold leading-none text-aurora-ink">
              顧客經營工具箱
            </h1>
            <p className="mt-6 whitespace-nowrap text-[clamp(0.72rem,1.25vw,1.05rem)] leading-8 text-aurora-graphite">
              營業可依照目前案件開發進度與需求，從下方三個應用工具中挑選最適合的工具，逐步完成需求釐清、工作場景診斷與公開案例佐證。
            </p>
          </div>

          <div className="mt-7 border-l-4 border-aurora-red bg-aurora-soft p-5">
            <p className="text-sm font-semibold text-aurora-red">建議使用流程</p>
            <p className="mt-3 text-2xl font-semibold leading-9 text-aurora-ink">
              Discovery Assistant → Workplace DNA → Case Match Engine
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {tools.map((tool) => (
            <article key={tool.name} className="grid gap-5 border border-aurora-line bg-white p-5 shadow-subtle lg:grid-cols-[minmax(0,1fr)_230px] lg:items-stretch">
              <div className="grid gap-4">
                <div className="grid gap-3 border-b border-aurora-line pb-4 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-center">
                  <p className="text-sm font-semibold tracking-[0.18em] text-aurora-red">STEP {tool.step}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-2xl font-semibold text-aurora-ink">{tool.name}</h2>
                    <span className="inline-flex border border-aurora-line px-3 py-1 text-sm font-semibold text-aurora-graphite">{tool.phase}</span>
                  </div>
                </div>

                <div className="grid gap-3 border-b border-aurora-line pb-4 lg:grid-cols-[190px_minmax(0,1fr)]">
                  <p className="text-sm font-semibold text-aurora-red">目前如果你是...</p>
                  <p className="text-lg font-semibold leading-8 text-aurora-ink">{tool.need}</p>
                </div>

                <div className="grid gap-3 border-b border-aurora-line pb-4 lg:grid-cols-[190px_minmax(0,1fr)]">
                  <p className="text-sm font-semibold text-aurora-red">在流程中的角色</p>
                  <div>
                    <p className="text-base font-semibold leading-7 text-aurora-ink">{tool.role}</p>
                    <p className="mt-2 text-base leading-7 text-aurora-graphite">{tool.description}</p>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-start">
                  <p className="text-sm font-semibold text-aurora-red">可以取得的輸出</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.outputs.map((output) => (
                      <span key={output} className="border border-aurora-line bg-aurora-soft px-4 py-2 text-sm font-semibold text-aurora-ink">
                        {output}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-stretch lg:justify-end">
                <Link href={tool.href} className="inline-flex min-h-28 w-full items-center justify-center whitespace-nowrap bg-aurora-red px-5 py-4 text-center text-sm font-semibold leading-6 text-white transition hover:bg-red-800 lg:min-h-full lg:w-56">
                  {tool.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
