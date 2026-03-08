import { Transaction, Category } from '../../types';
import { CAT_COLORS } from '../../utils/constants';
import { fmt } from '../../utils/format';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props { transactions: Transaction[] }

export default function DonutChart({ transactions }: Props) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const bycat: Partial<Record<Category, number>> = {};
  expenses.forEach(t => {
    if (t.cat !== 'Income') bycat[t.cat as Category] = (bycat[t.cat as Category] || 0) + t.amount;
  });

  const total = Object.values(bycat).reduce((s, v) => s + (v || 0), 0);
  const sorted = Object.entries(bycat).sort((a, b) => (b[1] || 0) - (a[1] || 0)) as [Category, number][];

  const data = sorted.map(([cat, val]) => ({
    name: cat,
    value: val,
    color: CAT_COLORS[cat],
  }));

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0].payload;
      return (
        <div className="bg-surface border border-border p-2 rounded shadow">
          <p className="font-mono text-xs">{data.name}: {fmt(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border p-7">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <span className="font-serif text-base font-semibold tracking-wide">Distribution</span>
        <span className="font-mono text-[10px] text-text-dim tracking-widest uppercase">By Category</span>
      </div>

      {total === 0 ? (
        <div className="text-center py-10 font-mono text-[11px] text-text-dim tracking-widest uppercase">
          No expense data
        </div>
      ) : (
        <>
          <div className="relative">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={52}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={renderTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="font-serif text-sm font-semibold text-text" style={{ fontFamily: 'Playfair Display, serif' }}>
                {fmt(total)}
              </div>
              <div className="font-mono text-[8px] text-text-dim tracking-widest uppercase">
                SPENT
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            {sorted.slice(0, 4).map(([cat, val]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: CAT_COLORS[cat] }} />
                <div className="font-sans text-[10px] text-text-mid flex-1">{cat}</div>
                <div className="font-mono text-[10px] text-text-dim">{((val / total) * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
