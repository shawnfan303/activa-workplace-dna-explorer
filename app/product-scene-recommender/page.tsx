"use client";

import { useEffect, useMemo, useState } from "react";
import productsData from "@/src/data/products.json";
import scenesData from "@/src/data/scenes.json";
import designServicesData from "@/src/data/designServices.json";
import tagsData from "@/src/data/tags.json";
import { DesignServiceCard } from "@/src/components/DesignServiceCard";
import { ExhibitionVisitAdvice } from "@/src/components/ExhibitionVisitAdvice";
import { HeroSection } from "@/src/components/HeroSection";
import { ProductRecommendationCard } from "@/src/components/ProductRecommendationCard";
import { PublicDataNotice } from "@/src/components/PublicDataNotice";
import { RecommendationBrief } from "@/src/components/RecommendationBrief";
import { RecommenderForm } from "@/src/components/RecommenderForm";
import { SceneRecommendationCard } from "@/src/components/SceneRecommendationCard";
import { SelectionSummary } from "@/src/components/SelectionSummary";
import { generateRecommendationBrief } from "@/src/lib/briefGenerator";
import { generateExhibitionAdvice, recommendDesignServices, recommendProducts, recommendScenes } from "@/src/lib/recommendationEngine";
import type { DesignServiceItem, ProductItem, RecommenderInput, SceneItem } from "@/src/types/recommender";

const storageKey = "aurora-product-scene-input";

const initialInput: RecommenderInput = {
  space_type: ["職員空間", "專注空間"],
  user_role: ["一般員工", "混合辦公員工"],
  work_mode: ["專注"],
  style_preference: ["簡潔", "健康舒適"],
  pain_points: ["員工久坐不適", "缺乏專注空間"],
  solution_theme: ["健康辦公", "家具規劃"],
  industry: ["科技"],
  project_scenario: ["員工體驗改善"]
};

type FlowStep = "input" | "results" | "brief";

export default function ProductSceneRecommenderPage() {
  const [input, setInput] = useState<RecommenderInput>(initialInput);
  const [flowStep, setFlowStep] = useState<FlowStep>("input");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const products = productsData as ProductItem[];
  const scenes = scenesData as SceneItem[];
  const designServices = designServicesData as DesignServiceItem[];

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) setInput(JSON.parse(stored) as RecommenderInput);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(input));
  }, [input]);

  const recommendedProducts = useMemo(() => recommendProducts(input, products), [input, products]);
  const recommendedScenes = useMemo(() => recommendScenes(input, scenes), [input, scenes]);
  const recommendedServices = useMemo(() => recommendDesignServices(input, designServices), [input, designServices]);
  const selectedProducts = selectedProductIds.length > 0 ? recommendedProducts.filter((item) => selectedProductIds.includes(item.id)) : recommendedProducts.slice(0, 3);
  const exhibitionAdvice = useMemo(() => generateExhibitionAdvice(input, recommendedProducts, recommendedScenes), [input, recommendedProducts, recommendedScenes]);
  const briefMarkdown = useMemo(() => generateRecommendationBrief(input, selectedProducts, recommendedScenes, recommendedServices), [input, selectedProducts, recommendedScenes, recommendedServices]);
  const lastCrawled = [...products, ...scenes, ...designServices].map((item) => item.last_crawled).sort().at(-1);

  function goToStep(nextStep: FlowStep) {
    setFlowStep(nextStep);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function toggleProduct(productId: string) {
    setSelectedProductIds((current) => (current.includes(productId) ? current.filter((item) => item !== productId) : [...current, productId]));
  }

  function resetInput() {
    setInput(initialInput);
    setSelectedProductIds([]);
  }

  const stepItems = [
    { id: "input", label: "1 條件篩選" },
    { id: "results", label: "2 推薦結果" },
    { id: "brief", label: "3 推薦摘要" }
  ] satisfies Array<{ id: FlowStep; label: string }>;

  return (
    <div>
      <HeroSection onStart={() => goToStep("input")} />

      <div className="aurora-container py-8">
        <div className="grid gap-3 border border-aurora-line bg-white p-3 md:grid-cols-3">
          {stepItems.map((item) => (
            <button key={item.id} type="button" onClick={() => goToStep(item.id)} className={`px-4 py-3 text-left text-sm font-semibold ${flowStep === item.id ? "bg-aurora-red text-white" : "bg-aurora-soft text-aurora-graphite"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {flowStep === "input" ? (
        <div className="aurora-container grid gap-8 pb-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-6">
            <PublicDataNotice lastCrawled={lastCrawled} />
            <SelectionSummary value={input} />
            <button type="button" onClick={resetInput} className="w-full border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink transition hover:border-aurora-red hover:text-aurora-red">
              重新開始
            </button>
          </div>
          <div className="space-y-6">
            <RecommenderForm tags={tagsData as Record<keyof RecommenderInput, string[]>} value={input} onChange={setInput} />
            <div className="flex justify-end">
              <button type="button" onClick={() => goToStep("results")} className="bg-aurora-red px-6 py-3 text-sm font-semibold text-white shadow-subtle transition hover:bg-red-800">
                產生產品與場景推薦
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {flowStep === "results" ? (
        <div className="aurora-container space-y-10 pb-10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="space-y-6">
              <PublicDataNotice lastCrawled={lastCrawled} />
              <SelectionSummary value={input} />
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => goToStep("input")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">
                  返回修改條件
                </button>
                <button type="button" onClick={() => goToStep("brief")} className="bg-aurora-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-800">
                  產生推薦摘要
                </button>
              </div>
            </div>
            <section className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-aurora-red">區塊 1</p>
                <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">推薦產品分類</h2>
                <p className="mt-2 text-sm leading-7 text-aurora-graphite">Top 5 產品分類推薦。請勾選需要放入摘要的產品方向；若未勾選，摘要會預設使用前三筆。</p>
              </div>
              {recommendedProducts.map((item) => (
                <ProductRecommendationCard key={item.id} item={item} selected={selectedProductIds.includes(item.id)} onToggle={toggleProduct} />
              ))}
            </section>
          </div>

          <section className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-aurora-red">區塊 2</p>
              <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">推薦辦公場景</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {recommendedScenes.map((item) => <SceneRecommendationCard key={item.id} item={item} />)}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-aurora-red">區塊 3</p>
              <h2 className="mt-1 text-3xl font-semibold text-aurora-ink">大震設計服務建議</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {recommendedServices.map((item) => <DesignServiceCard key={item.id} item={item} />)}
            </div>
          </section>

          <ExhibitionVisitAdvice advice={exhibitionAdvice} />
        </div>
      ) : null}

      {flowStep === "brief" ? (
        <div className="aurora-container space-y-6 pb-10">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => goToStep("results")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">
              返回推薦結果
            </button>
            <button type="button" onClick={() => goToStep("input")} className="border border-aurora-line px-5 py-3 text-sm font-semibold text-aurora-ink hover:border-aurora-red hover:text-aurora-red">
              重新設定條件
            </button>
          </div>
          <RecommendationBrief markdown={briefMarkdown} />
        </div>
      ) : null}

      <footer className="border-t border-aurora-line bg-aurora-soft">
        <div className="aurora-container py-8 text-sm leading-7 text-aurora-graphite">
          <p className="font-semibold text-aurora-ink">公開資料聲明與免責聲明</p>
          <p className="mt-2">
            本工具目前使用 SAMPLE_PUBLIC_DATA_PENDING_REVIEW 示範資料。正式上線前，需由人工以震旦家具與大震設計官網公開資料替換 sample data，並將 review_status 改為 approved_public 後才可作為正式介面資料。
          </p>
          <p className="mt-2">資料最後更新日期：{lastCrawled ?? "尚未建立"}｜資料審核狀態：sample_pending_review</p>
        </div>
      </footer>
    </div>
  );
}

