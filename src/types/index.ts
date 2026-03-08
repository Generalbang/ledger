export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Housing'
  | 'Food'
  | 'Transport'
  | 'Utilities'
  | 'Entertainment'
  | 'Health'
  | 'Other';

export interface Transaction {
  id: number;
  desc: string;
  amount: number;
  date: string;
  cat: Category | 'Income';
  type: TransactionType;
}

export type Budgets = Record<Category, number>;
