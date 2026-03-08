# Ledger — Personal Finance Snapshot

A personal finance tracker built as a frontend developer evaluation assessment. Live, minimal, and intentionally designed.

**Live Demo:** [ledger.vercel.app](https://ledger.vercel.app) *(update after deploy)*
**Built with:** React 18 + TypeScript + Vite, Recharts for charts, Tailwind CSS

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Design Choices

**Aesthetic Direction — Dark Editorial / Financial Terminal**

I deliberately avoided the standard fintech look (light mode, rounded cards, pastel charts). Instead, I went for a minimal dark, editorial aesthetic inspired by Bloomberg Terminal and high-end financial publications. Deep charcoal backgrounds, a grain texture overlay, warm amber/gold accents, and IBM Plex Mono for all numeric data. The goal was for the app to *feel* serious and precise before the user even reads a number.

**Typography**
- `Playfair Display` — serif display font for headings and large figures. Gives the finance data a sense of weight and authority.
- `IBM Plex Mono` — monospace for all numbers, labels, and metadata. Numbers in a fixed-width font are easier to scan vertically and feel inherently financial.
- `IBM Plex Sans` — light weight for body text and descriptions.

**Visualizations**
- **Area chart** — cumulative daily income vs. expenses for the month using Recharts for scalable, interactive visualizations.
- **Donut chart** — spending distribution by category using Recharts PieChart with custom styling.
- **Category bars** — ranked horizontal bars showing relative spend proportions.
- **Budget tracker** — per-category progress bars that shift from green → amber → red as you approach/exceed limits.

**Data**
- All data stored in `localStorage`, keyed by year + month (e.g. `ledger_2026_2`). This means each month is independent — you navigate between months without losing data.
- Budget limits are stored separately and persist across months.

**Architecture**
- `useFinance` — custom hook that owns all state and localStorage I/O. Components are purely presentational.
- Tailwind CSS for scoped, maintainable styles.
- Recharts for modern, scalable chart components.
- No general UI libraries. Every other component is hand-built.

---

## What I'd Improve With More Time

- **CSV export** — let users download their month's transactions as a spreadsheet.
- **Multi-month trend view** — a 6-month or 12-month overview chart to see patterns over time.
- **Savings goals** — set a target savings amount for the month and track progress.
- **Recurring transactions** — mark a transaction as recurring so it auto-populates each month.
- **Better mobile layout** — the two-column grid works well on desktop but could be more intentional on mobile.
- **Animations** — staggered chart reveals on load and smoother bar transitions.

---

## Challenges

Recharts works great out of the box but required some effort to make it feel at home in a dark, custom-themed UI. The default axis labels, tooltips, and grid lines all needed overriding via props (`tick`, `tickLine`, `axisLine`, `content`) to match the design rather than looking like a generic chart dropped into the page.

The `useFinance` hook also needed careful design to avoid stale closures when the month changes — state updates that depend on `viewYear`/`viewMonth` needed to be in `useCallback` with the correct deps.

---

## Time Spent

I received the assessment on March 6th around 5pm but started working on it on the 7th due to some unforeseen circumstances.

- **Planning & Design**: Wireframing the UI, choosing the dark financial aesthetic, and planning the component architecture.
- **Project Setup**: Initializing Vite + React + TypeScript, configuring Tailwind CSS, and setting up the basic folder structure.
- **Core Components**: Building the main components (Header, TransactionList, BudgetTracker, etc.) and implementing the useFinance hook for state management.
- **Charts & Visualizations**: Thinking of creating custom SVG charts, then modernizing to Recharts for better scalability and interactivity.
- **Styling & Polish**: Applying the dark theme, typography, and responsive design.
- **Testing & Documentation**: Manual testing, README updates, and final refinements.

The project demonstrates modern React patterns with a focus on clean, maintainable code and user experience.
