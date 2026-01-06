'use client';
/* components import */
import SideBar from '@/components/SideBar';
import RecentSideInfo from '@/components/RecentSideInfo';
import MobileMenuButton from '@/components/MobileBurgerMenu';
import SourcesList from '@/components/SourcesList';
import PieChartData from '@/components/PieChartData';
import PieChart from '@/components/PieChart';
import CatchUpTheMonth from '@/components/outcomes/catchUpTheMonth';
import SourcesDetailsContainer from '@/components/sourcesDetailsContainer/sourcesDetailsContainer';
/* frameworks import */
import { usePathname } from 'next/navigation';

export default function Outcomes() {
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
        <div className="flex flex-row xs:flex-col relative gap-2 items-center">
          <RecentSideInfo
            header="Recent Paid"
            items={[
              { name: 'data1', amount: 2300, date: Date.now() },
              { name: 'data2', amount: 2300, date: Date.now() },
            ]}
          />
          <RecentSideInfo
            header="Upcoming payment"
            items={[
              { name: 'data3', amount: 2300, date: Date.now() },
              { name: 'data4', amount: 2300, date: Date.now() },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full flex flex-col flex-start items-center gap-5">
        {/* header and welcome message */}
        <div className="flex flex-col">
          <h1 className="text-3xl xs:text-6xl font-bold text-[#1E1552] text-center z-10">
            OUTCOMES
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
              header="Recent Paid"
              items={[
                { name: 'data1', amount: 2300, date: Date.now() },
                { name: 'data2', amount: 2300, date: Date.now() },
              ]}
            />
            <RecentSideInfo
              header="Upcoming payment"
              items={[
                { name: 'data3', amount: 2300, date: Date.now() },
                { name: 'data4', amount: 2300, date: Date.now() },
              ]}
            />
          </div>
        </div>
        {/*current Incomes and outcomes snapshots */}
        <div className="flex flex-row justify-center items-center gap-1 w-full">
          <CatchUpTheMonth
            header="Quick Catch Up For This Month"
            items={[
              {
                name: 'Payments in the loop',
                data: '4 payments',
              },
              {
                name: 'Total Outgoing',
                data: '500.00$',
              },
              {
                name: 'Paid Outgoing amount',
                data: '500.00 $',
              },
              {
                name: 'Paid Payments',
                data: '3 payments',
              },
              {
                name: 'Coming Payments',
                data: '3 payments',
              },
              {
                name: 'Misc',
                data: '600',
              },
              {
                name: 'Outcome Sources',
                data: '4 sources',
              },
              {
                name: 'Reset Date',
                data: '-/01-',
              },
            ]}
          ></CatchUpTheMonth>
          <SourcesList
            header="Outcome Sources"
            items={[
              {
                name: 'Mortgage',
                data: [2300],
              },
              {
                name: 'Grocery',
                data: [2300],
              },
              {
                name: 'Utilities',
                data: [2300],
              },
              {
                name: 'gas',
                data: [2300],
              },
              {
                name: 'debt',
                data: [2300],
              },
              {
                name: 'subscription',
                data: [2300],
              },
              {
                name: 'investment',
                data: [2300],
              },
              {
                name: 'Reset Date',
                data: [2300],
              },
            ]}
          ></SourcesList>
        </div>
        {/* chartpie summary */}
        <div className="pl-1 flex flex-col xs:flex-row  items-center w-full gap-1">
          <PieChart
            data={[
              { name: 'Outcomes', amount: 1200 },
              { name: 'Incomes', amount: 2500 },
              { name: 'Incomes', amount: 2500 },
              { name: 'Incomes', amount: 2500 },
              { name: 'Incomes', amount: 2500 },
              { name: 'Incomes', amount: 2500 },
              { name: 'Incomes', amount: 2500 },
              { name: 'Incomes', amount: 2500 },
            ]}
          />
          <PieChartData
            header="Pie Chart Data For Outcome Sources"
            items={[
              {
                name: 'data1',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
              {
                name: 'data2',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
              {
                name: 'data1',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
              {
                name: 'data1',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
              {
                name: 'data1',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
              {
                name: 'data1',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
              {
                name: 'data1',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
              {
                name: 'data1',
                amount: 2300,
                date: Date.now(),
                description: 'description',
              },
            ]}
          />
        </div>
        <div className="flex flex-col w-full">
          <SourcesDetailsContainer header="Outcome Sources"></SourcesDetailsContainer>
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
