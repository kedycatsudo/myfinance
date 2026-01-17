'use client';

import { useEffect, useState } from 'react';
import { FinanceSource, FinancePayment } from '@/types/finance';
import { InvestmentSource, InvestmentItem } from '@/types/investments';

type EditSourceModalProps = {
  open: boolean;
  source: FinanceSource | InvestmentSource;
  onClose: () => void;
  onSubmit?: (updated: FinanceSource | InvestmentSource) => void;
};

function isFinanceSource(a: FinanceSource | InvestmentSource): a is FinanceSource {
  return 'payments' in a;
}
function isInvestmentSource(a: FinanceSource | InvestmentSource): a is InvestmentSource {
  return 'items' in a;
}

export default function EditSourceModal({ open, source, onClose, onSubmit }: EditSourceModalProps) {
  const [localSource, setLocalSource] = useState<FinanceSource | InvestmentSource>(source);
  const [openItemAccordions, setOpenItemAccordions] = useState<{ [id: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [field: string]: string }>({});

  // Reset local state when modal opens on a different source
  useEffect(() => {
    setLocalSource(source);
    setOpenItemAccordions({});
    setErrors({});
  }, [source, open]);
  useEffect(() => {
    if (open) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock scroll
      document.body.style.overflow = '';
    }
    // Clean up when modal unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  if (!open) return null;

  // Handle field changes for the source itself
  const handleSourceInput = (field: string, value: string) => {
    setLocalSource(
      (prev) =>
        ({
          ...prev,
          [field]: value,
        } as FinanceSource | InvestmentSource),
    );
  };

  // Handle field changes for child payments/items
  const handleItemInput = (itemId: string, field: string, value: any) => {
    if (isFinanceSource(localSource)) {
      setLocalSource((prev) =>
        isFinanceSource(prev)
          ? {
              ...prev,
              payments: prev.payments.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item,
              ),
            }
          : prev,
      );
    }
    if (isInvestmentSource(localSource)) {
      setLocalSource((prev) =>
        isInvestmentSource(prev)
          ? {
              ...prev,
              items: prev.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item,
              ),
            }
          : prev,
      );
    }
  };

  // Minimum MVP validation
  function validate() {
    const err: { [field: string]: string } = {};
    if (!localSource.sourceName?.trim()) err.sourceName = 'Source name required';
    // Validate payments/items
    const items = isFinanceSource(localSource)
      ? localSource.payments
      : isInvestmentSource(localSource)
      ? localSource.items
      : [];
    for (const item of items) {
      // Example for name/assetName:
      if ('name' in item && !item.name.trim()) err[`item.${item.id}.name`] = 'Name required';
      if ('assetName' in item && !item.assetName.trim())
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

  // Field renderers (shared)
  const renderSourceInputs = () => (
    <div className="flex flex-col gap-2 mb-4">
      <label>
        <span className="block font-medium text-[#29388A]">Source Name</span>
        <input
          className="rounded border px-2 py-1 mt-1 w-full text-[#29388A]"
          value={localSource.sourceName}
          onChange={(e) => handleSourceInput('sourceName', e.target.value)}
        />
        {errors.sourceName && <span className="text-red-500 text-xs">{errors.sourceName}</span>}
      </label>
      {'description' in localSource && (
        <label>
          <span className="block font-medium text-[#29388A]">Description</span>
          <input
            className="rounded border px-2 py-1 mt-1 w-full text-black text-[#29388A]"
            value={localSource.description || ''}
            onChange={(e) => handleSourceInput('description', e.target.value)}
          />
        </label>
      )}
      {'date' in localSource && (
        <label>
          <span className="block font-medium">Date</span>
          <input
            type="date"
            className="rounded border px-2 py-1 mt-1 w-full text-[#29388A]"
            value={localSource.date || ''}
            onChange={(e) => handleSourceInput('date', e.target.value)}
          />
        </label>
      )}
    </div>
  );

  // Payment/Item renderers (reuse for both types)
  const renderItems = (items: (FinancePayment | InvestmentItem)[], type: 'payment' | 'item') => (
    <div className="flex flex-col gap-3 mb-4">
      {items.map((item) => {
        const isOpen = !!openItemAccordions[item.id];
        const isFinance = 'name' in item;
        const isInvestment = 'assetName' in item;
        return (
          <div
            key={item.id}
            className={`border-4 border-[#29388A] rounded rounded px-2 py-2 transition-all cursor-pointer ${
              isOpen ? 'bg-[#3A4483]/75 text-white' : 'text-[#29388A]'
            }`}
          >
            {/* Accordion Head */}
            <div
              onClick={() =>
                setOpenItemAccordions((prev) => ({
                  ...prev,
                  [item.id]: !prev[item.id],
                }))
              }
              className="flex flex-row justify-between items-center"
            >
              <span className="font-semibold ">
                {isFinance ? item.name : isInvestment ? item.assetName : ''}
              </span>
              <span className="text-sm text-gray-500">{isOpen ? '▼' : '▶'}</span>
            </div>
            {/* Accordion Body */}
            {isOpen && (
              <div className="mt-2 flex flex-col gap-2">
                {/* Render each primitive input except id */}
                {Object.entries(item).map(([field, value]) => {
                  if (field === 'id') return null;
                  // Finances: name, type, amount, date, loop, status
                  // Investments: assetName, term, investedAmount, entryDate, exitDate, result, resultAmount, status
                  let inputType =
                    typeof value === 'number'
                      ? 'number'
                      : typeof value === 'boolean'
                      ? 'checkbox'
                      : 'text';
                  if (field.toLowerCase().includes('date')) inputType = 'date';
                  // For enums, render select (very simple MVP):
                  if (field === 'status' && isFinance)
                    return (
                      <label key={field}>
                        <span className="block">Payment Status</span>
                        <select
                          value={value}
                          onChange={(e) => handleItemInput(item.id, field, e.target.value)}
                          className="rounded border px-2 py-1 mt-1 w-full text-black"
                        >
                          <option value="coming">Coming</option>
                          <option value="paid">Paid</option>
                        </select>
                        {errors[`${type}.${item.id}.${field}`] && (
                          <span className="text-red-500 text-xs">
                            {errors[`${type}.${item.id}.${field}`]}
                          </span>
                        )}
                      </label>
                    );
                  if (field === 'status' && isInvestment)
                    return (
                      <label key={field}>
                        <span className="block">Status</span>
                        <select
                          value={value}
                          onChange={(e) => handleItemInput(item.id, field, e.target.value)}
                          className="rounded border px-2 py-1 mt-1 w-full text-black"
                        >
                          <option value="open">Open</option>
                          <option value="closed">Closed</option>
                        </select>
                      </label>
                    );
                  if (field === 'result')
                    return (
                      <label key={field}>
                        <span className="block">Result</span>
                        <select
                          value={value}
                          onChange={(e) => handleItemInput(item.id, field, e.target.value)}
                          className="rounded border px-2 py-1 mt-1 w-full text-black"
                        >
                          <option value="none">None</option>
                          <option value="profit">Profit</option>
                          <option value="loss">Loss</option>
                        </select>
                      </label>
                    );
                  if (field === 'term')
                    return (
                      <label key={field}>
                        <span className="block">Term</span>
                        <select
                          value={value}
                          onChange={(e) => handleItemInput(item.id, field, e.target.value)}
                          className="rounded border px-2 py-1 mt-1 w-full text-black"
                        >
                          <option value="short">Short</option>
                          <option value="middle">Middle</option>
                          <option value="long">Long</option>
                        </select>
                      </label>
                    );
                  if (field === 'loop')
                    return (
                      <label key={field} className="block">
                        <span className="block">Loop</span>
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(e) => handleItemInput(item.id, field, e.target.checked)}
                          className="ml-1"
                        />
                      </label>
                    );
                  // Generic input (string or number)
                  return (
                    <label key={field} className="block">
                      <span className="block capitalize">{field}</span>
                      <input
                        type={inputType}
                        value={
                          inputType === 'date' && value ? String(value).slice(0, 10) : value ?? ''
                        }
                        onChange={(e) =>
                          handleItemInput(
                            item.id,
                            field,
                            inputType === 'number'
                              ? Number(e.target.value)
                              : inputType === 'checkbox'
                              ? e.target.checked
                              : e.target.value,
                          )
                        }
                        className="rounded border px-2 py-1 mt-1 w-full text-black"
                      />
                      {errors[`${type}.${item.id}.${field}`] && (
                        <span className="text-red-500 text-xs">
                          {errors[`${type}.${item.id}.${field}`]}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="w-full max-w-lg bg-[#989899] rounded-lg shadow-2xl p-4 relative max-h-[90vh] flex flex-col">
        <div className="overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold mb-2 text-[#29388A] text-center">
            Edit "{localSource.sourceName || 'Source'}"
          </h2>
          {renderSourceInputs()}
          {isFinanceSource(localSource) && renderItems(localSource.payments, 'payment')}
          {isInvestmentSource(localSource) && renderItems(localSource.items, 'item')}
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
