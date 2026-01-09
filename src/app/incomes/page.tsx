'use client';
/* components import */
import SideBar from '@/components/SideBar';
import RecentSideInfo from '@/components/RecentSideInfo';
import MobileMenuButton from '@/components/MobileBurgerMenu';
import PieChartData from '@/components/PieChartData';
import PieChart from '@/components/PieChart';
import CatchUpTheMonth from '@/components/outcomes/catchUpTheMonth';
import SourcesDetailsContainer from '@/components/sourcesDetailsContainer/sourcesDetailsContainer';
import SourcesList from '@/components/SourcesList';
import { usePathname } from 'next/navigation';
import { demoDashboardData } from '@/data/dashboardDemoData';
import { demoIncomesData } from '@/data/incomesDemoData';
import { CATEGORY_COLORS, DEFAULT_CHART_COLORS } from '@/components/PieChart';
export default function Incomes() {
  const pathName = usePathname();
  const {
    recentInvestments,
    recentMisc,
    currentIncomes,
    currentOutcomes,
    pieChart,
    pieChartData,
    recentIncomes,
    recentOutcomes,
  } = demoDashboardData;
  const { catchUptheMonth, incomeSourceList } = demoIncomesData;
  const pieDataRaw = incomeSourceList;

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
        <div className="flex flex-row xs:flex-col relative gap-2 items-center">
          <RecentSideInfo header="Recent Earned" items={recentIncomes}></RecentSideInfo>
          <RecentSideInfo header="Upcoming Earning" items={recentIncomes}></RecentSideInfo>
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
        <div className=" w-full flex xs:hidden flex-col items-center gap-5">
          <SideBar
            activePath={pathName}
            className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
          />
          {/*recently investment and miscs */}
          <div className="flex flex-col w-full relative gap-1 items-center">
            <RecentSideInfo header="Recent Earned" items={recentIncomes}></RecentSideInfo>
            <RecentSideInfo header="Upcoming Earning" items={recentIncomes}></RecentSideInfo>
          </div>
        </div>
        {/*current Incomes and outcomes snapshots */}
        <div className="flex flex-row justify-center items-center gap-1 w-full">
          <CatchUpTheMonth
            header="Quick Monthly Catch Up"
            items={catchUptheMonth}
          ></CatchUpTheMonth>
          <SourcesList header="Income Sources" items={incomeSourceList}></SourcesList>
        </div>
        {/* chartpie summary */}
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
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer header="Income Sources"></SourcesDetailsContainer>
        </div>
        {/* recent outcomes */}
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
