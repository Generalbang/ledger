import { useState, useEffect } from 'react';
import { useFinance } from './hooks/useFinance';
import Header from './components/Header/Header';
import SummaryRow from './components/SummaryRow/SummaryRow';
import SpendingChart from './components/SpendingChart/SpendingChart';
import DonutChart from './components/DonutChart/DonutChart';
import CategoryBars from './components/CategoryBars/CategoryBars';
import BudgetTracker from './components/BudgetTracker/BudgetTracker';
import TransactionList from './components/TransactionList/TransactionList';
import TransactionModal from './components/TransactionModal/TransactionModal';

export default function App() {
  const { transactions, budgets, viewYear, viewMonth, changeMonth, addTransaction, deleteTransaction, updateBudgets } = useFinance();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === 'n' && !['INPUT','TEXTAREA','SELECT'].includes(tag)) setModalOpen(true);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text font-sans font-light">
      <Header viewYear={viewYear} viewMonth={viewMonth} onChangeMonth={changeMonth} onAddClick={() => setModalOpen(true)} />

      <main className="px-10 py-10 max-w-[1400px] mx-auto">
        <SummaryRow transactions={transactions} />

        {/* Chart row */}
        <div className="grid grid-cols-[1fr_380px] gap-6 mb-6 max-[1024px]:grid-cols-1">
          <SpendingChart transactions={transactions} viewYear={viewYear} viewMonth={viewMonth} />
          <DonutChart transactions={transactions} />
        </div>

        {/* Breakdown row */}
        <div className="grid grid-cols-[1fr_380px] gap-6 mb-6 max-[1024px]:grid-cols-1">
          <CategoryBars transactions={transactions} />
          <BudgetTracker transactions={transactions} budgets={budgets} onUpdateBudgets={updateBudgets} />
        </div>

        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </main>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={addTransaction} />
    </div>
  );
}
