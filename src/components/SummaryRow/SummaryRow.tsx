import { Transaction } from '../../types';
import { fmt } from '../../utils/format';

interface Props { transactions: Transaction[] }

export default function SummaryRow({ transactions }: Props) {
  const income   = transactions.filter(t => t.type === 'income');
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalIncome   = income.reduce((s, t) => s + t.amount, 0);
  const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
  const net = totalIncome - totalExpenses;
  const surplus = net >= 0;

  return (
    <div className="grid grid-cols-3 gap-px bg-border border border-border mb-10">
      {/* Income */}
      <div className="bg-surface p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-bright" />
        <div className="font-mono text-[10px] tracking-widest uppercase text-text-dim mb-3">Total Income</div>
        <div className="font-serif text-[38px] font-semibold leading-none text-green-bright mb-2">{fmt(totalIncome)}</div>
        <div className="font-mono text-[11px] text-text-dim">{income.length} transaction{income.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Expenses */}
      <div className="bg-surface p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-red" />
        <div className="font-mono text-[10px] tracking-widest uppercase text-text-dim mb-3">Total Expenses</div>
        <div className="font-serif text-[38px] font-semibold leading-none text-red mb-2">{fmt(totalExpenses)}</div>
        <div className="font-mono text-[11px] text-text-dim">{expenses.length} transaction{expenses.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Balance */}
      <div className="bg-surface p-7 relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${surplus ? 'bg-gold' : 'bg-red'}`} />
        <div className="font-mono text-[10px] tracking-widest uppercase text-text-dim mb-3">Net Balance</div>
        <div className={`font-serif text-[38px] font-semibold leading-none mb-2 ${surplus ? 'text-gold' : 'text-red'}`}>
          {fmt(Math.abs(net))}
        </div>
        <div className="font-mono text-[11px] text-text-dim">{surplus ? '↑ Surplus' : '↓ Deficit'}</div>
      </div>
    </div>
  );
}
