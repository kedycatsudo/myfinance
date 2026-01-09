'use client';
/* components import */
import SideBar from '@/components/SideBar';
import RecentSideInfo from '@/components/RecentSideInfo';
import MobileMenuButton from '@/components/MobileBurgerMenu';
import FinancialSnapShot from '@/components/dashboard/inOutMiniSnaps';
import PieChartData from '@/components/PieChartData';
import PieChart from '@/components/PieChart';
import { usePathname } from 'next/navigation';
import { demoDashboardData } from '@/data/dashboardDemoData';
import { CATEGORY_COLORS, DEFAULT_CHART_COLORS } from '@/utils/chartColors';
export default function Dashboard() {
  const pathName = usePathname();
  const {
    recentInvestments,
    recentMisc,
    currentOutcomes,
    currentIncomes,
    pieChart,
    pieChartData,
    recentOutcomes,
    recentIncomes,
  } = demoDashboardData;
  const pieDataRaw = [
    { name: 'Outcomes', amount: 2000 },
    { name: 'Incomes', amount: 4000 },
  ];

  const pieDataWithColors = pieDataRaw.map((item, idx) => ({
    ...item,
    color: CATEGORY_COLORS[item.name] || DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length],
  }));
  return (
    <main className="flex flex-col xs:flex-row min-h-screen gap-1">
      {/* Side containers */}
      <div className="hidden xs:flex flex-col items-center gap-5">
        <SideBar
          activePath={pathName}
          className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
        />
        {/*recently investment and miscs */}
        <div className=" w-full flex flex-col relative gap-2 items-center">
          <RecentSideInfo header="Recent invested" items={recentInvestments} />
          <RecentSideInfo header="Recent Misceleneous" items={recentMisc} />
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full flex flex-col flex-start items-center gap-5">
        {/* header and welcome message */}
        <div className="flex flex-col md:flex-row">
          <h1 className="text-3xl xs:text-6xl font-bold text-[#1E1552] text-center z-10">
            DASHBOARD
          </h1>
          <p className="text-x xs:text-xl font-bold text-[#1E1552] max-w-[750px] text-center z-10">
            Welcome to MyFinance Dashboard. Congratulations, your colour is
            <span className="text-green-700"> green </span>
            so far this month.
          </p>
        </div>
        <div className="w-full flex xs:hidden flex-col items-center gap-5">
          <SideBar
            activePath={pathName}
            className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
          />
          <div className="w-full flex flex-col relative gap-1 items-center">
            <RecentSideInfo header="Recently Invested" items={recentInvestments} />
            <RecentSideInfo header="Recent Miscelenous" items={recentMisc} />
          </div>
        </div>

        <div className="flex flex-col  justify-center items-center gap-1 w-full">
          <FinancialSnapShot header="Current Outcomes" items={currentOutcomes} />
          <FinancialSnapShot header="Current Incomes" items={currentIncomes} />
        </div>
        <div className="pl-1 flex flex-col md:flex-row  items-center w-full gap-1">
          <PieChart data={pieDataWithColors} />
          <PieChartData
            header="Pie Chart Data"
            items={pieDataWithColors.map((d, idx) => ({
              name: d.name,
              amount: d.amount,
              date: Date.now(),
              description: 'description',
              color: d.color,
            }))}
          />
        </div>
        <div className="pl-1 flex flex-col l:flex-row items-center w-full gap-5">
          <FinancialSnapShot header="Recent Outcomes" items={recentOutcomes} />
          <FinancialSnapShot header="Recent Incomes" items={recentIncomes} />
        </div>
      </section>

      <MobileMenuButton
        menuItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/incomes', label: 'Incomes' },
          { href: '/outcomes', label: 'Outcomes' },
          { href: '/investments', label: 'Investments' },
          { href: '/profile', label: 'Profile' },
          { href: '/logout', label: 'Logout' },
        ]}
      />
    </main>
  );
}
