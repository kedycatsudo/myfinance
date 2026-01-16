'use client';
import { useState } from 'react';

type SourcesDetailsContainerProps<T extends { id: string }> = {
  header: string;
  items: T[];
  renderSource: (
    item: T,
    open: boolean,
    onClick: () => void,
    onEdit: () => void,
  ) => React.ReactNode;
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
      {items.map((item) =>
        renderSource(
          item,
          !!openSources[item.id],
          () =>
            setOpenSources((prev) => ({
              ...prev,
              [item.id]: !prev[item.id],
            })),
          // The new edit callback for this item
          () => setOpenSources((prev) => ({ ...prev, [item.id]: true })), // This will be replaced by parent modal handler later!
        ),
      )}
    </div>
  );
}
