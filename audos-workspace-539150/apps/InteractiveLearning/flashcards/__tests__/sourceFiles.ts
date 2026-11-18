// Reads curriculum files (read-only) for the source-mapping test. Uses Node's built-in module
// loader instead of import statements so this test-only helper adds no bundler dependencies.

interface NodeLike {
  env: Record<string, string | undefined>;
  getBuiltinModule?: (id: string) => any;
}

const proc = (globalThis as { process?: NodeLike }).process;

function builtin(id: string) {
  if (!proc?.getBuiltinModule) throw new Error('Source-mapping tests need Node 22.3+ (process.getBuiltinModule).');
  return proc.getBuiltinModule(id);
}

/**
 * Workspace root: FLASHCARDS_WORKSPACE_ROOT if set, else the current directory if it contains
 * `apps/IndustryKnowledge`, else four levels above this folder (when running as ESM).
 */
export function workspaceRoot(): string {
  const override = proc?.env.FLASHCARDS_WORKSPACE_ROOT;
  if (override) return override;
  const { existsSync } = builtin('node:fs');
  const { join } = builtin('node:path');
  const cwd: string = (proc as unknown as { cwd: () => string }).cwd();
  if (existsSync(join(cwd, 'apps', 'IndustryKnowledge'))) return cwd;
  const metaUrl = (import.meta as { url?: string }).url;
  if (metaUrl) {
    const { fileURLToPath } = builtin('node:url');
    return fileURLToPath(new URL('../../../../', metaUrl));
  }
  return cwd;
}

export function readWorkspaceFile(relativePath: string): string | null {
  const { readFileSync, existsSync } = builtin('node:fs');
  const { join } = builtin('node:path');
  const full = join(workspaceRoot(), relativePath);
  return existsSync(full) ? readFileSync(full, 'utf8') : null;
}

export function sha256(text: string): string {
  const { createHash } = builtin('node:crypto');
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

/** The text between two markers (start inclusive, end exclusive), or null if either is missing. */
export function between(text: string, startMarker: string, endMarker: string): string | null {
  const start = text.indexOf(startMarker);
  if (start < 0) return null;
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (end < 0) return null;
  return text.slice(start, end);
}

/** Splits a lesson block into chapter segments, each starting at `marker`. */
export function chapterSegments(block: string, marker: string): string[] {
  const segments: string[] = [];
  let from = block.indexOf(marker);
  while (from >= 0) {
    const next = block.indexOf(marker, from + marker.length);
    segments.push(block.slice(from, next < 0 ? undefined : next));
    from = next;
  }
  return segments;
}
