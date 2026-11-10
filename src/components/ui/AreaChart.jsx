import React, { useMemo } from "react";
import { RESTATEFI_CHART } from "../../utils/chartTheme";

/** Tiny SVG area chart — replaces recharts for the portfolio view */
export default function AreaChart({ data = [], height = 220 }) {
  const { points, area, labels } = useMemo(() => {
    if (!data.length) return { points: "", area: "", labels: [] };
    const values = data.map((d) => Number(d.value) || 0);
    const max = Math.max(...values, 1);
    const w = 100;
    const h = 100;
    const step = data.length > 1 ? w / (data.length - 1) : w;
    const coords = values.map((v, i) => {
      const x = data.length > 1 ? i * step : w / 2;
      const y = h - (v / max) * (h - 8) - 4;
      return [x, y];
    });
    const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
    const fill = `${line} L${coords[coords.length - 1][0]},${h} L${coords[0][0]},${h} Z`;
    return {
      points: line,
      area: fill,
      labels: data.map((d, i) => ({
        name: d.name,
        x: coords[i][0],
      })),
    };
  }, [data]);

  if (!data.length) return null;

  return (
    <svg
      viewBox="0 0 100 118"
      width="100%"
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label="Investment performance chart"
    >
      <defs>
        <linearGradient id="rfArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={RESTATEFI_CHART.stroke} stopOpacity="0.35" />
          <stop offset="95%" stopColor={RESTATEFI_CHART.stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke={RESTATEFI_CHART.grid}
          strokeDasharray="2 2"
          strokeWidth="0.4"
        />
      ))}
      <path d={area} fill="url(#rfArea)" />
      <path d={points} fill="none" stroke={RESTATEFI_CHART.stroke} strokeWidth="1.2" />
      {labels.map((l) => (
        <text
          key={`${l.name}-${l.x}`}
          x={l.x}
          y="112"
          textAnchor="middle"
          fontSize="3.2"
          fill={RESTATEFI_CHART.axis}
        >
          {String(l.name).slice(0, 8)}
        </text>
      ))}
    </svg>
  );
}
