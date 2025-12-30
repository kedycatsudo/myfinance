"use client";
import React from "react";
type FinancialItem = {
	name: string;
	amount: number;
	date: date;
	description?: string;
	data?: string;
};

type InOutSnapshotProps = {
	header: string;
	items: FinancialItem[];
	className?: string;
	pathName?: string;
};

export default function FinancialSnapShot({
	header,
	items,
	className,
	description,
	data,
	amount,
	pathName,
}: InOutSnapshotProps) {
	const total = items.reduce((sum, item) => sum + item.amount, 0);

	if (pathName === "outcomes") return null;
	return (
		<div
			className={
				"w-full bg-[#3A4483]/75 rounded-[16px] p-1 flex flex-col items-center shadow-lg"
			}
		>
			<h3 className="text-white font-bold text-l xs:text-xl mb-2 text-center">
				{header}
			</h3>
			<div className="w-full h-1 mb-0.5 bg-[#29388A] rounded" />
			{/* Items */}
			<div className="w-full">
				{items.map((item, idx) => (
					<React.Fragment key={item.name}>
						<div className="flex flex-row justify-between items-center py-2 gap-1">
							<span className="text-white text-s xs:text-xl">{item.name}</span>
							<div className="flex flex-col xs:flex-row gap-1">
								<span className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-s xs:text-xl shadow-inner text-[#a9deff]">
									{item.amount.toLocaleString(undefined, {
										minimumFractionDigits: 2,
									})}
									$
								</span>{" "}
								<span className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-s xs:text-xl shadow-inner">
									{new Date(item.date).toLocaleDateString()}
								</span>{" "}
							</div>
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
			{(header === "Current Outcomes" ||
				header === "Current Incomes" ||
				header === "Quick Catch Up For This Month" ||
				header === "Outcome Sources") && (
				<div className="flex items-center justify-between py-2 gap-4 w-full">
					<span className="text-white font-semibold text-l xs:text-xl">
						Total{" "}
					</span>
					<span className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-s xs:text-xl shadow-inner">
						{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}$
					</span>
				</div>
			)}
		</div>
	);
}
