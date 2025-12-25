"use client";
import React from "react";

type Entry = {
	name: string;
	price: string;
	date: string;
};

type RecentContainerProps = {
	investments: Entry[];
	miscs: Entry[];
	className?: string;
};

export default function DashboardSideContainer({
	investments,
	miscs,
	className = "",
}: RecentContainerProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center w-40 h-128 rounded-xl pt-2 pb-2 px-1 bg-[#3A4483]/75 ${className}`}
			style={{ minWidth: 0 }}
		>
			<Section title="Recently Investment" entries={investments} />
			<Section title="Recently Miscs" entries={miscs} />
		</div>
	);
}

function Section({ title, entries }: { title: string; entries: Entry[] }) {
	return (
		<div className="w-full flex flex-col items-center">
			<h3 className="text-white font-bold text-sm mb-0.5">{title}</h3>
			{/* Thick Divider */}
			<div className="w-full h-2 mb-1 rounded bg-[#29388A]" />
			{entries.map((e, idx) => (
				<React.Fragment key={`${e.name}-${e.date}`}>
					<EntryCard {...e} />
					{idx < entries.length - 1 ? (
						<div className="w-full h-0.5 my-0.5 bg-[#29388A] opacity-60 rounded" />
					) : (
						<div className="w-full h-2 mt-2 mb-1 rounded bg-[#29388A]" />
					)}
				</React.Fragment>
			))}
		</div>
	);
}

function EntryCard({ name, price, date }: Entry) {
	return (
		<div className="flex flex-col items-center justify-center mb-1 w-full">
			{/* Name */}
			<span className="text-white text-base font-semibold text-[15px]">
				{name}
			</span>
			{/* Price Box */}
			<div className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-sm shadow-inner">
				{price}
			</div>
			{/* Date Box */}
			<div className="mt-0.5 bg-[#29388A] bg-opacity-60 border border-[#29388A] rounded px-1 py-0.5 font-medium text-[#e7e7e7] text-xs">
				{date}
			</div>
		</div>
	);
}
