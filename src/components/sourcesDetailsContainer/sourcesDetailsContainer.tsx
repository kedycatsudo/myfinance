'use client';

import { useState } from 'react';
import SourceContainer from './sourceContainer';
import { FinancePayment } from '@/types/finance';

type SourcesDetailsContainerProps<T extends { id: string }> = {
  header: string;
  items: T[];
  renderSource: (item: T, open: boolean, onClick: () => void) => React.ReactNode;
};

export default function SourcesDetailsContainer<T extends { id: string }>({
  header,
  items,
  renderSource,
}: SourcesDetailsContainerProps<T>) {
  const [openSources, setOpenSources] = useState<{ [id: string]: boolean }>({});
  return (
    <div className="flex flex-col rounded bg-[#989899] opacity-75 items-center gap-2 px-1">
      <h1 className="text-2xl xs:text-3xl text-[#29388A] font-bold">{header}</h1>
      <span className="w-full mt-0.5 bg-[#1E1552] bg-opacity-60 border border-[#29388A] rounded px-2 py-0.5 font-bold text-[#a9deff] text-s xs:text-xl shadow-inner"></span>
      {items.map((item) =>
        renderSource(item, !!openSources[item.id], () =>
          setOpenSources((prev) => ({
            ...prev,
            [item.id]: !prev[item.id],
          })),
        ),
      )}
    </div>
  );
}
