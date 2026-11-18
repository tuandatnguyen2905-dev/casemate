// Sprint 04B: where Continue Learning leads after a practice session. Pure; no DOM needed.
import type { ChapterState, CheckState, JourneyRow } from '../../../IndustryKnowledge/lessonFlowCore';
import { describeContinueLearning, resolveContinueLearning } from '../continueLearning';
import type { CurriculumStop } from '../continueLearning';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const same = (left: unknown, right: unknown, message: string) => assert(JSON.stringify(left) === JSON.stringify(right), `${message}: expected ${JSON.stringify(right)}, got ${JSON.stringify(left)}`);

const row = (index: number, state: ChapterState, check: CheckState = 'available', lockedBy: number | null = null, lockedByPreparation = false): JourneyRow => ({
  index, number: index + 1, title: `Chapter title ${index + 1}`, minutes: 5, state, check, lockedBy, lockedByPreparation,
});

const IDENTITY = 'ind::Module One::Lesson B';
const LESSONS: CurriculumStop[] = [
  { identity: 'ind::Module One::Lesson A', title: 'Lesson A', moduleTitle: 'Module One' },
  { identity: IDENTITY, title: 'Lesson B', moduleTitle: 'Module One' },
  { identity: 'ind::Module One::Lesson C', title: 'Lesson C', moduleTitle: 'Module One' },
  { identity: 'ind::Module Two::Lesson D', title: 'Lesson D', moduleTitle: 'Module Two' },
];

const cases: Array<{ id: string; name: string; run: () => void }> = [
  { id: 'UXB-11a', name: 'an open next chapter in the lesson comes first', run: () => {
    const target = resolveContinueLearning({ rows: [row(0, 'current'), row(1, 'available'), row(2, 'locked', 'locked', 2)], chapterIndex: 0, identity: IDENTITY, lessons: LESSONS });
    same(target, { kind: 'chapter', chapterIndex: 1, number: 2, title: 'Chapter title 2' }, 'next chapter');
    same(describeContinueLearning(target).label, 'Continue to Chapter 2', 'label');
  } },
  { id: 'UXB-11b', name: 'held chapters are stepped over, never offered', run: () => {
    const target = resolveContinueLearning({ rows: [row(0, 'current'), row(1, 'under-review', 'under-review'), row(2, 'available')], chapterIndex: 0, identity: IDENTITY, lessons: LESSONS });
    same([target.kind, target.kind === 'chapter' && target.chapterIndex], ['chapter', 2], 'chapter 3, after the held chapter 2');
  } },
  { id: 'UXB-11c', name: 'after the last chapter: the next lesson of the curriculum, never the first lesson', run: () => {
    const target = resolveContinueLearning({ rows: [row(0, 'completed'), row(1, 'current')], chapterIndex: 1, identity: IDENTITY, lessons: LESSONS });
    same(target, { kind: 'lesson', identity: 'ind::Module One::Lesson C', title: 'Lesson C', moduleTitle: 'Module One', newModule: false }, 'Lesson C');
    same(describeContinueLearning(target), { label: 'Continue to Next Lesson', detail: 'Next: Lesson C' }, 'copy');
  } },
  { id: 'UXB-11d', name: 'the last lesson of a module continues into the next module; held lessons are skipped', run: () => {
    const lessons = LESSONS.map((lesson) => (lesson.title === 'Lesson C' ? { ...lesson, heldForReview: true } : lesson));
    const target = resolveContinueLearning({ rows: [row(0, 'current')], chapterIndex: 0, identity: IDENTITY, lessons });
    same([target.kind, target.kind === 'lesson' && target.identity, target.kind === 'lesson' && target.newModule], ['lesson', 'ind::Module Two::Lesson D', true], 'Lesson D in Module Two');
    same(describeContinueLearning(target).detail, 'Next: Lesson D · Module Two', 'names the new module');
  } },
  { id: 'UXB-11e', name: 'end of the curriculum or an unknown order lands on Your Learning Path, never on another lesson', run: () => {
    const last = resolveContinueLearning({ rows: [row(0, 'current')], chapterIndex: 0, identity: 'ind::Module Two::Lesson D', lessons: LESSONS });
    same(last, { kind: 'learning-path', reason: 'end-of-curriculum' }, 'last lesson');
    const unknown = resolveContinueLearning({ rows: [row(0, 'current')], chapterIndex: 0, identity: 'ind::Elsewhere::Lesson Z', lessons: LESSONS });
    same(unknown, { kind: 'learning-path', reason: 'unknown-order' }, 'identity not in the curriculum: not lessons[0]');
    same(resolveContinueLearning({ rows: [row(0, 'current')], chapterIndex: 0, identity: IDENTITY, lessons: null }).kind, 'learning-path', 'curriculum not listed');
    same(describeContinueLearning(last).label, 'Back to Your Learning Path', 'label');
  } },
  { id: 'UXB-12a', name: 'a locked next chapter is never offered: the blocking Knowledge Check is, with the reason', run: () => {
    const target = resolveContinueLearning({ rows: [row(0, 'current', 'available'), row(1, 'locked', 'locked', 1), row(2, 'locked', 'locked', 2)], chapterIndex: 0, identity: IDENTITY, lessons: LESSONS });
    same(target, { kind: 'check', checkIndex: 0, checkNumber: 1, lockedNumber: 2, lockedTitle: 'Chapter title 2', preparation: false }, 'check 1 gates chapter 2');
    const copy = describeContinueLearning(target);
    same(copy.label, 'Take Knowledge Check 1', 'label');
    assert(copy.notice?.includes('opens after you submit Knowledge Check 1') && copy.notice.includes('Flashcards never unlock chapters'), `notice: ${copy.notice}`);
  } },
  { id: 'UXB-12b', name: 'a check that could not load is named as such, and the lesson is never skipped past it', run: () => {
    const target = resolveContinueLearning({ rows: [row(0, 'current', 'unavailable'), row(1, 'locked', 'locked', 1, true)], chapterIndex: 0, identity: IDENTITY, lessons: LESSONS });
    same([target.kind, target.kind === 'check' && target.preparation], ['check', true], 'still the check');
    assert(describeContinueLearning(target).notice?.includes('could not load'), 'notice explains the load failure');
  } },
  { id: 'UXB-12c', name: 'flashcard practice on a not-assessable chapter still follows the gate of the next required check', run: () => {
    const rows = [row(0, 'completed', 'submitted'), row(1, 'current', 'under-preparation'), row(2, 'available'), row(3, 'locked', 'locked', 3)];
    same(resolveContinueLearning({ rows, chapterIndex: 1, identity: IDENTITY, lessons: LESSONS }).kind, 'chapter', 'chapter 3 is open (chapter 2 has no check)');
    const fromThree = resolveContinueLearning({ rows, chapterIndex: 2, identity: IDENTITY, lessons: LESSONS });
    same([fromThree.kind, fromThree.kind === 'check' && fromThree.checkIndex], ['check', 2], 'chapter 4 waits for check 3');
  } },
];

export function runContinueLearningTests() {
  const failures: string[] = [];
  cases.forEach((item) => {
    try {
      item.run();
      console.log(`PASS ${item.id} ${item.name}`);
    } catch (error) {
      failures.push(`${item.id}: ${(error as Error).message}`);
      console.log(`FAIL ${item.id} ${item.name}: ${(error as Error).message}`);
    }
  });
  if (failures.length) throw new Error(`${failures.length} Continue Learning case(s) failed`);
  return cases.length;
}

runContinueLearningTests();
