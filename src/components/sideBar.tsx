"use client";
import Link from "next/link";
type SidebarProps = {
	className?: string;
	activePath?: string;
	// ...other props if needed
};
const navItems = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/incomes", label: "Incomes" },
	{ href: "/outcomes", label: "Outcomes" },
	{ href: "/investments", label: "Investments" },
	{ href: "/profile", label: "Profile" },
	{ href: "/logout", label: "Logout" },
];

export default function SideBar({ className, activePath }: SidebarProps) {
	return (
		<aside
			className={
				"w-full bg-[#727272] opacity-75 flex flex-col items-center relative" +
				(className ? ` ${className}` : "")
			}
		>
			<img
				src="/Menu.svg"
				alt="Menu icon"
				className="mt-2 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
			/>{" "}
			{navItems.map(({ href, label }) => {
				const isActive = activePath === href;
				return (
					<div
						key={label}
						className={
							// If active, apply your special highlight style
							(isActive ? "w-full bg-[#3A4483] opacity-75 rounded" : "w-full") +
							" relative"
						}
					>
						<Link
							href={href}
							className={
								`block text-xs md:text-m lg:text-xl font-bold cursor-pointer hover:text-blue-200 text-center w-full py-2 z-[9999] ` +
								(isActive ? "text-white" : "text-[#A5A5A5]")
							}
						>
							{label}
						</Link>
					</div>
				);
			})}
		</aside>
	);
}
