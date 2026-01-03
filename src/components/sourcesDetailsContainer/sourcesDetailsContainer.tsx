"use client";

import { useState } from "react";
import SourceContainer from "./sourceContainer";
import { usePathname } from "next/navigation";
type SourcesDetailsContainer = {
	header: string;
};
type Sources = {
	id: number;
	source: string;
};

const incomeSources = [
	{ id: 1, source: "Salary" },
	{ id: 2, source: "Upwork" },
	{ id: 3, source: "Investment" },
	// ...add your sources here
];

const outcomeSources = [
	{ id: 1, source: "Mortgage" },
	{ id: 2, source: "Groccery" },
	{ id: 3, source: " Bills" },
];

const investmentSources = [
	{ id: 1, source: "Crypto" },
	{ id: 2, source: "Forex" },
	{ id: 3, source: "Real Estate" },
];

export default function SourcesDetailsContainer({
	header,
}: SourcesDetailsContainer) {
	//soruces state control
	const [openSources, setOpenSources] = useState<{
		[sourceId: string]: boolean;
	}>({});

	const pathname = usePathname();
	let datasSources: Sources[] = [];
	if (pathname === "/investments") {
		datasSources = investmentSources;
	}
	if (pathname === "/outcomes") datasSources = outcomeSources;
	if (pathname === "/incomes") datasSources = incomeSources;
	if (pathname === "investments") datasSources = investmentSources;
	return (
		<div className="flex flex-col rounded bg-[#989899] opacity-75 items-center gap-2 px-1">
			<h1 className="text-2xl xs:text-3xl text-[#29388A] font-bold">
				{header}
			</h1>
			<span className="w-full mt-0.5 bg-[#1E1552] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-s xs:text-xl shadow-inner"></span>
			{datasSources.map((src) => (
				<SourceContainer
					key={src.id}
					source={src.source}
					open={!!openSources[src.id]}
					onClick={() =>
						setOpenSources((prev) => ({
							...prev,
							[src.id]: !prev[src.id],
						}))
					}
				/>
			))}
		</div>
	);
}
