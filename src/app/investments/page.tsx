'use client';
/* components import */
import SideBar from '@/components/SideBar';
import RecentSideInfo from '@/components/RecentSideInfo';
import MobileMenuButton from '@/components/MobileBurgerMenu';
import PieChartData from '@/components/PieChartData';
import PieChart, { CATEGORY_COLORS, DEFAULT_CHART_COLORS } from '@/components/PieChart';
import CatchUpTheMonth from '@/components/outcomes/catchUpTheMonth';
import SourcesDetailsContainer from '@/components/sourcesDetailsContainer/sourcesDetailsContainer';
import SourcesList from '@/components/SourcesList';
import { usePathname } from 'next/navigation';
import { useInvestmentsContext } from '@/context/FinanceGenericContext';
import { useMemo } from 'react';

export default function Investments() {
  const pathName = usePathname();
  const { data: investments } = useInvestmentsContext();

  // Flatten all investment items for quick access
  const allInvestmentItems = useMemo(
    () =>
      investments
        .flatMap((src) =>
          src.items.map((item) => ({
            ...item,
            sourceName: src.name,
            sourceType: src.type,
          })),
        )
        .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()),
    [investments],
  );

  // Recent Profits (closed with profit > 0)
  const recentProfit = allInvestmentItems
    .filter((item) => item.status === 'closed' && item.result === 'profit')
    .slice(0, 5)
    .map((item) => ({
      name: `${item.sourceName}: ${item.assetName}`,
      amount: item.resultAmount ?? 0,
      date: new Date(item.exitDate ?? item.entryDate).getTime(),
    }));

  // Recent Losses (closed with loss < 0)
  const recentLoss = allInvestmentItems
    .filter((item) => item.status === 'closed' && item.result === 'loss')
    .slice(0, 5)
    .map((item) => ({
      name: `${item.sourceName}: ${item.assetName}`,
      amount: item.resultAmount ?? 0,
      date: new Date(item.exitDate ?? item.entryDate).getTime(),
    }));

  // Open positions (grouped by type/source)
  const openPositions = allInvestmentItems
    .filter((item) => item.status === 'open')
    .map((item) => ({
      name: `${item.sourceType.charAt(0).toUpperCase() + item.sourceType.slice(1)}: ${
        item.sourceName
      }/${item.assetName}`,
      data: [item.investedAmount],
    }));

  // Investment sources totals
  const investmentSourceTotals = investments.map((src) => ({
    name: src.name,
    data: [src.items.reduce((sum, item) => sum + item.investedAmount, 0)],
  }));

  // Quick catch up and summary values
  const investmentProfitThisMonth = allInvestmentItems
    .filter(
      (item) =>
        item.result === 'profit' &&
        item.exitDate &&
        new Date(item.exitDate).getMonth() === new Date().getMonth() &&
        new Date(item.exitDate).getFullYear() === new Date().getFullYear(),
    )
    .reduce((sum, item) => sum + (item.resultAmount ?? 0), 0);

  const investmentLossThisMonth = allInvestmentItems
    .filter(
      (item) =>
        item.result === 'loss' &&
        item.exitDate &&
        new Date(item.exitDate).getMonth() === new Date().getMonth() &&
        new Date(item.exitDate).getFullYear() === new Date().getFullYear(),
    )
    .reduce((sum, item) => sum + (item.resultAmount ?? 0), 0);

  const quickCatchUp = [
    {
      name: 'Profit this month',
      data: investmentProfitThisMonth.toFixed(2) + ' $',
    },
    {
      name: 'Loses this month',
      data: investmentLossThisMonth.toFixed(2) + ' $',
    },
    {
      name: 'Open Positions',
      data: `${openPositions.length} items`,
    },
    {
      name: 'Closed Positions',
      data: `${allInvestmentItems.filter((item) => item.status === 'closed').length} items`,
    },
  ];

  // Pie chart data: sum by type (crypto, forex, etc.) and assign color in parent!
  const pieDataWithColors = Object.entries(
    allInvestmentItems.reduce<Record<string, number>>((acc, item) => {
      acc[item.sourceType] = (acc[item.sourceType] || 0) + item.investedAmount;
      return acc;
    }, {}),
  ).map(([name, amount], idx) => ({
    name,
    amount,
    color: CATEGORY_COLORS[name] || DEFAULT_CHART_COLORS[idx % DEFAULT_CHART_COLORS.length],
  }));

  // PieChartData: match color for legend/list!
  const pieChartData = pieDataWithColors.map((item) => ({
    name: item.name,
    amount: item.amount,
    color: item.color,
    description: item.name,
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
        <div className="w-full flex flex-row xs:flex-col relative gap-2 items-center">
          <RecentSideInfo header="Recent Profit" items={recentProfit} />
          <RecentSideInfo header="Recent Lose" items={recentLoss} />
        </div>
      </div>
      {/* Main Content */}
      <section className="w-full flex flex-col flex-start items-center gap-5">
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
          <div className="flex flex-row xs:flex-col relative gap-1 items-center">
            <RecentSideInfo header="Recent Profit" items={recentProfit} />
            <RecentSideInfo header="Recent Lose" items={recentLoss} />
          </div>
        </div>
        {/*Quick catch up, investment sources, quick summary */}
        <div className="flex flex-col xs:flex-row justify-center items-center gap-1 w-full">
          <div className="w-full flex flex-col md:flex-row gap-2">
            <CatchUpTheMonth header="Quick Catch Up For This Month" items={quickCatchUp} />
            <SourcesList header="Open Positions" items={openPositions} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <SourcesList header="Investment Sources" items={investmentSourceTotals} />
            <CatchUpTheMonth header="Quick Summary" items={quickCatchUp} />
          </div>
        </div>
        {/* chartpie summary */}
        <div className="pl-1 flex flex-col md:flex-row items-center w-full gap-1">
          <PieChart data={pieDataWithColors} />
          <PieChartData header="Pie Chart Data" items={pieChartData} />
        </div>
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer header="Investment sources" />
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
