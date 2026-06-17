import scenes from "@/data/workplace-scenes.json";
import { SceneCard } from "@/components/SceneCard";
import type { WorkplaceScene } from "@/lib/types";

const typedScenes = scenes as WorkplaceScene[];

export default function ScenesPage() {
  return (
    <section className="aurora-container py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aurora-red">Scene data</p>
        <h1 className="mt-3 text-4xl font-semibold text-aurora-ink">場景資料頁</h1>
        <p className="mt-4 leading-7 text-aurora-graphite">
          第一版資料來源為 <span className="font-semibold text-aurora-ink">data/workplace-scenes.json</span>。後續可擴充為案例、產品、產業與客戶痛點的對應資料庫。
        </p>
      </div>
      <div className="mt-10 grid gap-5">
        {typedScenes.map((scene) => (
          <SceneCard key={scene.id} scene={scene} />
        ))}
      </div>
    </section>
  );
}
