import "./globals.css";
import type { ReactNode } from "react";
import DateTimeDisplay from "@/components/DateTimeDisplay";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="px-2 bg-[#A9AECE]">
				{children}
				<div className="p-1 m-5 bg-[#29388A] rounded font-bold text-[#a9deff] text-xs md:text-sm lg:text-sm shadow-inner absolute top-0 right-0">
					<DateTimeDisplay />
				</div>
			</body>
		</html>
	);
}
