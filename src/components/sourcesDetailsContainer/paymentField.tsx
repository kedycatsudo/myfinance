"use client";
type PaymentFieldProps = {
	field: string;
	name: string;
};

export default function PaymentField({ field, name }: PaymentFieldProps) {
	return (
		<div className="flex gap-1">
			<p>{field}:</p>
			<p>{name}</p>
		</div>
	);
}
