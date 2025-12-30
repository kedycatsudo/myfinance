"use client";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useState } from "react";
import PaymentField from "./paymentField";
type PaymentsContainerProps = {
	name: string;
	onClick: () => void;
	amount: number;
	open: boolean;
	openPayments: { [paymentId: string]: boolean };
	setOpenPayments: Dispatch<SetStateAction<{ [paymentId: string]: boolean }>>;
};
const paymentFields = [
	{ id: 1, field: "paymentName", variable: "Kub" },
	{ id: 2, field: "type", variable: "credit card" },
	{ id: 3, field: "payment amount", variable: "400" },
	{ id: 4, field: "date", variable: "12/25/2025" },
	{ id: 5, field: "loop", variable: "true" },
	{ id: 6, field: "status", variable: "paid" },
];

export default function PaymentsContainer({
	onClick,
	open,
	name,
	amount,
	openPayments,
	setOpenPayments,
}: PaymentsContainerProps) {
	const [openPaymentFields, setOpenPaymentFields] = useState<{
		[FieldId: string]: boolean;
	}>({});
	return (
		<div
			className={` text-[#FFFFF] w-full flex flex-col rounded gap-2 p-2 cursor-pointer transition-all ${open ? "bg-[#29388A]" : ""}`}
		>
			<div></div>
			<div className="flex flex-row justify-start items-center">
				<h1
					className={`text-2xl xs:text-3xl text-[#FFFFF] font-bold mr-2`}
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
					{name}
				</h1>
				<h1
					className={`text-2xl xs:text-3xl text-[#FFFFF] font-bold mr-2`}
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
					{amount + ".00$"}
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
				<div className="">
					{paymentFields.map((field) => (
						<PaymentField
							key={field.id}
							field={field.field}
							variable={field.variable}
						></PaymentField>
					))}
				</div>
			)}
		</div>
	);
}
