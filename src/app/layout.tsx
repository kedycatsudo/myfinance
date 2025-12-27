import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="gap-6 p-1 bg-[#A9AECE]">
				<Header></Header>
				{children}
			</body>
		</html>
	);
}
