import { useState, useEffect } from 'react';
import { TransactionType, Category } from '../../types';
import { CATS, CAT_ICONS } from '../../utils/constants';
import { toDateInput } from '../../utils/format';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { desc: string; amount: number; date: string; cat: Category | 'Income'; type: TransactionType }) => void;
}

export default function TransactionModal({ open, onClose, onAdd }: Props) {
  const [type, setType] = useState<TransactionType>('income');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(toDateInput(new Date()));
  const [cat, setCat] = useState<Category>('Food');
  const [errors, setErrors] = useState<{ desc?: boolean; amount?: boolean }>({});

  useEffect(() => {
    if (open) { setDesc(''); setAmount(''); setDate(toDateInput(new Date())); setErrors({}); }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleSubmit() {
    const n = parseFloat(amount);
    const errs: typeof errors = {};
    if (!desc.trim()) errs.desc = true;
    if (!n || n <= 0) errs.amount = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onAdd({ desc: desc.trim(), amount: n, date, cat: type === 'income' ? 'Income' : cat, type });
    onClose();
  }

  if (!open) return null;

  const inputBase = "w-full bg-bg border text-text px-3.5 py-2.5 font-mono text-[13px] outline-none transition-colors appearance-none";
  const inputNormal = `${inputBase} border-border focus:border-gold`;
  const inputError  = `${inputBase} border-red`;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface border border-border w-[480px] max-w-[95vw] animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-border">
          <span className="font-serif text-[18px] font-semibold">New Entry</span>
          <button onClick={onClose} className="text-text-dim text-[22px] leading-none hover:text-text transition-colors">×</button>
        </div>

        {/* Body */}
        <div className="px-7 pb-7 pt-6">
          {/* Toggle */}
          <div className="grid grid-cols-2 gap-px bg-border mb-6">
            <button
              onClick={() => setType('income')}
              className={`py-2.5 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                type === 'income' ? 'bg-green text-white' : 'bg-surface2 text-text-dim hover:text-text'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setType('expense')}
              className={`py-2.5 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                type === 'expense' ? 'bg-red text-white' : 'bg-surface2 text-text-dim hover:text-text'
              }`}
            >
              Expense
            </button>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-mono text-[10px] tracking-widest uppercase text-text-dim mb-2">Description</label>
            <input
              type="text"
              placeholder="What was this for?"
              value={desc}
              autoFocus
              onChange={e => { setDesc(e.target.value); setErrors(er => ({ ...er, desc: false })); }}
              className={errors.desc ? inputError : inputNormal}
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-text-dim mb-2">Amount (₦)</label>
              <input
                type="number" placeholder="0.00" min="0" step="0.01"
                value={amount}
                onChange={e => { setAmount(e.target.value); setErrors(er => ({ ...er, amount: false })); }}
                className={errors.amount ? inputError : inputNormal}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-text-dim mb-2">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputNormal} />
            </div>
          </div>

          {/* Category */}
          {type === 'expense' && (
            <div className="mb-4">
              <label className="block font-mono text-[10px] tracking-widest uppercase text-text-dim mb-2">Category</label>
              <select value={cat} onChange={e => setCat(e.target.value as Category)} className={inputNormal}>
                {CATS.map(c => <option key={c} value={c} className="bg-surface2">{CAT_ICONS[c]} {c}</option>)}
              </select>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-gold text-bg py-3 font-mono text-[12px] font-medium tracking-widest uppercase hover:bg-gold-bright transition-colors mt-2"
          >
            Record Entry
          </button>
        </div>
      </div>
    </div>
  );
}
