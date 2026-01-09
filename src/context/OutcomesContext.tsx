'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, Children } from 'react';

import { OutcomeSource } from '@/types/outcomes';

// Context type includes CRUD methods for sources

type OutcomesContextType = {
  outcomes: OutcomeSource[];
  setOutcomes: React.Dispatch<React.SetStateAction<OutcomeSource[]>>;
  addSource: (source: OutcomeSource) => void;
  updateSource: (source: OutcomeSource) => void;
  removeSource: (sourceId: string) => void;
};

const OutcomesContext = createContext<OutcomesContextType | undefined>(undefined);
export const OutcomesProvioder = ({ children }: { children: ReactNode }) => {
  const [outcomes, setOutcomes] = useState<OutcomeSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //Fetch outcomes data from public/data/outcomes.json on mount

  useEffect(() => {
    fetch('/data/outcomes.json')
      .then((res) => {
        if (!res.ok) throw new Error("Data couldn't not fetched from /data/outcomes.json");
        return res.json();
      })
      .then((data) => {
        setOutcomes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error loading outcomes data');
        setOutcomes([]);
        setLoading(false);
      });
  }, []);

  //CRUD methods for outcome sources
  const addSource = (source: OutcomeSource) => {
    setOutcomes((prev) => [...prev, source]);
  };
  const updateSource = (updated: OutcomeSource) => {
    setOutcomes((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };
  const removeSource = (sourceId: string) => {
    setOutcomes((prev) => prev.filter((s) => s.id !== sourceId));
  };

  return (
    <OutcomesContext.Provider
      value={{ outcomes, setOutcomes, addSource, updateSource, removeSource, loading, error }}
    >
      {children}
    </OutcomesContext.Provider>
  );
};

//Hook for consuming context

export const useOutcomesContext = () => {
  const ctx = useContext(OutcomesContext);
  if (!ctx) throw new Error('useOutcomesContext must be used inside OutcomesProvider');
  return ctx;
};
