import { keepsNumbers } from './numberCheck';
import { CB_VI_VISUALS } from './commercialBanking/cbViVisuals';

// Vietnamese overlay for Learning Visual diagrams, keyed by visualKind. An overlay mirrors the English spec's
// structure with Vietnamese text only: layout, step kinds, tones, numeric values and array lengths always come
// from the English spec, and every number in an English string must appear in its Vietnamese counterpart. If the
// English title changed, an array changed length, or any text field is missing or loses a number, the whole
// English visual is shown instead, so a diagram never mixes languages or shows outdated figures.

export interface ViVisualSpec {
  /** The English spec title the overlay was translated from. */
  enTitle: string;
  /** Text-only mirror of the English spec (same keys, same array lengths). */
  spec: Record<string, unknown>;
}

/** Spec keys whose string values select a layout or style, never display text. */
const STRUCTURAL_KEYS = new Set(['layout', 'kind', 'tone', 'type', 'variant', 'icon', 'color', 'id', 'emphasis', 'shape', 'direction', 'align']);
const IDENTIFIER = /^[a-z][a-z0-9-]*$/;

export function overlayVisualSpec<T>(english: T, overlay: ViVisualSpec | undefined): T | null {
  const title = (english as { title?: unknown } | null)?.title;
  if (!overlay || typeof title !== 'string' || title !== overlay.enTitle) return null;
  let complete = true;
  const walk = (source: unknown, translated: unknown, key?: string): unknown => {
    if (typeof source === 'string') {
      if (!source.trim() || (key && STRUCTURAL_KEYS.has(key)) || (translated === undefined && IDENTIFIER.test(source))) return source;
      if (typeof translated !== 'string' || !translated.trim() || !keepsNumbers(source, translated)) {
        complete = false;
        return source;
      }
      return translated;
    }
    if (Array.isArray(source)) {
      if (!Array.isArray(translated) || translated.length !== source.length) {
        complete = false;
        return source;
      }
      return source.map((item, index) => walk(item, translated[index]));
    }
    if (source && typeof source === 'object') {
      const mirror = translated && typeof translated === 'object' ? translated as Record<string, unknown> : {};
      return Object.fromEntries(Object.entries(source as Record<string, unknown>).map(([field, value]) => [field, walk(value, mirror[field], field)]));
    }
    return source;
  };
  const result = walk(english, overlay.spec) as T;
  return complete ? result : null;
}

const VI_VISUALS: Record<string, ViVisualSpec> = { ...CB_VI_VISUALS };
const cache = new WeakMap<object, unknown>();

/** The Vietnamese spec for a visual kind, or null when there is no current, complete overlay. */
export function localizedVisualSpec<T extends object>(kind: string, english: T): T | null {
  if (!cache.has(english)) cache.set(english, overlayVisualSpec(english, VI_VISUALS[kind]));
  return cache.get(english) as T | null;
}

export const viVisualKinds = () => Object.keys(VI_VISUALS);
