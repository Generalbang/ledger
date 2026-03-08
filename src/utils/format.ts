export function fmt(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return '₦' + (abs / 1_000_000).toFixed(1) + 'M';
  if (abs >= 1_000) return '₦' + (abs / 1_000).toFixed(1) + 'K';
  return '₦' + abs.toLocaleString('en-NG');
}

export function fmtFull(n: number): string {
  return '₦' + Math.abs(n).toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function toDateInput(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function shortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}
