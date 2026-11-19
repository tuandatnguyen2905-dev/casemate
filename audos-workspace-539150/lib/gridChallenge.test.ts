import {
  GC_ROUNDS,
  buildGridSession,
  checkGcAnswer,
  gridAttemptAnswerRows,
  isMirrorSymmetric,
  isRotationOf,
  mirrorShape,
  piecesFormTarget,
  rotateShapeBy,
  scoreGridSession,
  summarizeGridAttempt,
  validateGridSession,
} from './gridChallenge';
import type { GcCell, GcResponses } from './gridChallenge';

const SAMPLE_SESSIONS = 400;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function checkFixtures() {
  assert(isMirrorSymmetric({ cols: 8, filled: [[0, 0], [0, 7], [3, 2], [3, 5]] }), 'mirrored pairs must read as symmetrical');
  assert(!isMirrorSymmetric({ cols: 8, filled: [[0, 0], [0, 7], [3, 2]] }), 'a missing mirror cell must read as not symmetrical');

  const lShape: GcCell[] = [[0, 0], [1, 0], [2, 0], [2, 1]];
  assert(isRotationOf(lShape, rotateShapeBy(lShape, 90)), 'a 90° turn is a rotation');
  assert(isRotationOf(lShape, rotateShapeBy(lShape, 270)), 'a 270° turn is a rotation');
  assert(!isRotationOf(lShape, mirrorShape(lShape)), 'the mirror image of an L is not a rotation of it');
  assert(!isRotationOf(lShape, rotateShapeBy(mirrorShape(lShape), 180)), 'a turned mirror image is still not a rotation');

  const domino: GcCell[] = [[0, 0], [0, 1]];
  const tromino: GcCell[] = [[0, 0], [1, 0], [1, 1]];
  assert(piecesFormTarget([domino, tromino], [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1]]), 'domino + L-tromino cover this pentomino');
  assert(piecesFormTarget([rotateShapeBy(domino, 90), rotateShapeBy(tromino, 180)], [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1]]), 'turned pieces still cover it');
  assert(!piecesFormTarget([domino, tromino], [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]), 'an L-tromino never fits a straight line');
  assert(!piecesFormTarget([domino, tromino], [[0, 0], [0, 1], [1, 0], [1, 1]]), 'cell counts must match');
}

function checkGeneratedSessions() {
  let yes = 0;
  let no = 0;
  for (let seed = 1; seed <= SAMPLE_SESSIONS; seed += 1) {
    const session = buildGridSession(seed);
    const problems = validateGridSession(session);
    assert(problems.length === 0, `seed ${seed}: ${problems.join('; ')}`);
    assert(session.tasks.length === 9, `seed ${seed}: 9 tasks`);
    session.tasks.forEach((task, index) => {
      const round = Math.floor(index / 3);
      assert(task.kind === GC_ROUNDS[round].kind, `seed ${seed}: task ${index + 1} is in the wrong round`);
      assert(task.steps.length === GC_ROUNDS[round].dots[index % 3], `seed ${seed}: task ${index + 1} has the wrong dot count`);
      task.steps.forEach((step) => {
        assert(checkGcAnswer(step.question) === step.question.answer, `seed ${seed}: ${step.question.id} answer key is wrong`);
        if (step.question.answer === 'yes') yes += 1;
        else no += 1;
      });
    });
    assert(session.totalDots === 30 && session.totalQuestions === 30, `seed ${seed}: expected 30 dots and 30 questions`);
  }
  const share = yes / (yes + no);
  assert(share > 0.45 && share < 0.55, `Yes answers should be about half, got ${Math.round(share * 100)}%`);

  const tampered = buildGridSession(3);
  tampered.tasks.forEach((task) => {
    const question = task.steps[0].question;
    question.answer = question.answer === 'yes' ? 'no' : 'yes';
  });
  assert(validateGridSession(tampered).filter((problem) => problem.includes('independent check')).length === 9, 'the validator must catch every flipped answer key');

  const a = buildGridSession(7);
  const b = buildGridSession(8);
  assert(JSON.stringify(a.tasks) !== JSON.stringify(b.tasks), 'different seeds must deal different sessions');
  assert(JSON.stringify(a.tasks) === JSON.stringify(buildGridSession(7).tasks), 'the same seed must deal the same session');
}

function checkScoring() {
  const session = buildGridSession(42);
  const [first, second] = session.tasks;
  const dots = first.steps.map((step) => step.dot);
  const perfect: GcResponses = {
    answers: Object.fromEntries(session.tasks.flatMap((task) => task.steps.map((step) => [step.question.id, step.question.answer]))),
    recalls: Object.fromEntries(session.tasks.map((task) => [task.id, task.steps.map((step) => step.dot)])),
  };
  const full = scoreGridSession(session, perfect, 400, false);
  assert(full.percent === 100 && full.memoryPercent === 100 && full.reasoningPercent === 100 && full.tasksCompleted === 9, 'a perfect run scores 100%');

  // Right cells in the wrong order earn nothing for the swapped dots.
  const swapped: GcResponses = { answers: {}, recalls: { [first.id]: [dots[1], dots[0]] } };
  assert(scoreGridSession(session, swapped, 30, false).memoryCorrect === 0, 'order mistakes count as wrong');
  const unused = ([[0, 0], [0, 1], [0, 2]] as GcCell[]).find((cell) => !dots.some((dot) => dot[0] === cell[0] && dot[1] === cell[1]))!;
  const halfRight: GcResponses = { answers: {}, recalls: { [first.id]: [dots[0], unused] } };
  assert(scoreGridSession(session, halfRight, 30, false).memoryCorrect === 1, 'one dot in the right place and order scores one');

  // Time-out mid-session: only what was answered counts; the rest is wrong.
  const partial: GcResponses = {
    answers: { [first.steps[0].question.id]: first.steps[0].question.answer, [second.steps[0].question.id]: second.steps[0].question.answer === 'yes' ? 'no' : 'yes' },
    recalls: { [first.id]: dots },
  };
  const timedOut = scoreGridSession(session, partial, 9999, true);
  assert(timedOut.tasksCompleted === 1, 'tasks completed counts confirmed recalls only');
  assert(timedOut.memoryCorrect === dots.length && timedOut.memoryTotal === 30, 'unshown dots count as wrong');
  assert(timedOut.reasoningCorrect === 1 && timedOut.reasoningAnswered === 2 && timedOut.reasoningTotal === 30, 'unanswered questions count as wrong');
  assert(timedOut.durationSeconds === session.timeLimitSeconds && timedOut.timedOut, 'time spent is capped at the limit');

  const rows = gridAttemptAnswerRows(session, partial);
  assert(rows.length === 39, 'one row per Yes/No question plus one recall row per task');
  const summary = summarizeGridAttempt(JSON.stringify(rows));
  assert(summary.memoryPercent === timedOut.memoryPercent, 'saved rows reproduce memory accuracy');
  assert(summary.reasoningPercent === timedOut.reasoningPercent, 'saved rows reproduce visual reasoning accuracy');
  assert(summary.tasksCompleted === 1, 'saved rows reproduce tasks completed');
}

export function runGridChallengeTests() {
  checkFixtures();
  checkGeneratedSessions();
  checkScoring();
}

runGridChallengeTests();
