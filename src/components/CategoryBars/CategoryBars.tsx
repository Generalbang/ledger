import { Transaction, Category } from '../../types';
import { CATS, CAT_COLORS } from '../../utils/constants';
import { fmt } from '../../utils/format';

interface Props { transactions: Transaction[] }

export default function CategoryBars({ transactions }: Props) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const bycat: Partial<Record<Category, number>> = {};
  CATS.forEach(c => (bycat[c] = 0));
  expenses.forEach(t => {
    if (t.cat !== 'Income') bycat[t.cat as Category] = (bycat[t.cat as Category] || 0) + t.amount;
  });

  const total = expenses.reduce((s, t) => s + t.amount, 0);
  const sorted = CATS.filter(c => (bycat[c] || 0) > 0).sort((a, b) => (bycat[b] || 0) - (bycat[a] || 0));
  const maxVal = sorted.length ? Math.max(...sorted.map(c => bycat[c] || 0)) : 1;

  return (
    <div className="bg-surface border border-border p-7">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <span className="font-serif text-base font-semibold tracking-wide">Category Breakdown</span>
        <span className="font-mono text-[10px] text-text-dim tracking-widest uppercase">Expenses Only</span>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-10 font-mono text-[11px] text-text-dim tracking-widest uppercase">
          No expense data
        </div>
      ) : (
        <div className="space-y-3.5">
          {sorted.map(cat => {
            const val = bycat[cat] || 0;
            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
            const barW = ((val / maxVal) * 100).toFixed(1);
            return (
              <div key={cat} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: CAT_COLORS[cat] }} />
                <div className="font-sans text-[12px] text-text-mid w-[90px] shrink-0">{cat}</div>
                <div className="flex-1 h-1 bg-surface2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${barW}%`, background: CAT_COLORS[cat] }}
                  />
                </div>
                <div className="font-mono text-[11px] text-text w-20 text-right shrink-0">{fmt(val)}</div>
                <div className="font-mono text-[10px] text-text-dim w-10 text-right shrink-0">{pct}%</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
