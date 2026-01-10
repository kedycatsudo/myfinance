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
import { CATEGORY_COLORS, DEFAULT_CHART_COLORS } from '@/components/PieChart';

import { useIncomesContext } from '@/context/IncomesContext';
import { useMemo } from 'react';

export default function Incomes() {
  const pathName = usePathname();
  const { incomes } = useIncomesContext();

  // All payments under all sources, flattened and sorted by date desc
  const allPayments = useMemo(
    () =>
      incomes
        .flatMap((src) =>
          src.payments.map((p) => ({
            ...p,
            sourceName: src.name,
          })),
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [incomes],
  );

  // Top N = 5 "Recent Earned", "Upcoming Earning"
  const recentEarned = allPayments
    .filter((p) => p.status === 'paid')
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      amount: p.amount,
      date: new Date(p.date).getTime(),
    }));

  const upcomingEarning = allPayments
    .filter((p) => p.status === 'coming')
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      amount: p.amount,
      date: new Date(p.date).getTime(),
    }));

  // Income Source List items (total per source)
  const incomeSourceList = incomes.map((src) => ({
    name: src.name,
    amount: src.payments.reduce((sum, p) => sum + p.amount, 0),
  }));

  // Catch up: catch the month, using core summary of payments
  const catchUptheMonth = [
    {
      name: 'Total Incoming',
      data: incomeSourceList.reduce((sum, src) => sum + src.amount, 0).toFixed(2) + '$',
    },
    {
      name: 'Got Paid Amount',
      data:
        allPayments
          .filter((p) => p.status === 'paid')
          .reduce((sum, p) => sum + p.amount, 0)
          .toFixed(2) + '$',
    },
    {
      name: 'Got Paid Earning',
      data: `${allPayments.filter((p) => p.status === 'paid').length} earnings`,
    },
    {
      name: 'Coming Earnings',
      data: `${allPayments.filter((p) => p.status === 'coming').length} earnings`,
    },
    {
      name: 'Income Sources',
      data: `${incomes.length} sources`,
    },
    {
      name: 'Reset Date',
      data: '-/01-',
    },
  ];

  // Pie Chart data (per source)
  const pieDataRaw = incomeSourceList;
  const pieDataWithColors = pieDataRaw.map((item, idx) => ({
    ...item,
    color: CATEGORY_COLORS[item.name] || DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length],
  }));

  // PieChartData (first N payments, can customize)
  const pieChartData = allPayments.slice(0, 8).map((p, idx) => ({
    name: p.name,
    amount: p.amount,
    date: new Date(p.date).getTime(),
    description: p.sourceName,
    color: CATEGORY_COLORS[p.sourceName] || DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length],
  }));

  return (
    <main className="flex flex-col xs:flex-row min-h-screen gap-1">
      {/* Side containers */}
      <div className="hidden xs:flex flex-col items-center gap-5">
        <SideBar
          activePath={pathName}
          className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
        />
        <div className="flex flex-row xs:flex-col relative gap-2 items-center">
          <RecentSideInfo header="Recent Earned" items={recentEarned} />
          <RecentSideInfo header="Upcoming Earning" items={upcomingEarning} />
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
        <div className="w-full flex xs:hidden flex-col items-center gap-5">
          <SideBar
            activePath={pathName}
            className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
          />
          <div className="flex flex-col w-full relative gap-1 items-center">
            <RecentSideInfo header="Recent Earned" items={recentEarned} />
            <RecentSideInfo header="Upcoming Earning" items={upcomingEarning} />
          </div>
        </div>
        {/*current Incomes snapshots */}
        <div className="flex flex-row justify-center items-center gap-1 w-full">
          <CatchUpTheMonth header="Quick Monthly Catch Up" items={catchUptheMonth} />
          <SourcesList header="Income Sources" items={incomeSourceList} />
        </div>
        {/* chartpie summary */}
        <div className="pl-1 flex flex-col md:flex-row items-center w-full gap-1">
          <PieChart data={pieDataWithColors} />
          <PieChartData header="Pie Chart Data" items={pieChartData} />
        </div>
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer header="Income Sources" />
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
