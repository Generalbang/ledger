import { useState, useCallback } from 'react';
import { Transaction, Budgets, Category, TransactionType } from '../types';
import { DEFAULT_BUDGETS } from '../utils/constants';

function txKey(year: number, month: number) {
  return `ledger_${year}_${month}`;
}
const BUDGET_KEY = 'ledger_budgets';

function loadTx(year: number, month: number): Transaction[] {
  try {
    return JSON.parse(localStorage.getItem(txKey(year, month)) || '[]');
  } catch {
    return [];
  }
}

function persistTx(year: number, month: number, txs: Transaction[]) {
  localStorage.setItem(txKey(year, month), JSON.stringify(txs));
}

function loadBudgets(): Budgets {
  try {
    return JSON.parse(localStorage.getItem(BUDGET_KEY) || 'null') ?? DEFAULT_BUDGETS;
  } catch {
    return DEFAULT_BUDGETS;
  }
}

function persistBudgets(b: Budgets) {
  localStorage.setItem(BUDGET_KEY, JSON.stringify(b));
}

export function useFinance() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadTx(now.getFullYear(), now.getMonth())
  );
  const [budgets, setBudgets] = useState<Budgets>(loadBudgets);

  const changeMonth = useCallback((delta: number) => {
    setViewMonth((m) => {
      const date = new Date(viewYear, m + delta, 1);
      const ny = date.getFullYear();
      const nm = date.getMonth();
      setViewYear(ny);
      setTransactions(loadTx(ny, nm));
      return nm;
    });
  }, [viewYear]);

  const addTransaction = useCallback(
    (data: { desc: string; amount: number; date: string; cat: Category | 'Income'; type: TransactionType }) => {
      setTransactions((prev) => {
        const next = [
          ...prev,
          { id: Date.now(), ...data },
        ].sort((a, b) => b.date.localeCompare(a.date));
        persistTx(viewYear, viewMonth, next);
        return next;
      });
    },
    [viewYear, viewMonth]
  );

  const deleteTransaction = useCallback(
    (id: number) => {
      setTransactions((prev) => {
        const next = prev.filter((t) => t.id !== id);
        persistTx(viewYear, viewMonth, next);
        return next;
      });
    },
    [viewYear, viewMonth]
  );

  const updateBudgets = useCallback((b: Budgets) => {
    setBudgets(b);
    persistBudgets(b);
  }, []);

  return {
    transactions,
    budgets,
    viewYear,
    viewMonth,
    changeMonth,
    addTransaction,
    deleteTransaction,
    updateBudgets,
  };
}
