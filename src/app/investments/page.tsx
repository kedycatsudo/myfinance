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
import {
  RecentProfits,
  RecentLoss,
  ProfitsThisMonth,
  LosesThisMonth,
  OpenPositions,
  ClosedPositions,
  InvestmentSourcesList,
  ProfitThisMonthAmount,
  LosesThisMonthAmount,
  OpenPositionsAmount,
  ClosedPositionsAmount,
} from '@/utils/functions/dataCalculations/investmentDataCalculations';
import SourceContainer from '@/components/sourcesDetailsContainer/sourceContainer';
export default function Investments() {
  const pathName = usePathname();
  const { data: investments, loading, error } = useInvestmentsContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!investments || investments.length === 0) {
    return <div>No incomes found</div>;
  }
  const recentProfit = RecentProfits({ data: investments });
  const profitThisMonth = ProfitsThisMonth({ data: investments });
  const profitThisMonthAmount = ProfitThisMonthAmount({ data: investments });

  const recentLoss = RecentLoss({ data: investments });
  const openPositions = OpenPositions({ data: investments });
  const openPositionsAmount = OpenPositionsAmount({ data: investments });
  const losesThisMonth = LosesThisMonth({ data: investments });
  const losesThisMonthAmount = LosesThisMonthAmount({ data: investments });
  const closedPositions = ClosedPositions({ data: investments });
  const closedPositionsAmount = ClosedPositionsAmount({ data: investments });
  const sourceList = InvestmentSourcesList({ data: investments });
  const quickCatchUp = [
    {
      name: 'Profits this month',
      data: profitThisMonth.length,
    },
    { name: 'Profit amount this month', data: profitThisMonthAmount, unit: '$' },
    {
      name: 'Loses this month',
      data: losesThisMonth.length,
    },
    { name: 'Loses amount this month', data: losesThisMonthAmount, unit: '$' },
    {
      name: 'Open Positions',
      data: openPositions.length,
    },
    { name: 'Open positions amount', data: openPositionsAmount, unit: '$' },
    {
      name: 'Closed Positions',
      data: closedPositions.length,
    },
    { name: 'Closed positions amount this month', data: closedPositionsAmount, unit: '$' },
  ];

  // ----- Consistent Color Picking: Assign colors in parent -----
  const pieDataRaw = investments.map((src) => ({
    name: src.sourceName,
    amount: src.items.reduce((sum, p) => sum + p.investedAmount, 0),
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
            <SourcesList header="Open Positions and Sizes" items={openPositions} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <SourcesList header="Investment Sources" items={sourceList} />
            <CatchUpTheMonth header="Quick Summary" items={quickCatchUp} />
          </div>
        </div>
        {/* chartpie summary */}
        <div className="pl-1 flex flex-col md:flex-row items-center w-full gap-1">
          <PieChart data={pieDataWithColors} />
          <PieChartData header="Pie Chart Data Investment Sources" items={pieChartData} />
        </div>
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer
            header="Income Sources"
            items={investments}
            renderSource={(item, open, onClick) => (
              <SourceContainer key={item.id} item={item} open={open} onClick={onClick} />
            )}
          />
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
