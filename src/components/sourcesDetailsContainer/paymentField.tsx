"use client";
type PaymentFieldProps = {
	field: string;
	variable: string;
};

export default function PaymentField({ field, variable }: PaymentFieldProps) {
	return (
		<div className="flex gap-1">
			<p>{field}:</p>
			<p>{variable}</p>
		</div>
	);
}
