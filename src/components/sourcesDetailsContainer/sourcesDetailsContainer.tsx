"use client";

import { useState } from "react";
import SourceContainer from "./sourceContainer";
type SourcesDetailsContainer = {
	header: string;
};
const sources = [
	{ id: "salary", source: "Salary" },
	{ id: "upwork", source: "Upwork" },
	{ id: "investment", source: "Investment" },
	// ...add your sources here
];
export default function SourcesDetailsContainer({
	header,
}: SourcesDetailsContainer) {
	//soruces state control
	const [openSources, setOpenSources] = useState<{
		[sourceId: string]: boolean;
	}>({});

	return (
		<div className="flex flex-col rounded bg-[#989899] opacity-75 items-center gap-2 px-1">
			<h1 className="text-2xl xs:text-3xl text-[#29388A] font-bold">
				{header}
			</h1>
			<span className="w-full mt-0.5 bg-[#1E1552] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-s xs:text-xl shadow-inner"></span>
			{sources.map((src) => (
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
