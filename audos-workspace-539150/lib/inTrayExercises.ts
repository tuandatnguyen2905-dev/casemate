import free1 from '../data/assessmentday-in-tray-free-1.json';
import free2 from '../data/assessmentday-in-tray-free-2.json';
import free3 from '../data/assessmentday-in-tray-free-3.json';
import free4 from '../data/assessmentday-in-tray-free-4.json';
import free5 from '../data/assessmentday-in-tray-free-5.json';
import free6 from '../data/assessmentday-in-tray-free-6.json';
import one1 from '../data/assessmentday-in-tray-1-1.json';
import one2 from '../data/assessmentday-in-tray-1-2.json';
import one3 from '../data/assessmentday-in-tray-1-3.json';
import one4 from '../data/assessmentday-in-tray-1-4.json';
import one5 from '../data/assessmentday-in-tray-1-5.json';
import one6 from '../data/assessmentday-in-tray-1-6.json';
import one7 from '../data/assessmentday-in-tray-1-7.json';
import two from '../data/assessmentday-in-tray-2.json';
import eOne from '../data/assessmentday-e-tray-1.json';
import eTwo from '../data/assessmentday-e-tray-2.json';
import eFree from '../data/assessmentday-e-tray-free.json';

// AssessmentDay In-Tray and E-Tray practice exercises, numbered 1 to 3 within
// each type (In-Tray 1-3, E-Tray 1-3). Each exercise keeps the
// original booklet pages as pictures (drawn at runtime from the PDF and cropped
// to the document) together with the model answers and scoring guidance from the
// matching answers / solutions booklet.

/** [pdf page, x0, y0, x1, y1] in PDF points. */
export type TrayPageRef = [number, number, number, number, number];

export interface TrayOption {
  t: string;
  /** 1 = most effective ... 4 = least effective. */
  rk: number;
  why: string;
}

export interface TrayItem {
  n: number;
  t: string;
  pg: TrayPageRef[];
  /** In-tray: model priority, e.g. "High" or "Medium/Low". */
  pr?: string;
  /** In-tray: model actions. */
  a?: string[];
  note?: string[];
  /** In-tray 2: scoring lines [text, points, bonus 0/1]. */
  crit?: Array<[string, number, number]>;
  zero?: string[];
  /** E-tray: competency, urgency, importance, scoring indicators. */
  comp?: string;
  urg?: string;
  imp?: string;
  pos?: string[];
  neg?: string[];
  /** E-tray (most / least effective): the four responses. */
  opts?: TrayOption[];
}

export interface TrayDoc {
  n: number;
  t: string;
  pg: TrayPageRef[];
}

export type TrayKind = 'in_tray' | 'e_tray' | 'e_tray_choice';

export interface TrayExercise {
  id: string;
  kind: TrayKind;
  title: string;
  role: string;
  minutes: number;
  url: string;
  brief: TrayPageRef[];
  docs?: TrayDoc[];
  comps?: string[];
  overall?: { pos: string[]; neg: string[] };
  items: TrayItem[];
}

interface RawPart {
  items?: TrayItem[];
}

function merge(parts: unknown[]): TrayExercise {
  const [first, ...rest] = parts as Array<Partial<TrayExercise> & RawPart>;
  const items: TrayItem[] = [...(first.items || [])];
  rest.forEach((part) => items.push(...(part.items || [])));
  return { ...(first as TrayExercise), items };
}

let cache: TrayExercise[] | null = null;

export function loadInTrayExercises(): TrayExercise[] {
  if (!cache) {
    cache = [
      merge([one1, one2, one3, one4, one5, one6, one7]),
      merge([two]),
      merge([free1, free2, free3, free4, free5, free6]),
      merge([eOne]),
      merge([eTwo]),
      merge([eFree]),
    ];
  }
  return cache;
}
