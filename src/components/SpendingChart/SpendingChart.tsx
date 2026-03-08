import { Transaction } from '../../types';
import { fmt } from '../../utils/format';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  transactions: Transaction[];
  viewYear: number;
  viewMonth: number;
}

export default function SpendingChart({ transactions, viewYear, viewMonth }: Props) {
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const dayExp = Array<number>(daysInMonth).fill(0);
  const dayInc = Array<number>(daysInMonth).fill(0);
  transactions.forEach(t => {
    const d = new Date(t.date);
    if (d.getMonth() === viewMonth && d.getFullYear() === viewYear) {
      const idx = d.getDate() - 1;
      if (t.type === 'expense') dayExp[idx] += t.amount;
      else dayInc[idx] += t.amount;
    }
  });

  const data = [];
  let cumExp = 0, cumInc = 0;
  for (let i = 0; i < daysInMonth; i++) {
    cumExp += dayExp[i];
    cumInc += dayInc[i];
    data.push({
      day: i + 1,
      income: cumInc,
      expenses: cumExp,
    });
  }

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0].payload;
      return (
        <div className="bg-surface border border-border p-2 rounded shadow">
          <p className="font-mono text-xs">Day {data.day}</p>
          <p className="font-mono text-xs text-green-400">Income: {fmt(data.income)}</p>
          <p className="font-mono text-xs text-red-400">Expenses: {fmt(data.expenses)}</p>
        </div>
      );
    }
    return null;
  };

  const yAxisFormatter = (value: number) => fmt(value);

  return (
    <div className="bg-surface border border-border p-7">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <span className="font-serif text-base font-semibold tracking-wide">Spending Overview</span>
        <span className="font-mono text-[10px] text-text-dim tracking-widest uppercase">Daily Cumulative</span>
      </div>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, bottom: 30, left: 55 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6db88a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6db88a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c0474a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#c0474a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2c2a" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#7a7570', fontFamily: 'IBM Plex Mono' }}
              interval={daysInMonth <= 15 ? 2 : 6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#7a7570', fontFamily: 'IBM Plex Mono' }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip content={renderTooltip} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#6db88a"
              fillOpacity={1}
              fill="url(#colorIncome)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#c0474a"
              fillOpacity={1}
              fill="url(#colorExpenses)"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex gap-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-1 bg-green-400"></div>
          <span className="font-mono text-[9px] text-text-dim tracking-widest uppercase">INCOME</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-1 bg-red-400"></div>
          <span className="font-mono text-[9px] text-text-dim tracking-widest uppercase">EXPENSES</span>
        </div>
      </div>
    </div>
  );
}
