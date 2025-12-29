// SourceContainer.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import PaymentsContainer from "./paymentsContainer";

type SourceContainerProps = {
	source: string;
	open: boolean;
	onClick: () => void;
};
const payments = [
	{ id: "KUB", name: "KUB", amount: 500 },
	{ id: "Cell", name: "Cell", amount: 500 },
	{ id: "Wifi", name: "Wifi", amount: 500 },
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
			className={`w-full flex flex-col border-4 border-[#29388A] rounded gap-2 p-2 cursor-pointer transition-all ${open ? "bg-[#29388A]" : ""}`}
		>
			<div className="flex flex-row justify-start items-center">
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

			{open && (
				<div className="mt-2 p-3 rounded transition-all">
					{payments.map((payment) => (
						<PaymentsContainer
							key={payment.id}
							name={payment.name}
							open={!!openPayments[payment.id]}
							onClick={() =>
								setOpenPayments((prev) => ({
									...prev,
									[payment.id]: !prev[payment.id],
								}))
							}
						/>
					))}
					{/* Add your expanded source details here */}
				</div>
			)}
		</div>
	);
}
