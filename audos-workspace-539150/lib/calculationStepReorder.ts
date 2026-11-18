import type { CalculationNumberSlot } from './calculationAnswerModel';

/** True when every `(` has a later-or-same-step `)` and no `)` appears before its `(`. */
export function calculationBracketsBalanced(slots: CalculationNumberSlot[]): boolean {
  let depth = 0;
  for (const slot of slots) {
    if (slot.openParenthesis) depth += 1;
    if (slot.closeParenthesis) {
      depth -= 1;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}

/** Pair each `(` with its `)` by step index; null when the structure is already unbalanced. */
function matchBracketPairs(slots: CalculationNumberSlot[]): Array<[number, number]> | null {
  const stack: number[] = [];
  const pairs: Array<[number, number]> = [];
  for (let index = 0; index < slots.length; index += 1) {
    if (slots[index].openParenthesis) stack.push(index);
    if (slots[index].closeParenthesis) {
      const open = stack.pop();
      if (open === undefined) return null;
      pairs.push([open, index]);
    }
  }
  return stack.length ? null : pairs;
}

/**
 * Move one step to a new position. Brackets always travel with their step.
 * If simply carrying the flags along would leave an unbalanced structure
 * (for example a `)` landing before its `(`), each bracket pair stays attached
 * to the same two steps and is re-anchored so the earlier step opens and the
 * later step closes. Step values, labels and operators are never altered.
 */
export function reorderCalculationSteps(
  slots: CalculationNumberSlot[],
  from: number,
  to: number,
): CalculationNumberSlot[] {
  if (from === to || from < 0 || to < 0 || from >= slots.length || to >= slots.length) return slots;

  const order = slots.map((_, index) => index);
  const [movedIndex] = order.splice(from, 1);
  order.splice(to, 0, movedIndex);
  const carried = order.map((originalIndex) => slots[originalIndex]);
  if (calculationBracketsBalanced(carried)) return carried;

  const pairs = matchBracketPairs(slots);
  if (!pairs) return carried;

  const newPosition = new Map<number, number>();
  order.forEach((originalIndex, position) => newPosition.set(originalIndex, position));
  const spans = pairs
    .map(([open, close]) => {
      const a = newPosition.get(open) as number;
      const b = newPosition.get(close) as number;
      return { start: Math.min(a, b), end: Math.max(a, b) };
    })
    .sort((left, right) => (left.end - left.start) - (right.end - right.start));

  const opens = new Array<boolean>(slots.length).fill(false);
  const closes = new Array<boolean>(slots.length).fill(false);
  spans.forEach(({ start, end }) => {
    if (opens[start] || closes[end]) return;
    opens[start] = true;
    closes[end] = true;
  });

  return order.map((originalIndex, position) => ({
    ...slots[originalIndex],
    openParenthesis: opens[position],
    closeParenthesis: closes[position],
  }));
}
