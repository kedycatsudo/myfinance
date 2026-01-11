'use client';

import SideBar from '@/components/SideBar';
import RecentSideInfo from '@/components/RecentSideInfo';
import MobileMenuButton from '@/components/MobileBurgerMenu';
import SourcesList from '@/components/SourcesList';
import PieChartData from '@/components/PieChartData';
import PieChart, { CATEGORY_COLORS, DEFAULT_CHART_COLORS } from '@/components/PieChart';
import CatchUpTheMonth from '@/components/outcomes/catchUpTheMonth';
import SourcesDetailsContainer from '@/components/sourcesDetailsContainer/sourcesDetailsContainer';
import { useOutcomesContext } from '@/context/FinanceGenericContext';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export default function Outcomes() {
  const pathName = usePathname();
  const { data: outcomes } = useOutcomesContext();

  // Flat list of latest payments across all sources, sorted newest first
  const allPayments = useMemo(
    () =>
      outcomes
        .flatMap((src) =>
          src.payments.map((p) => ({
            ...p,
            sourceName: src.name,
          })),
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [outcomes],
  );

  // Top N=5 recent paid, upcoming payments etc
  const recentPaid = allPayments
    .filter((p) => p.status === 'paid')
    .slice(0, 5)
    .map((p) => ({ name: p.name, amount: p.amount, date: new Date(p.date).getTime() }));

  const recentUpcoming = allPayments
    .filter((p) => p.status === 'coming')
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      amount: p.amount,
      date: new Date(p.date).getTime(),
    }));

  // For SourcesList: aggregate total amount per source
  const sourcesListItems = outcomes.map((src) => ({
    name: src.name,
    amount: src.payments.reduce((sum, p) => sum + p.amount, 0),
  }));

  // Setup pie data and their color (ALWAYS match color for both PieChart & PieChartData)
  const pieDataWithColors = sourcesListItems.map((src, idx) => ({
    ...src,
    color: CATEGORY_COLORS[src.name] || DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length],
  }));

  // PieChartData: same pie slice list to ensure 1-to-1 color match
  const pieChartPaymentData = pieDataWithColors.map((src) => ({
    name: src.name,
    amount: src.amount,
    color: src.color,
    description: src.name,
  }));

  // Snapshot stats
  const catchUpItems = [
    {
      name: 'Payments in the loop',
      data: `${allPayments.filter((p) => p.loop).length} payments`,
    },
    {
      name: 'Total Outgoing',
      data:
        allPayments
          .filter((p) => p.status !== 'coming')
          .reduce((sum, p) => sum + p.amount, 0)
          .toFixed(2) + ' $',
    },
    {
      name: 'Paid Outgoing amount',
      data:
        allPayments
          .filter((p) => p.status === 'paid')
          .reduce((sum, p) => sum + p.amount, 0)
          .toFixed(2) + ' $',
    },
    {
      name: 'Paid Payments',
      data: `${allPayments.filter((p) => p.status === 'paid').length} payments`,
    },
    {
      name: 'Coming Payments',
      data: `${allPayments.filter((p) => p.status === 'coming').length} payments`,
    },
    {
      name: 'Outcome Sources',
      data: `${outcomes.length} sources`,
    },
    {
      name: 'Reset Date',
      data: '-/01-',
    },
  ];

  return (
    <main className="flex flex-col xs:flex-row min-h-screen gap-1">
      {/* Side containers */}
      <div className="hidden xs:flex flex-col items-center gap-5">
        <SideBar
          activePath={pathName}
          className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
        />
        <div className="flex flex-row xs:flex-col relative gap-2 items-center">
          <RecentSideInfo header="Recent Paid" items={recentPaid} />
          <RecentSideInfo header="Upcoming payment" items={recentUpcoming} />
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full flex flex-col flex-start items-center gap-5">
        <div className="flex flex-col">
          <h1 className="text-3xl xs:text-6xl font-bold text-[#1E1552] text-center z-10">
            OUTCOMES
          </h1>
        </div>
        <div className="w-full flex xs:hidden flex-col items-center gap-5">
          <SideBar
            activePath={pathName}
            className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
          />
          <div className="w-full flex flex-col relative gap-1 items-center">
            <RecentSideInfo header="Recent Paid" items={recentPaid} />
            <RecentSideInfo header="Upcoming payment" items={recentUpcoming} />
          </div>
        </div>
        {/*current Outgoings snapshots */}
        <div className="flex flex-row justify-center items-center gap-1 w-full">
          <CatchUpTheMonth header="Quick Catch Up For This Month" items={catchUpItems} />
          <SourcesList header="Outcome Sources" items={sourcesListItems} />
        </div>
        <div className="pl-1 flex flex-col md:flex-row items-center w-full gap-1">
          {/*------ COLOR SYNC IS HERE --------*/}
          <PieChart data={pieDataWithColors} />
          <PieChartData header="Pie Chart Data For Outcome Sources" items={pieChartPaymentData} />
        </div>
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer header="Outcome Sources" />
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
