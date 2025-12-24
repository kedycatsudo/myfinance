"use client";
import SideBar from "@/components/sideBar";
import DashboardSideContainer from "@/components/dashboardSideContainer";
import Link from "next/link";
import MobileMenuButton from "@/components/mobileBurgerMenu";
import { usePathname } from "next/navigation";
export default function Dashboard() {
	const pathName = usePathname();
	return (
		<main className="min-h-screen  bg-[#A9AECE] flex flex-row justify-center relative">
			<SideBar
				activePath={pathName}
				className="hidden [@media(min-width:450px)]:flex w-1/6 ..."
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

			{/* Main Content */}
			<section className="w-5/6 flex flex-col items-center justify-center  relative">
				{/* Place your main content here */}
				<h1 className="absolute top-0 left-0 w-full text-3xl sm:text-5xl md:text-7xl font-bold text-[#1E1552] text-center z-10">
					DASHBOARD
				</h1>

				<p className="text-1xl sm:text-2xl md:text-3xl font-bold text-[#1E1552] absolute top-20 mr-30  max-w-[750px] text-center z-10">
					Welcome to MyFinance Dashboard. Congratulations, your colour is
					<span className="text-green-700"> green </span>
					so far this month.
				</p>
			</section>
			<MobileMenuButton
				menuContent={
					<nav className="flex flex-col gap-6 text-center">
						<Link
							href="/dashboard"
							className="text-white font-bold text-xl hover:text-blue-200"
						>
							Dashboard
						</Link>
						<Link
							href="/incomes"
							className="text-white font-bold text-xl hover:text-blue-200"
						>
							Incomes
						</Link>
						<Link
							href="/outcomes"
							className="text-white font-bold text-xl hover:text-blue-200"
						>
							Outcomes
						</Link>
						<Link
							href="/investments"
							className="text-white font-bold text-xl hover:text-blue-200"
						>
							Investments
						</Link>
						<Link
							href="/profile"
							className="text-white font-bold text-xl hover:text-blue-200"
						>
							Profile
						</Link>
						<Link
							href="/logout"
							className="text-white font-bold text-xl hover:text-blue-200"
						>
							Logout
						</Link>
					</nav>
				}
			/>
		</main>
	);
}
