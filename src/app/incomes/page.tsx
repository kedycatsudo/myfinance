"use client";
/* components import */
import SideBar from "@/components/sideBar";
import RecentSideInfo from "@/components/recentSideInfo";
import MobileMenuButton from "@/components/mobileBurgerMenu";
import PieChartData from "@/components/pieChartData";
import PieChart from "@/components/pieChart";
import CatchUpTheMonth from "@/components/outcomes/catchUpTheMonth";
import SourcesDetailsContainer from "@/components/sourcesDetailsContainer/sourcesDetailsContainer";
/* frameworks import */
import { usePathname } from "next/navigation";

export default function Incomes() {
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
						header="Recent Earned"
						items={[
							{ name: "data1", amount: 2300, date: Date.now() },
							{ name: "data2", amount: 2300, date: Date.now() },
						]}
					/>
					<RecentSideInfo
						header="Upcoming Earning"
						items={[
							{ name: "data3", amount: 2300, date: Date.now() },
							{ name: "data4", amount: 2300, date: Date.now() },
						]}
					/>
				</div>
			</div>

			{/* Main Content */}
			<section className="w-full flex flex-col flex-start items-center gap-5">
				{/* header and welcome message */}
				<div className="flex flex-col">
					<h1 className="text-3xl xs:text-6xl font-bold text-[#1E1552] text-center z-10">
						INCOMES
					</h1>
				</div>
				<div className="flex xs:hidden flex-col items-center gap-5">
					<SideBar
						activePath={pathName}
						className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
					/>
					{/*recently investment and miscs */}
					<div className="flex flex-row xs:flex-col relative gap-1 items-center">
						<RecentSideInfo
							header="Recent Earned"
							items={[
								{ name: "data1", amount: 2300, date: Date.now() },
								{ name: "data2", amount: 2300, date: Date.now() },
							]}
						/>
						<RecentSideInfo
							header="Upcoming Earning"
							items={[
								{ name: "data3", amount: 2300, date: Date.now() },
								{ name: "data4", amount: 2300, date: Date.now() },
							]}
						/>
					</div>
				</div>
				{/*current Incomes and outcomes snapshots */}
				<div className="flex flex-row justify-center items-center gap-1 w-full">
					<CatchUpTheMonth
						header="Quick Catch Up For This Month"
						items={[
							{
								name: "Earnings in the loop",
								data: "4 Earnings",
							},
							{
								name: "Total Incoming",
								data: "500.00$",
							},
							{
								name: "Got Paid Amount",
								data: "500.00 $",
							},
							{
								name: "Got Paid Earning",
								data: "3 earnings",
							},
							{
								name: "Coming Earnings",
								data: "3 earnings",
							},
							{
								name: "Income Sources",
								data: "4 sources",
							},
							{
								name: "Reset Date",
								data: "-/01-",
							},
						]}
					></CatchUpTheMonth>
					<CatchUpTheMonth
						header="Income Sources"
						items={[
							{
								name: "Salary",
								data: "2300",
							},
							{
								name: "Upwork",
								data: "500.00$",
							},
							{
								name: "Investment",
								data: "500.00 $",
							},
						]}
					></CatchUpTheMonth>
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
						header="Pie Chart Data For Income Sources"
						items={[
							{
								name: "data1",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
							{
								name: "data2",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
						]}
					/>
				</div>
				<div className="flex flex-col w-full">
					<SourcesDetailsContainer header="Income Sources"></SourcesDetailsContainer>
				</div>
				{/* recent outcomes */}
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
