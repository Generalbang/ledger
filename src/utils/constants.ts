import { Budgets, Category } from '../types';

export const CATS: Category[] = [
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
  'Health',
  'Other',
];

export const CAT_COLORS: Record<Category, string> = {
  Housing: '#4a6e9e',
  Food: '#c07840',
  Transport: '#7a5c9e',
  Utilities: '#3a8c80',
  Entertainment: '#c9a84c',
  Health: '#4a8c6a',
  Other: '#7a7570',
};

export const CAT_ICONS: Record<Category, string> = {
  Housing: '🏠',
  Food: '🍽️',
  Transport: '🚗',
  Utilities: '⚡',
  Entertainment: '🎬',
  Health: '💊',
  Other: '📦',
};

export const DEFAULT_BUDGETS: Budgets = {
  Housing: 150000,
  Food: 80000,
  Transport: 50000,
  Utilities: 30000,
  Entertainment: 40000,
  Health: 30000,
  Other: 20000,
};

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
