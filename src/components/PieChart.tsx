import React from 'react';

export const CATEGORY_COLORS: Record<string, string> = {
  Outcomes: '#FF6B6B', // red
  Incomes: '#3DD598', // green
  // Add more categories as needed!
};

export const DEFAULT_CHART_COLORS = [
  '#4FD1C5',
  '#FF6B6B',
  '#F7B801',
  '#3DD598',
  '#6A82FB',
  '#FB7DA6',
  '#7D5FFF',
  '#FEB72B',
];

type PieData = {
  name: string;
  amount: number;
  color?: string; // Optional: custom assigned color per slice
};

type PieChartProps = {
  data: PieData[];
  size?: number;
  className?: string;
  ringWidth?: number; // Optional: overrides donut thickness
};

// Function for selecting the color for a slice
function pickColor(idx: number, item: PieData): string {
  if (item.color) return item.color;
  if (CATEGORY_COLORS[item.name]) return CATEGORY_COLORS[item.name];
  return DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length];
}

export default function PieChart({
  data,
  size = 300,
  className,
  ringWidth = 100, // optional donut thickness
}: PieChartProps) {
  // Donut ring config (default: donut with small hole, change to size/2 for big hole, or <16 for filled pie)
  const effectiveRingWidth = typeof ringWidth === 'number' ? ringWidth : Math.max(16, size / 8);
  const radius = size / 2 - effectiveRingWidth;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * radius;

  const total = data.reduce((sum, d) => sum + Math.max(0, d.amount), 0) || 1;

  let prevPercent = 0;
  const slices = data.map((item, idx) => {
    const percent = Math.max(0, item.amount) / total;
    const dash = circ * percent;
    const slice = {
      color: pickColor(idx, item),
      dash,
      offset: -circ * prevPercent,
    };
    prevPercent += percent;
    return slice;
  });
  // Debug
  // console.log('PieChart slices:', slices);

  return (
    <div className={'flex flex-col items-center' + (className ? ` ${className}` : '')}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        {slices.map((s, idx) => (
          <circle
            key={idx}
            r={radius}
            cx={cx}
            cy={cy}
            fill="none"
            stroke={s.color}
            strokeWidth={effectiveRingWidth}
            strokeDasharray={`${s.dash} ${circ - s.dash}`}
            strokeDashoffset={s.offset}
            style={{
              transition: 'stroke-dasharray 0.3s, stroke-dashoffset 0.3s',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
