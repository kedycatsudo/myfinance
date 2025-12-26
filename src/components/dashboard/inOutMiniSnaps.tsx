"use client";
import React from "react";
type FinancialItem = { name: string; amount: number; date: date };

type InOutSnapshotProps = {
	header: string;
	items: FinancialItem[];
};

export default function FinancialSnapShot({
	header,
	items,
}: InOutSnapshotProps) {
	const total = items.reduce((sum, item) => sum + item.amount, 0);

	return (
		<div className="w-full bg-[#3A4483]/75 rounded-[16px] p-3 flex flex-col items-center shadow-lg">
			<h3 className="text-white font-bold text-lg mb-2 text-center">
				{header}
			</h3>
			<div className="w-full h-1 mb-2 bg-[#29388A] rounded" />
			{/* Items */}
			<div className="w-full">
				{items.map((item, idx) => (
					<React.Fragment key={item.name}>
						<div className="flex items-center justify-between py-2">
							<span className="text-white text-sm md:text-base">
								{item.name}
							</span>
							<span className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-xs md:text-sm lg:text-sm shadow-inner">
								{item.amount.toLocaleString(undefined, {
									minimumFractionDigits: 2,
								})}
								$
							</span>{" "}
							<span className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-xs md:text-sm lg:text-sm shadow-inner">
								{new Date(item.date).toLocaleDateString()}
							</span>{" "}
						</div>

						{/* Divider except last item */}
						{idx < items.length - 1 && (
							<div className="h-0.5 bg-[#29388A] opacity-60 rounded"></div>
						)}
					</React.Fragment>
				))}
			</div>
			<div className="w-full h-1 my-2 bg-[#29388A] rounded" />
			{/* Total Row */}
			{(header === "Outcomes" || header === "Incomes") && (
				<div className="flex items-center justify-between py-2 gap-4 w-full">
					<span className="text-white font-semibold">Total</span>
					<span className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-xs md:text-sm lg:text-sm shadow-inner">
						{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}$
					</span>
				</div>
			)}
		</div>
	);
}
