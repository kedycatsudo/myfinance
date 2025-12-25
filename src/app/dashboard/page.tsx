"use client";
import SideBar from "@/components/sideBar";
import DashboardSideContainer from "@/components/dashboardSideContainer";
import MobileMenuButton from "@/components/mobileBurgerMenu";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
	const pathName = usePathname();
	return (
		<main className="min-h-screen bg-[#A9AECE] flex flex-row items-center  relative px-2">
			<div className=" w-20 sm:w-32 md:w-32 lg:w-48 flex flex-col items-center relative gap-5">
				<Image
					src="/images/myfinancelogo.png"
					alt="MyFinance Logo"
					width={80}
					height={80}
					className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 shadow-lg rounded-full object-cover z-[9999] mt-2"
				/>

				<SideBar
					activePath={pathName}
					className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
				/>
				<DashboardSideContainer
					investments={[
						{ name: "Bitcoin", price: "$47,000.00", date: "2025-12-16" },
						{ name: "Ethereum", price: "$3,800.00", date: "2025-12-12" },
					]}
					miscs={[
						{ name: "Forrest Shirt", price: "$31.00", date: "2025-12-10" },
						{
							name: "Noise-Cancelling Headphones",
							price: "$220.00",
							date: "2025-12-03",
						},
					]}
				/>
			</div>

			{/* Main Content */}
			<section className=" w-full flex flex-col items-center justify-center">
				{/* Place your main content here */}
				<div className="flex flex-col absolute top-5 px-2">
					<h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#1E1552] text-center z-10">
						DASHBOARD
					</h1>

					<p className="text-1xl sm:text-2xl md:text-3xl font-bold text-[#1E1552] max-w-[750px] text-center z-10">
						Welcome to MyFinance Dashboard. Congratulations, your colour is
						<span className="text-green-700"> green </span>
						so far this month.
					</p>
				</div>
			</section>
			<MobileMenuButton
				menuItems={[
					{ href: "/dashboard", label: "Dashboard" },
					{ href: "/incomes", label: "Incomes" },
					{ href: "/outcomes", label: "Outcomes" },
					{ href: "/investments", label: "Investments" },
					{ href: "/profile", label: "Profile" },
					{ href: "/logout", label: "Logout" },
				]}
			/>
		</main>
	);
}
