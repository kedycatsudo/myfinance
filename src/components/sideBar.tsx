"use client";
import Link from "next/link";
import Image from "next/image";
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
				"flex flex-col w-full bg-[#727272] opacity-75 items-center" +
				(className ? ` ${className}` : "")
			}
		>
			<Image
				src="/Menu.svg"
				alt="Menu icon"
				width={80}
				height={80}
				className="w-8 h-8 mt-2 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
			/>
			{navItems.map(({ href, label }) => {
				const isActive = activePath === href;
				return (
					<div
						key={label}
						className={
							// If active, apply your special highlight style
							(isActive ? " w-full bg-[#3A4483] opacity rounded" : "w-full") +
							" relative"
						}
					>
						<Link
							href={href}
							className={
								`block text-s xs:text-xl font-bold cursor-pointer hover:text-[#1E1552] text-center py-2 z-[9999] ` +
								(isActive ? "text-white z-[9999]" : "text-[#A5A5A5]")
							}
						>
							{label}
						</Link>
						<div className="w-full h-2 bg-[#3A4483] rounded" />
					</div>
				);
			})}
		</aside>
	);
}
