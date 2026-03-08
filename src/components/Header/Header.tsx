import { MONTHS } from '../../utils/constants';

interface Props {
  viewYear: number;
  viewMonth: number;
  onChangeMonth: (delta: number) => void;
  onAddClick: () => void;
}

export default function Header({ viewYear, viewMonth, onChangeMonth, onAddClick }: Props) {
  return (
    <header className="border-b border-border px-10 py-5 flex items-center justify-between sticky top-0 bg-bg/95 backdrop-blur-md z-50">
      <div className="font-serif text-[22px] font-bold text-gold tracking-wide">
        Ledger{' '}
        <span className="font-mono text-[13px] font-normal text-text-dim tracking-widest uppercase ml-3">
          Finance
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onChangeMonth(-1)}
          className="w-7 h-7 border border-border text-text-dim flex items-center justify-center text-base hover:border-gold hover:text-gold transition-colors"
        >
          ‹
        </button>
        <div className="font-mono text-[11px] tracking-widest uppercase text-text-mid min-w-[130px] text-center">
          {MONTHS[viewMonth]} {viewYear}
        </div>
        <button
          onClick={() => onChangeMonth(1)}
          className="w-7 h-7 border border-border text-text-dim flex items-center justify-center text-base hover:border-gold hover:text-gold transition-colors"
        >
          ›
        </button>
      </div>

      <button
        onClick={onAddClick}
        className="bg-gold text-bg px-5 py-2 font-mono text-[11px] font-medium tracking-widest uppercase hover:bg-gold-bright hover:-translate-y-px transition-all"
      >
        + Add Entry
      </button>
    </header>
  );
}
