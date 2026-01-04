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
import SourcesList from "@/components/sourcesList";
export default function Investments() {
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
				<div className="w-full flex flex-row xs:flex-col relative gap-2 items-center">
					<RecentSideInfo
						header="Recent Profit"
						items={[
							{ name: "data1", amount: 2300, date: Date.now() },
							{ name: "data2", amount: 2300, date: Date.now() },
						]}
					/>
					<RecentSideInfo
						header="Recent Lose"
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
						INVESTMENTS
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
							header="Recent Profit"
							items={[
								{ name: "data1", amount: 2300, date: Date.now() },
								{ name: "data2", amount: 2300, date: Date.now() },
							]}
						/>
						<RecentSideInfo
							header="Recent Lose"
							items={[
								{ name: "data3", amount: 2300, date: Date.now() },
								{ name: "data4", amount: 2300, date: Date.now() },
							]}
						/>
					</div>
				</div>
				{/*Quick catch up, investment sources, quick summary */}
				<div className="flex flex-col xs:flex-row justify-center items-center gap-1 w-full">
					<div className="w-full flex flex-col md:flex-row gap-2">
						<CatchUpTheMonth
							header="Quick Catch Up For This Month"
							items={[
								{
									name: "You are on profit this month",
									data: "4 payments",
								},
								{
									name: "Total Invested this month",
									data: "500.00$",
								},
								{
									name: "Capital change this month",
									data: "500.00 $ / %75",
								},
								{
									name: "Total Profit: Crypto/Binance/Bitcoin",
									data: "750.00 $ / %86",
								},
								{
									name: "Total Profit: Crypto/Binance/Bitcoin",
									data: "750.00 $ / %86",
								},
							]}
						></CatchUpTheMonth>
						<SourcesList
							header="Open Positions"
							items={[
								{
									name: "Crypto: Binance/Bitcoin",
									data: [500, 55, 25],
								},
								{
									name: "Crypto: Binance/Bitcoin",
									data: [500, 55, 25],
								},
								{
									name: "Crypto: Binance/Bitcoin",
									data: [500, 55, 25],
								},
							]}
						></SourcesList>
					</div>
					<div className="w- full flex flex-col gap-2">
						<SourcesList
							header="Investment Sources"
							items={[
								{
									name: "Crypto",
									data: [500],
								},
								{
									name: "Forex",
									data: [500],
								},
							]}
						></SourcesList>
						<CatchUpTheMonth
							header="Quick Summary"
							items={[
								{
									name: "Percentage Growth this month",
									data: "+%75",
								},
								{
									name: "Profit this month",
									data: "500.00$",
								},
								{
									name: "Loses this month",
									data: "500.00$",
								},
								{
									name: "Capital",
									data: "500.00 $",
								},
							]}
						></CatchUpTheMonth>
					</div>
				</div>
				{/* chartpie summary */}
				<div className="flex flex-col  items-center w-full gap-1">
					<PieChart
						data={[
							{ name: "Crypto", amount: 1200 },
							{ name: "Forex", amount: 2500 },
						]}
					/>
					<PieChartData
						header="Pie Chart Data For Investment Sources"
						items={[
							{
								name: "	Crypto",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
							{
								name: "Forex",
								amount: 2300,
								date: Date.now(),
								description: "description",
							},
						]}
					/>
				</div>
				<div className="flex flex-col w-full">
					<SourcesDetailsContainer header="Investement sources"></SourcesDetailsContainer>
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
