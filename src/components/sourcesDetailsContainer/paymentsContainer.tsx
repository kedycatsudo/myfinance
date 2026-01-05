"use client";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
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

type Fields = { id: number; name: string };

const paymentFields = [
	{ id: 1, field: "Name", name: "Kub" },
	{ id: 2, field: "type", name: "credit card" },
	{ id: 3, field: "amount", name: "400" },
	{ id: 4, field: "date", name: "12/25/2025" },
	{ id: 5, field: "loop", name: "true" },
	{ id: 6, field: "status", name: "paid" },
];
const investmentField = [
	{ id: 1, field: "Name", name: "Bitcoin" },
	{ id: 2, field: "term", name: "short" },
	{ id: 3, field: "amount", name: "400" },
	{ id: 4, field: "entry date", name: "12/25/2025" },
	{ id: 5, field: "exit date", name: "12122025" },
	{ id: 6, field: "result", name: "profit" },
	{ id: 7, field: "result amount", name: "100.00$" },
	{ id: 8, field: "status", name: "closed" },
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
	const pathName = usePathname();
	let datasField: Fields[] = [];
	if (pathName === "/investments") datasField = investmentField;
	else datasField = paymentFields;
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
					{datasField.map((field) => (
						<PaymentField
							key={field.id}
							field={field.field}
							name={field.name}
						></PaymentField>
					))}
				</div>
			)}
		</div>
	);
}
