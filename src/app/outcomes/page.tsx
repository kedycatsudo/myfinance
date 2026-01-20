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
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FinanceSource } from '@/types/finance';
import { InvestmentSource } from '@/types/investments';
import EditSourceModal from '@/components/modals/EditSourceModal';

import {
  RecentPaid,
  UpcomingPayment,
  TotalOutcomes,
  PaidOutcomePayments,
  UpcomingPayments,
  UpcomingAmount,
  OutcomeSourcesList,
} from '@/utils/functions/dataCalculations/outcomeDataCalculations';
import { TotalIncomesPaidAmount } from '@/utils/functions/dataCalculations/incomesDataCalculations';
import SourceContainer from '@/components/sourcesDetailsContainer/sourceContainer';
export default function Outcomes() {
  const pathName = usePathname();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSource, setEditSource] = useState<FinanceSource | InvestmentSource | null>(null);
  const { data: outcomes, loading, error } = useOutcomesContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!outcomes || outcomes.length === 0) {
    return <div>No incomes found</div>;
  }

  // Top N=5 recent paid, upcoming payments etc
  const recentPaid = RecentPaid({ data: outcomes });

  const upcomingPayments = UpcomingPayment({ data: outcomes });
  const totalOutcomes = TotalOutcomes({ data: outcomes });
  const paidOutcomePayments = PaidOutcomePayments({ data: outcomes });
  const totalOutcomesPaidAmount = TotalIncomesPaidAmount({ data: outcomes });
  const upcomginPayments = UpcomingPayments({ data: outcomes });
  const upcomingAmount = UpcomingAmount({ data: outcomes });
  // For SourcesList: aggregate total amount per source
  const outcomeSourceList = OutcomeSourcesList({ data: outcomes });
  console.log(outcomeSourceList);
  // ----- Consistent Color Picking: Assign colors in parent -----
  const pieDataRaw = outcomes.map((src) => ({
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

  // Snapshot stats
  const catchUptheMonth = [
    {
      name: 'Total Outcomes',
      data: totalOutcomes,
      unit: '$',
    },
    {
      name: 'Got Paid Payments',
      data: paidOutcomePayments.length,
    },
    {
      name: 'Got Paid Amount',
      data: totalOutcomesPaidAmount,
      unit: '$',
    },

    {
      name: 'UpComing Payments',
      data: upcomginPayments.length,
    },
    {
      name: 'Upcoming Amount',
      data: upcomingAmount,
      unit: '$',
    },
    {
      name: 'Reset Date',
      data: '-/01-',
    },
  ];
  return (
    <main className="flex flex-col xs:flex-row min-h-screen gap-1">
      {/* Side containers */}
      <div className="hidden xs:flex flex-col items-center gap-5 flex-shrink-0 xs:w-64">
        <SideBar
          activePath={pathName}
          className="hidden [@media(min-width:450px)]:flex rounded-lg ..."
        />
        <div className="w-full flex flex-row xs:flex-col relative gap-2 items-center">
          <RecentSideInfo header="Recent Paid" items={recentPaid} />
          <RecentSideInfo header="Upcoming payment" items={upcomingPayments} />
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full flex flex-col flex-start items-center gap-5 ">
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
            <RecentSideInfo header="Upcoming payment" items={upcomingPayments} />
          </div>
        </div>
        {/*current Outgoings snapshots */}
        <div className="flex flex-row justify-center items-center gap-1 w-full">
          <CatchUpTheMonth header="Quick Catch Up For This Month" items={catchUptheMonth} />
          <SourcesList header="Outcome Sources" items={outcomeSourceList} />
        </div>
        <div className="pl-1 flex flex-col md:flex-row items-center w-full gap-1">
          {/*------ COLOR SYNC IS HERE --------*/}
          <PieChart data={pieDataWithColors} />
          <PieChartData header="Pie Chart Data" items={pieChartData} />
        </div>
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer
            header="Outcome Sources"
            items={outcomes}
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
                // call your context updateSource here!
                // e.g., updateSource(updatedSource)
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
