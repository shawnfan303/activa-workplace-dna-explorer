import { generateStakeholderTalkingPoints } from "@/lib/briefGenerator";

type StakeholderTalkingPointsProps = {
  stakeholder: string;
};

export function StakeholderTalkingPoints({ stakeholder }: StakeholderTalkingPointsProps) {
  const points = generateStakeholderTalkingPoints(stakeholder);

  return (
    <div className="border border-aurora-line bg-aurora-soft p-5">
      <p className="text-sm font-semibold text-aurora-red">角色化溝通重點</p>
      <h3 className="mt-2 text-xl font-semibold text-aurora-ink">{stakeholder || "尚未選擇主要溝通對象"}</h3>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-aurora-graphite">
        {points.map((point) => (
          <li key={point}>- {point}</li>
        ))}
      </ul>
    </div>
  );
}
