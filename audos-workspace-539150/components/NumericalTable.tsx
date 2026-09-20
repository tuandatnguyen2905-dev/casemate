import type { NumericalDataTable } from '../lib/numericalReasoning';

/** Responsive data exhibit shared by the live question and results review. */
export function NumericalTable({ table, compact = false }: { table: NumericalDataTable; compact?: boolean }) {
  return (
    <figure className="w-full overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
      <figcaption className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-4 py-3">
        <p className="text-sm font-bold text-[var(--space-text-primary)]">{table.title}</p>
        {table.note ? <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-muted)]">{table.note}</p> : null}
      </figcaption>
      <div className="max-w-full overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label={`Scrollable table: ${table.title}`}>
        <table className={`w-full min-w-[640px] border-collapse text-left ${compact ? 'text-[11px]' : 'text-xs sm:text-sm'}`}>
          <thead>
            <tr className="bg-[var(--space-surface-accent-soft)]">
              {table.headers.map((header, index) => (
                <th key={`${header}-${index}`} scope="col" className="whitespace-nowrap border-b border-r border-[var(--space-border-default)] px-3 py-2 font-bold text-[var(--space-text-primary)] last:border-r-0">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 ? 'bg-[var(--space-surface-muted)]' : 'bg-[var(--space-surface-card)]'}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={cellIndex} scope="row" className="whitespace-nowrap border-b border-r border-[var(--space-border-default)] px-3 py-2 font-semibold text-[var(--space-text-primary)]">
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="whitespace-nowrap border-b border-r border-[var(--space-border-default)] px-3 py-2 tabular-nums text-[var(--space-text-secondary)] last:border-r-0">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-[var(--space-border-default)] px-3 py-2 text-[10px] text-[var(--space-text-muted)] sm:hidden">
        Swipe sideways to see all columns.
      </p>
    </figure>
  );
}
