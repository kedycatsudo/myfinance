import React from "react";

type Entry = {
	name: string;
	price: string;
	date: string;
};

type RecentContainerProps = {
	investments: Entry[];
	miscs: Entry[];
};

export default function DashboardSideContainer({
	investments,
	miscs,
}: RecentContainerProps) {
	return (
		<div
			className="flex flex-col items-center justify-center"
			style={{
				width: 245,
				height: 772,
				background: "#3A4483",
				opacity: 0.75,
				borderRadius: "18px",
				paddingTop: 20,
				paddingBottom: 20,
				paddingLeft: 8,
				paddingRight: 8,
			}}
		>
			{/* Recently Investment */}
			<Section title="Recently Investment" entries={investments} />

			{/* Recently Miscs */}
			<Section title="Recently Miscs" entries={miscs} />
		</div>
	);
}

// SECTION Helper
function Section({ title, entries }: { title: string; entries: Entry[] }) {
	return (
		<div className="w-full flex flex-col items-center">
			<h3 className="text-white font-bold text-lg mb-1">{title}</h3>
			{/* Thick Divider */}
			<div className="w-full h-3 mb-2 rounded bg-[#29388A]" />
			{entries.map((e, idx) => (
				<React.Fragment key={e.name + e.date}>
					<EntryCard {...e} />
					{idx < entries.length - 1 ? (
						// Thin divider (between items)
						<div className="w-full h-1 my-2 bg-[#29388A] opacity-60 rounded" />
					) : (
						// If last entry, thick divider below header
						<div className="w-full h-3 mt-3 mb-2 rounded bg-[#29388A]" />
					)}
				</React.Fragment>
			))}
		</div>
	);
}

// ENTRY Helper
function EntryCard({ name, price, date }: Entry) {
	return (
		<div className="flex flex-col items-center justify-center mb-2 w-full">
			{/* Name */}
			<span className="text-white text-base font-semibold">{name}</span>
			{/* Price Box */}
			<div className="mt-1 bg-[#29388A] bg-opacity-60 border-2 border-[#29388A] rounded px-3 py-1 font-bold text-[#a9deff] text-sm shadow-inner">
				{price}
			</div>
			{/* Date Box */}
			<div className="mt-1 bg-[#29388A] bg-opacity-60 border-2 border-[#29388A] rounded px-2 py-[2px] font-medium text-[#e7e7e7] text-xs">
				{date}
			</div>
		</div>
	);
}
