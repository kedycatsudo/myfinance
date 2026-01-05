"use client";
/* components import */
import SideBar from "@/components/sideBar";
import RecentSideInfo from "@/components/recentSideInfo";
import MobileMenuButton from "@/components/mobileBurgerMenu";
import FinancialSnapShot from "@/components/dashboard/inOutMiniSnaps";
import PieChartData from "@/components/pieChartData";
import PieChart from "@/components/pieChart";
/* frameworks import */
import { usePathname } from "next/navigation";

export default function Dashboard() {
	const pathName = usePathname();
	return (
		<main className="flex flex-col xs:flex-row min-h-screen gap-1">
			{/* Side containers */}
			<div className="hidden xs:flex flex-col items-center gap-5">
				<SideBar
					activePath={pathName}
					className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
				/>
				{/*recently investment and miscs */}
				<div className="flex flex-row xs:flex-col relative gap-2 items-center">
					<RecentSideInfo
						header="Recent investment"
						items={[
							{ name: "data", amount: 2300, date: Date.now() },
							{ name: "data", amount: 2300, date: Date.now() },
						]}
					/>
					<RecentSideInfo
						header="Recent Misceleneous"
						items={[
							{ name: "data", amount: 2300, date: Date.now() },
							{ name: "data", amount: 2300, date: Date.now() },
						]}
					/>
				</div>
			</div>

			{/* Main Content */}
			<section className="w-full flex flex-col flex-start items-center gap-5">
				{/* header and welcome message */}
				<div className="flex flex-col">
					<h1 className="text-3xl xs:text-6xl font-bold text-[#1E1552] text-center z-10">
						DASHBOARD
					</h1>
					<p className="text-x xs:text-xl font-bold text-[#1E1552] max-w-[750px] text-center z-10">
						Welcome to MyFinance Dashboard. Congratulations, your colour is
						<span className="text-green-700"> green </span>
						so far this month.
					</p>
				</div>
				<div className="flex xs:hidden flex-col items-center gap-5">
					<SideBar
						activePath={pathName}
						className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
					/>
					{/*recently investment and miscs */}
					<div className="flex flex-row xs:flex-col relative gap-1 items-center">
						<RecentSideInfo
							header="Recently Invested"
							items={[
								{ name: "data", amount: 2300, date: Date.now() },
								{ name: "data", amount: 2300, date: Date.now() },
							]}
						/>
						<RecentSideInfo
							header="Recent Misc"
							items={[
								{ name: "data", amount: 2300, date: Date.now() },
								{ name: "data", amount: 2300, date: Date.now() },
							]}
						/>
					</div>
				</div>

				{/*current Incomes and outcomes snapshots */}
				<div className="flex flex-row justify-center items-center gap-1 w-full">
					<FinancialSnapShot
						header="Current Outcomes"
						items={[
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "",
							},
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
						]}
					/>

					<FinancialSnapShot
						header="Current Incomes"
						items={[
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
						]}
					/>
				</div>
				{/* chartpie summary */}
				<div className="pl-1 flex flex-col xs:flex-row  items-center w-full gap-1">
					<PieChart
						data={[
							{ name: "Outcomes", amount: 1200 },
							{ name: "Incomes", amount: 2500 },
						]}
					/>
					<PieChartData
						header="Pie Chart Data"
						items={[
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
						]}
					/>
				</div>
				{/* recent outcomes */}
				<div className="pl-1 flex flex-col xs:flex-row items-center w-full gap-5">
					<FinancialSnapShot
						header="Recent Outcomes"
						items={[
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
						]}
					></FinancialSnapShot>
					<FinancialSnapShot
						header="Recent Incomes"
						items={[
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
							{
								name: "data",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
						]}
					></FinancialSnapShot>
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
