'use client';
import { useState } from 'react';
import SideBar from '@/components/SideBar';
import RecentSideInfo from '@/components/RecentSideInfo';
import MobileMenuButton from '@/components/MobileBurgerMenu';
import PieChartData from '@/components/PieChartData';
import PieChart, { CATEGORY_COLORS, DEFAULT_CHART_COLORS } from '@/components/PieChart';
import CatchUpTheMonth from '@/components/outcomes/catchUpTheMonth';
import SourcesDetailsContainer from '@/components/sourcesDetailsContainer/sourcesDetailsContainer';
import SourcesList from '@/components/SourcesList';
import { usePathname } from 'next/navigation';
import { useIncomesContext } from '@/context/FinanceGenericContext';
import { FinanceSource } from '@/types/finance';
import { InvestmentSource } from '@/types/investments';

import {
  TotalIncomes,
  PaidIncomePayments,
  TotalIncomesPaidAmount,
  RecentEarned,
  IncomesUpcoming,
  UpcomingIncomeAmount,
  UpcomingEarning,
  IncomeSourceList,
} from '@/utils/functions/dataCalculations/incomesDataCalculations';
import EditSourceModal from '@/components/modals/EditSourceModal';
import SourceContainer from '@/components/sourcesDetailsContainer/sourceContainer';
export default function Incomes() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSource, setEditSource] = useState<FinanceSource | null>(null);
  const pathName = usePathname();
  const { data: incomes, updateSource, loading, error } = useIncomesContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!incomes || incomes.length === 0) {
    return <div>No incomes found</div>;
  }

  const totalIncomes = TotalIncomes({ data: incomes });
  const paidIncomePayments = PaidIncomePayments({ data: incomes });
  const totalIncomesPaidAmount = TotalIncomesPaidAmount({ data: incomes });
  const recentEarned = RecentEarned({ data: incomes });
  const incomesUpcoming = IncomesUpcoming({ data: incomes });
  const upcomingIncomeAmount = UpcomingIncomeAmount({ data: incomes });
  const upcomingEarning = UpcomingEarning({ data: incomes });
  const incomesSourceList = IncomeSourceList({ data: incomes });
  // Catch up: catch the month, using core summary of payments

  const catchUptheMonth = [
    {
      name: 'Total Income',
      data: totalIncomes,
      unit: '$',
    },
    {
      name: 'Payments Received',
      data: Array.isArray(paidIncomePayments)
        ? paidIncomePayments.length
        : Object.values(paidIncomePayments).length,
    },
    {
      name: 'Amount Received',
      data: totalIncomesPaidAmount,
      unit: '$',
    },

    {
      name: 'Upcoming Payments',
      data: Array.isArray(incomesUpcoming)
        ? incomesUpcoming.length
        : Object.values(incomesUpcoming).length,
    },
    {
      name: 'Upcoming Amount',
      data: upcomingIncomeAmount,
      unit: '$',
    },
    {
      name: 'Monthly Reset Date',
      data: '-/01-',
    },
  ];

  // ----- Consistent Color Picking: Assign colors in parent -----
  const pieDataRaw = incomes.map((src) => ({
    name: src.sourceName,
    amount: src.payments.reduce((sum, p) => sum + p.amount, 0),
    description: src.description,
  }));
  const pieDataWithColors = pieDataRaw.map((item, idx) => ({
    ...item,
    color: CATEGORY_COLORS[item.name] || DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length],
  }));

  // Pie chart data legend
  const pieChartData = pieDataWithColors.map((d) => ({
    sourceName: d.name,
    amount: d.amount,
    date: Date.now(),
    description: d.description,
    color: d.color,
  }));

  return (
    <main className="flex flex-col xs:flex-row min-h-screen gap-1">
      {/* Side containers */}
      <div className="hidden xs:flex flex-col items-center gap-5 flex-shrink-0 xs:w-64">
        <SideBar
          activePath={pathName}
          className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
        />
        <div className="flex flex-row xs:flex-col relative gap-2 items-center">
          <RecentSideInfo header="Recent Received" items={recentEarned} />
          <RecentSideInfo header="Upcoming Payment" items={upcomingEarning} />
        </div>
      </div>
      {/* Main Content */}
      <section className="w-full flex flex-col flex-start items-center gap-5">
        <div className="flex flex-col">
          <h1 className="text-3xl xs:text-6xl font-bold text-[#1E1552] text-center z-10">
            INCOMES
          </h1>
        </div>
        <div className=" flex xs:hidden flex-col items-center gap-5">
          <SideBar
            activePath={pathName}
            className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
          />
          <div className="flex flex-col w-full relative gap-1 items-center">
            <RecentSideInfo header="Recent Recieved" items={recentEarned} />
            <RecentSideInfo header="Upcoming Payment" items={upcomingEarning} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-1 w-full">
          <CatchUpTheMonth header="Month-to-Date Overview" items={catchUptheMonth} />
          <SourcesList header="Income Sources" items={incomesSourceList} />
        </div>
        {/* Core fix: Pass pieDataWithColors to BOTH components */}
        <div className="pl-1 flex flex-col md:flex-row  items-center w-full gap-1">
          <PieChart data={pieDataWithColors} />
          <PieChartData header="Pie Chart Data" items={pieChartData} />
        </div>
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer
            header="Income Sources"
            items={incomes}
            renderSource={(item, open, onClick, onEdit) => (
              <SourceContainer
                key={item.id}
                item={item}
                open={open}
                onClick={onClick}
                onEdit={() => {
                  setEditSource(item);
                  setEditModalOpen(true);
                }}
              />
            )}
          />

          {editSource && (
            <EditSourceModal
              open={editModalOpen}
              source={editSource}
              onClose={() => setEditModalOpen(false)}
              onSubmit={(updatedSource) => {
                // Only update if it's a FinanceSource (has 'payments' property)
                if ('payments' in updatedSource) {
                  updateSource(updatedSource);
                }
                setEditModalOpen(false); // Modal closes right after update
              }}
            />
          )}
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
