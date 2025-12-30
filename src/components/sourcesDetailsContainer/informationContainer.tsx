"use client";
import Image from "next/image";
type InformationContainerProps = {
	infoPair: string;
	data: string;
};

export default function InformationContainer({
	infoPair,
	data,
}: InformationContainerProps) {
	return (
		<div>
			<div className="flex flex-row w-full gap-3 w-full">
				{" "}
				<p>{infoPair}:</p>
				<p>{data}</p>
			</div>
		</div>
	);
}
