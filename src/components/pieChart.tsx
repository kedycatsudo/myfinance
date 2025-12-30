import React from "react";

type PieData = {
	name: string;
	amount: number;
};

type PieChartProps = {
	data: PieData[];
	size?: number;
	colors?: string[];
	className?: string;
};

// Some default colors, enough for most use cases
const defaultColors = [
	"#4FD1C5",
	"#FF6B6B",
	"#F7B801",
	"#3DD598",
	"#6A82FB",
	"#FB7DA6",
	"#7D5FFF",
	"#FEB72B",
];

function getColor(idx: number, custom?: string[]) {
	if (custom && custom[idx]) return custom[idx];
	return defaultColors[idx % defaultColors.length];
}

export default function PieChart({
	data,
	size = 200,
	colors,
	className,
}: PieChartProps) {
	const total = data.reduce((sum, d) => sum + Math.max(0, d.amount), 0) || 1;
	const radius = size / 2 - 8;
	const cx = size / 2,
		cy = size / 2;
	const circ = 2 * Math.PI * radius;

	// Compute start/end for each slice
	let prevPercent = 0;
	const slices = data.map((item, idx) => {
		const percent = Math.max(0, item.amount) / total;
		const dash = circ * percent;
		const slice = {
			color: getColor(idx, colors),
			dash,
			offset: -circ * prevPercent,
		};
		prevPercent += percent;
		return slice;
	});
	return (
		<div
			className={
				"flex flex-col items-center" + (className ? ` ${className}` : "")
			}
		>
			{/* Pie chart */}
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				style={{ display: "block" }}
			>
				{slices.map((s, idx) => (
					<circle
						key={idx}
						r={radius / 2}
						cx={cx}
						cy={cy}
						fill="none"
						stroke={s.color}
						strokeWidth={size / 2}
						strokeDasharray={`${s.dash} ${circ - s.dash}`}
						strokeDashoffset={s.offset}
						style={{
							transition: "stroke-dasharray 0.3s, stroke-dashoffset 0.3s",
						}}
					/>
				))}
				{/* Center hole for donut */}
			</svg>
		</div>
	);
}
