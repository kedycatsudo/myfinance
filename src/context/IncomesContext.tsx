'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OutcomeSource } from '@/types/outcomes'; // If you have identical type (can rename to IncomeSource if you want)

// 1. Context type -- same as outcomes, but for incomes
type IncomesContextType = {
  incomes: OutcomeSource[]; // or IncomeSource[] if you separate the type
  setIncomes: React.Dispatch<React.SetStateAction<OutcomeSource[]>>;
  addSource: (source: OutcomeSource) => void;
  updateSource: (source: OutcomeSource) => void;
  removeSource: (sourceId: string) => void;
  loading: boolean;
  error: string | null;
};

// 2. Create context
const IncomesContext = createContext<IncomesContextType | undefined>(undefined);

// 3. Provider loads incomes.json and exposes state+CRUD
export const IncomesProvider = ({ children }: { children: ReactNode }) => {
  const [incomes, setIncomes] = useState<OutcomeSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 4. Load incomes from mock JSON (public/data/incomes.json)
  useEffect(() => {
    fetch('/data/incomes.json')
      .then((res) => {
        if (!res.ok) throw new Error('Could not fetch /data/incomes.json');
        return res.json();
      })
      .then((data) => {
        setIncomes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error loading incomes data');
        setIncomes([]);
        setLoading(false);
      });
  }, []);

  // 5. CRUD: add, update, remove source
  const addSource = (source: OutcomeSource) => setIncomes((prev) => [...prev, source]);
  const updateSource = (updated: OutcomeSource) =>
    setIncomes((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  const removeSource = (sourceId: string) =>
    setIncomes((prev) => prev.filter((s) => s.id !== sourceId));

  return (
    <IncomesContext.Provider
      value={{ incomes, setIncomes, addSource, updateSource, removeSource, loading, error }}
    >
      {children}
    </IncomesContext.Provider>
  );
};

// 6. Hook for child components to access incomes
export const useIncomesContext = () => {
  const ctx = useContext(IncomesContext);
  if (!ctx) throw new Error('useIncomesContext must be used inside IncomesProvider');
  return ctx;
};
