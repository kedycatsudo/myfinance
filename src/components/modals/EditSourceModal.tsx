'use client';

import { useEffect, useState } from 'react';
import { FinanceSource, FinancePayment } from '@/types/finance';
import { InvestmentSource, InvestmentItem } from '@/types/investments';
import { PAYMENT_FIELDS, ITEM_FIELDS } from '@/constants/fieldConfig';
import FieldInput from '../forms/FieldInput';
import AccordionItem from '../forms/AccordionItem';
import { isFinanceSource, isInvestmentSource } from '@/utils/functions/typeGuard';

type EditSourceModalProps = {
  open: boolean;
  source: FinanceSource | InvestmentSource;
  onClose: () => void;
  onSubmit: (updated: FinanceSource | InvestmentSource) => void;
};

export default function EditSourceModal({ open, source, onClose, onSubmit }: EditSourceModalProps) {
  const [localSource, setLocalSource] = useState<FinanceSource | InvestmentSource>(source);
  const [openItemAccordions, setOpenItemAccordions] = useState<{ [id: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  useEffect(() => {
    setLocalSource(source);
    setOpenItemAccordions({});
    setErrors({});
  }, [source, open]);
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  if (!open) return null;
  //source input
  const handleSourceInput = (field: string, value: any) => {
    setLocalSource((prev) => ({ ...prev, [field]: value }) as any);
  };

  //Item input
  const handleItemInput = (itemId: string, field: any, value: any) => {
    const arrKey = isFinanceSource(localSource) ? 'payments' : 'item';
    setLocalSource(
      (prev) =>
        ({
          ...prev,
          [arrKey]: (prev as any)[arrKey].map((itm: any) =>
            itm.id === itemId ? { ...itm, [field]: value } : itm,
          ),
        }) as any,
    );
  };

  // validation

  function validate() {
    const err: Record<string, string> = {};
    if (!localSource.sourceName?.trim()) err.sourceName = 'Source name required';
    const items = isFinanceSource(localSource)
      ? localSource.payments
      : isInvestmentSource(localSource)
        ? localSource.items
        : [];
    for (const item of items) {
      if ('name' in item && !item.name?.trim()) err[`item.${item.id}.name`] = 'Name required';
      if ('assetName' in item && !item.assetName?.trim())
        err[`item.${item.id}.assetName`] = 'Asset name required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit?.(localSource);
      onClose();
    }
  };

  //source fields
  const sourceFields = [
    { label: ' Source Name', value: localSource.sourceName, err: errors.sourceName },
    ...(localSource.description !== undefined
      ? [{ label: 'Description', field: 'description', value: localSource.description }]
      : []),
    ...(localSource.date !== undefined
      ? [{ label: 'Date', field: 'date', value: localSource.date, type: 'date' }]
      : []),
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="w-full max-w-lg bg-[#989899] rounded-lg shadow-2xl p-4 relative max-h-[90vh] flex flex-col">
        <div className="overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold mb-2 text-[#29388A] text-center">
            Edit "{localSource.sourceName}"
          </h2>
          <div className="flex flex-col gap-2 mb-4">
            {sourceFields.map((f) => (
              <FieldInput
                key={f.field}
                label={f.label}
                type={f.type}
                value={f.value}
                onChange={(v) => handleSourceInput(f.field ?? '', v)}
                err={f.err}
              ></FieldInput>
            ))}
          </div>
          {/* items grid */}
          {isFinanceSource(localSource) &&
            localSource.payments &&
            localSource.payments.map((payment) => (
              <AccordionItem
                key={payment.id}
                item={payment}
                fieldConfig={PAYMENT_FIELDS}
                itemTypeKey="payment"
                isOpen={!!openItemAccordions[payment.id]}
                toggleOpen={() =>
                  setOpenItemAccordions((prev) => ({ ...prev, [payment.id]: !prev[payment.id] }))
                }
                handleItemInput={handleItemInput}
                errors={errors}
              ></AccordionItem>
            ))}
          {isInvestmentSource(localSource) &&
            localSource.items &&
            localSource.items.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                fieldConfig={ITEM_FIELDS}
                itemTypeKey="item"
                isOpen={!!openItemAccordions[item.id]}
                toggleOpen={() =>
                  setOpenItemAccordions((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                }
                handleItemInput={handleItemInput}
                errors={errors}
              />
            ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-[#29388A] text-white hover:bg-blue-800 font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
