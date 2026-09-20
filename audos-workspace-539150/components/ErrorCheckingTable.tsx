// Casemate — Error Checking table renderer.
//
// Error Checking questions live or die on character-level comparison, so the
// data is rendered as REAL HTML TABLES (not images): monospace cells, a
// muted header row, and the original stacked above the hand-copied version so
// the columns line up for scanning — exactly how the real platforms lay it
// out. In the results review (`reveal`), every corrupted cell of the copy is
// tinted with the danger colour so the candidate can see precisely which
// characters they missed.
//
// Styled entirely with the shared --space-* tokens, same as DiagramFigure.tsx
// and InductiveFigure.tsx.

import type { ErrorCheckingExpandedQuestion } from '../lib/errorChecking';

function DataTable({
  title,
  columns,
  rows,
  highlight,
  compact,
}: {
  title: string;
  columns: string[];
  rows: string[][];
  /** Set of "row:col" keys to tint as errors (results review only). */
  highlight?: Set<string>;
  compact?: boolean;
}) {
  const cellPad = compact ? 'px-2 py-1' : 'px-2.5 py-1.5';
  return (
    <div className="min-w-0">
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{title}</p>
      <div className="overflow-x-auto rounded-lg border border-[var(--space-border-default)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[var(--space-surface-muted)]">
              <th
                className={`${cellPad} border-b border-[var(--space-border-default)] text-[11px] font-bold text-[var(--space-text-secondary)]`}
                scope="col"
                aria-label="Row number"
              >
                #
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className={`${cellPad} whitespace-nowrap border-b border-[var(--space-border-default)] text-[11px] font-bold text-[var(--space-text-secondary)]`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className={r % 2 === 1 ? 'bg-[var(--space-surface-muted)]/40' : ''}>
                <td className={`${cellPad} border-b border-[var(--space-border-default)] text-[11px] font-semibold text-[var(--space-text-muted)]`}>
                  {r + 1}
                </td>
                {row.map((cell, c) => {
                  const isError = highlight ? highlight.has(`${r}:${c}`) : false;
                  return (
                    <td
                      key={c}
                      className={`${cellPad} whitespace-nowrap border-b border-[var(--space-border-default)] font-mono text-xs ${
                        isError
                          ? 'bg-[color-mix(in_srgb,var(--space-semantic-danger)_14%,transparent)] font-bold text-[var(--space-semantic-danger)]'
                          : 'text-[var(--space-text-primary)]'
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * The data for one Error Checking question: the original table, and — for
 * compare-format questions — the hand-copied table below it. With `reveal`
 * (results review) every corrupted cell of the copy is tinted so the
 * candidate sees exactly where the transcription errors were.
 */
export function ErrorCheckingTables({
  question,
  reveal,
  compact,
}: {
  question: ErrorCheckingExpandedQuestion;
  reveal?: boolean;
  compact?: boolean;
}) {
  const highlight = reveal ? new Set(question.errorCells.map(([r, c]) => `${r}:${c}`)) : undefined;
  return (
    <div className="flex w-full flex-col gap-3">
      <DataTable title={question.sourceTitle} columns={question.columns} rows={question.sourceRows} compact={compact} />
      {question.checkRows && question.checkTitle ? (
        <DataTable
          title={question.checkTitle}
          columns={question.columns}
          rows={question.checkRows}
          highlight={highlight}
          compact={compact}
        />
      ) : null}
    </div>
  );
}
