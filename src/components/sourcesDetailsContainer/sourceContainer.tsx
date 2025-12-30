// SourceContainer.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import PaymentsContainer from "./paymentsContainer";
import InformationContainer from "./informationContainer";
type SourceContainerProps = {
	source: string;
	open: boolean;
	onClick: () => void;
};
const payments = [
	{ id: "KUB", name: "Kub", amount: 500 },
	{ id: "Cell", name: "Cell", amount: 500 },
	{ id: "Wifi", name: "Wifi", amount: 500 },
];
const earnings = [{ id: "KUB", name: "Spaces In the City", amount: 500 }];

const informations = [
	{ id: 1, infoPair: "Monthly cycle amount", data: "400.00$" },
	{ id: 2, infoPair: "Current amount for this month", data: "400.00$" },
	{ id: 3, infoPair: "Description", data: "description" },
	{ id: 4, infoPair: "Average monthly total payment", data: "400.00$" },
];
const EarningInfo = [
	{ id: 1, infoPair: "Monthly cycle amount", data: "400.00$" },
	{ id: 2, infoPair: "Current amount for this month", data: "400.00$" },
	{ id: 3, infoPair: "Description", data: "description" },
	{ id: 4, infoPair: "Average monthly total payment", data: "400.00$" },
];

export default function SourceContainer({
	source,
	open,
	onClick,
}: SourceContainerProps) {
	//payments state control
	const [openPayments, setOpenPayments] = useState<{
		[paymentId: string]: boolean;
	}>({});

	return (
		<div
			className={`w-full flex flex-col xs:flex-col border-4 border-[#29388A] rounded items-center p-2 cursor-pointer transition-all ${open ? "bg-[#29388A]" : ""}`}
		>
			<div className="flex flex-row mt-auto ml-0 items-center self-start">
				{" "}
				<h1
					className={`text-2xl xs:text-3xl text-[#1E1552] ${open ? "text-[#FFFFFF]" : ""} font-bold mr-2`}
					onClick={onClick}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							onClick();
						}
					}}
					tabIndex={0}
					role="button"
				>
					{source}
				</h1>
				<Image
					onClick={onClick}
					src="/sourceArrowBig.svg"
					alt="Menu icon"
					width={32}
					height={32}
					className={`w-8 h-8 transition-transform ${open ? "rotate-90" : ""}`}
				/>
			</div>
			<div className="flex flex-col xs:flex-row gap-2 w-full">
				{open && (
					<div className="mt-2 p-3 rounded transition-all">
						{earnings.map((earning) => (
							<PaymentsContainer
								key={earning.id}
								amount={earning.amount}
								name={earning.name}
								open={!!openPayments[earning.id]}
								onClick={() =>
									setOpenPayments((prev) => ({
										...prev,
										[earning.id]: !prev[earning.id],
									}))
								}
							/>
						))}
					</div>
				)}
				{open && (
					<div className="w-full bg-[#0D1A63] gap-2 rounded z-[9999] mt-auto p-1 relative">
						{informations.map((info) => (
							<InformationContainer
								key={info.id}
								infoPair={info.infoPair}
								data={info.data}
							></InformationContainer>
						))}
						{open && (
							<Image
								src="/infoIco.svg"
								alt="Menu icon"
								width={36}
								height={36}
								className="absolute top-0 right-0"
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
