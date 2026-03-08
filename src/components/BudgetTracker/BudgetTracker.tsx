import { useState } from 'react';
import { Transaction, Budgets, Category } from '../../types';
import { CATS, CAT_ICONS } from '../../utils/constants';
import { fmt } from '../../utils/format';

interface Props {
  transactions: Transaction[];
  budgets: Budgets;
  onUpdateBudgets: (b: Budgets) => void;
}

export default function BudgetTracker({ transactions, budgets, onUpdateBudgets }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Budgets>({ ...budgets });

  const expenses = transactions.filter(t => t.type === 'expense');
  const bycat: Partial<Record<Category, number>> = {};
  expenses.forEach(t => {
    if (t.cat !== 'Income') bycat[t.cat as Category] = (bycat[t.cat as Category] || 0) + t.amount;
  });

  function handleSave() { onUpdateBudgets(draft); setEditing(false); }
  function handleEdit() { setDraft({ ...budgets }); setEditing(true); }

  return (
    <div className="bg-surface border border-border p-7">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <span className="font-serif text-base font-semibold tracking-wide">Budget Tracker</span>
        {!editing ? (
          <button
            onClick={handleEdit}
            className="border border-border text-text-dim px-3 py-1 font-mono text-[10px] tracking-wide uppercase hover:border-gold hover:text-gold transition-colors"
          >
            Edit Limits
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="border border-gold text-gold px-3 py-1 font-mono text-[10px] tracking-wide uppercase hover:bg-gold hover:text-bg transition-colors"
          >
            Save
          </button>
        )}
      </div>

      {!editing ? (
        <div className="space-y-4">
          {CATS.filter(c => budgets[c] > 0).map(cat => {
            const spent = bycat[cat] || 0;
            const budget = budgets[cat];
            const pct = Math.min((spent / budget) * 100, 100);
            const over = spent > budget;
            const barColor = over ? '#c0474a' : pct > 75 ? '#c9a84c' : '#6db88a';
            return (
              <div key={cat}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-sans text-[12px] text-text-mid">{CAT_ICONS[cat]} {cat}</span>
                  <span className="font-mono text-[11px]">
                    <span style={{ color: over ? '#c0474a' : '#6db88a' }}>{fmt(spent)}</span>
                    <span className="text-text-dim"> / {fmt(budget)}</span>
                  </span>
                </div>
                <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: barColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2.5">
          {CATS.map(cat => (
            <div key={cat} className="flex items-center gap-2.5">
              <label className="font-sans text-[12px] text-text-mid w-[120px] shrink-0">
                {CAT_ICONS[cat]} {cat}
              </label>
              <input
                type="number"
                min="0"
                value={draft[cat]}
                onChange={e => setDraft(d => ({ ...d, [cat]: Number(e.target.value) }))}
                className="flex-1 bg-bg border border-border text-text px-2.5 py-1.5 font-mono text-[12px] outline-none focus:border-gold transition-colors"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
