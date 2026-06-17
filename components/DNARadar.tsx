import { modeLabels, workplaceModes } from "@/lib/scoring";
import type { ModeScores, WorkplaceMode } from "@/lib/types";

function formatPercent(score: number, maxScore: number) {
  if (maxScore === 0) {
    return 0;
  }
  return Math.round((score / maxScore) * 100);
}

export function DNARadar({ scores }: { scores: ModeScores }) {
  const size = 300;
  const center = size / 2;
  const radius = 96;
  const maxScore = Math.max(...Object.values(scores), 1);

  function pointFor(mode: WorkplaceMode, scale = 1) {
    const index = workplaceModes.indexOf(mode);
    const angle = (-90 + index * 60) * (Math.PI / 180);
    const valueScale = (scores[mode] / maxScore) * scale;

    return {
      x: center + Math.cos(angle) * radius * valueScale,
      y: center + Math.sin(angle) * radius * valueScale
    };
  }

  const polygonPoints = workplaceModes.map((mode) => pointFor(mode)).map((point) => `${point.x},${point.y}`).join(" ");
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-[300px] w-[300px]" role="img" aria-label="Workplace DNA 雷達分數">
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={workplaceModes
              .map((mode) => pointFor(mode, level))
              .map((point) => `${point.x},${point.y}`)
              .join(" ")}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}
        {workplaceModes.map((mode) => {
          const edge = pointFor(mode, 1);
          const label = pointFor(mode, 1.23);
          return (
            <g key={mode}>
              <line x1={center} y1={center} x2={edge.x} y2={edge.y} stroke="#E5E7EB" strokeWidth="1" />
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" className="fill-aurora-graphite text-[11px]">
                {modeLabels[mode].replace("模式", "")}
              </text>
            </g>
          );
        })}
        <polygon points={polygonPoints} fill="rgba(200,16,46,0.14)" stroke="#C8102E" strokeWidth="2" />
        {workplaceModes.map((mode) => {
          const point = pointFor(mode);
          return <circle key={mode} cx={point.x} cy={point.y} r="4" fill="#C8102E" />;
        })}
      </svg>
      <div className="space-y-4">
        {workplaceModes.map((mode) => {
          const percent = formatPercent(scores[mode], maxScore);
          return (
            <div key={mode}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-aurora-ink">{modeLabels[mode]}</span>
                <span className="text-aurora-graphite">{scores[mode]} 分</span>
              </div>
              <div className="h-2 bg-aurora-soft">
                <div className="h-2 bg-aurora-red" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
