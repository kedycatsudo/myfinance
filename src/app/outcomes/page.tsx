'use client';

import SideBar from '@/components/SideBar';
import RecentSideInfo from '@/components/RecentSideInfo';
import MobileMenuButton from '@/components/MobileBurgerMenu';
import SourcesList from '@/components/SourcesList';
import PieChartData from '@/components/PieChartData';
import PieChart from '@/components/PieChart';
import CatchUpTheMonth from '@/components/outcomes/catchUpTheMonth';
import SourcesDetailsContainer from '@/components/sourcesDetailsContainer/sourcesDetailsContainer';
import { useOutcomesContext } from '@/context/OutcomesContext';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export default function Outcomes() {
  const pathName = usePathname();
  const { outcomes } = useOutcomesContext();

  /** Example: Extracting useful data for children */
  // Flat list of latest payments across all sources, sorted newest first
  const allPaymentys=useMemo(()=>outcomes.flatmap((src)=>src.payments)
}
