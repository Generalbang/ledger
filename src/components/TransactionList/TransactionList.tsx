import { Transaction, Category } from '../../types';
import { CAT_COLORS, CAT_ICONS } from '../../utils/constants';
import { fmt, shortDate } from '../../utils/format';

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="bg-surface border border-border p-7">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <span className="font-serif text-base font-semibold tracking-wide">Transaction Log</span>
        <span className="font-mono text-[10px] text-text-dim tracking-widest uppercase">
          {transactions.length} entr{transactions.length !== 1 ? 'ies' : 'y'}
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-10 font-mono text-[11px] text-text-dim tracking-widest uppercase">
            No transactions yet — add your first entry
          </div>
        ) : (
          transactions.map(t => {
            const isIncome = t.type === 'income';
            const color = isIncome ? '#4a8c6a' : CAT_COLORS[t.cat as Category] || '#7a7570';
            return (
              <div key={t.id} className="group flex items-center gap-3 py-3 border-b border-border last:border-b-0 animate-fadeSlide">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                  style={{ background: `${color}22`, color }}
                >
                  {isIncome ? '↑' : CAT_ICONS[t.cat as Category] || '↓'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13px] text-text truncate">{t.desc}</div>
                  <div className="font-mono text-[10px] text-text-dim mt-0.5">
                    {shortDate(t.date)} · {isIncome ? 'Income' : t.cat}
                  </div>
                </div>
                <div
                  className="font-mono text-[13px] font-medium shrink-0"
                  style={{ color: isIncome ? '#6db88a' : '#c0474a' }}
                >
                  {isIncome ? '+' : '-'}{fmt(t.amount)}
                </div>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-text-dim text-base opacity-0 group-hover:opacity-100 hover:text-red transition-all shrink-0 leading-none px-1"
                  title="Delete"
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
