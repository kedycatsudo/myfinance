"use client";
import SideBar from "@/components/sideBar";
import RecentSideInfo from "@/components/recentSideInfo";
import { usePathname } from "next/navigation";
import CatchUpTheMonth from "@/components/outcomes/catchUpTheMonth";
import MobileMenuButton from "@/components/mobileBurgerMenu";
export default function Profile() {
	const pathName = usePathname();

	return (
		<main className="flex flex-col xs:flex-row min-h-screen gap-1">
			<div className="hidden xs:flex flex-col items-center gap-5">
				<SideBar
					activePath={pathName}
					className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
				/>
				{/*recently investment and miscs */}
			</div>
			<section className="w-full flex flex-col flex-start items-center gap-5">
				<div className="flex flex-col">
					<h1 className="text-3xl xs:text-6xl font-bold text-[#1E1552] text-center z-10">
						PROFILE
					</h1>
				</div>
				<div className="flex xs:hidden flex-col items-center gap-5">
					<SideBar
						activePath={pathName}
						className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
					/>
					{/*recently investment and miscs */}
				</div>
				<CatchUpTheMonth
					header="Quick Catch Up For This Month"
					items={[
						{
							name: "User Name",
							data: "username",
						},
						{
							name: "email",
							data: "email",
						},
						{
							name: "monthly circle date",
							data: "-/05/-",
						},
						{
							name: "Password",
							data: "Password",
						},
					]}
				></CatchUpTheMonth>
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
