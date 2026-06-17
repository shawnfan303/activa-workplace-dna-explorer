import { assetPath } from "@/lib/assets";
import { modeLabels } from "@/lib/scoring";
import type { WorkplaceScene } from "@/lib/types";

export function SceneCard({ scene, reason }: { scene: WorkplaceScene; reason?: string }) {
  return (
    <article className="overflow-hidden border border-aurora-line bg-white">
      <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
        <div className="border-b border-aurora-line bg-aurora-soft lg:border-b-0 lg:border-r">
          <img className="h-full min-h-[260px] w-full object-cover" src={assetPath(`/images/scenes/${scene.id}.webp`)} alt={scene.title} loading="lazy" />
        </div>
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-aurora-red">{modeLabels[scene.mode]}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-aurora-graphite">{scene.id}</p>
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-snug text-aurora-ink">{scene.title}</h2>
          <p className="mt-2 text-sm font-semibold text-aurora-graphite">適合人數：{scene.people}</p>
          {reason ? <p className="mt-4 border-l-4 border-aurora-red bg-aurora-soft p-4 text-sm leading-6 text-aurora-ink">推薦理由：{reason}</p> : null}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-aurora-ink">需求</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-aurora-graphite">
                {scene.needs.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-aurora-ink">特點</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-aurora-graphite">
                {scene.features.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
