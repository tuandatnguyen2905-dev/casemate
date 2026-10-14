import { Check } from 'lucide-react';
import { MBTI_ITEMS, scoreMbti } from './CultureFitSection';

export const SHARED_WORK_STYLE_ITEMS = [
  ['innovation', 'Innovation', 'Stable routines', 'New ideas and change'],
  ['detail', 'Attention to detail', 'Big picture', 'Precision and accuracy'],
  ['results', 'Outcome orientation', 'Process first', 'Measurable outcomes'],
  ['competitive', 'Competitiveness', 'Low-pressure collaboration', 'Compete to be the best'],
  ['supportive', 'People support', 'Independent environment', 'People-first support'],
  ['teamwork', 'Teamwork', 'Work independently', 'Close collaboration'],
  ['reward_development', 'Learning & development', 'Growth is secondary', 'Learning is essential'],
  ['reward_compensation', 'Compensation', 'Salary is secondary', 'High compensation matters'],
  ['work_life_balance', 'Work-life balance', 'Career takes priority', 'Balance is non-negotiable'],
] as const;

export type SharedWorkStyleKey = (typeof SHARED_WORK_STYLE_ITEMS)[number][0];
export type SharedWorkStyleScores = Record<SharedWorkStyleKey, number>;
export type SharedPersonalityMode = 'known' | 'assessment';

const MBTI_COPY: Record<string, { question: string; a: string; b: string }> = {
  ei_1: { question: 'After a day full of meetings and conversations, you would rather:', a: 'Keep talking because interaction gives you energy', b: 'Have quiet time alone to recharge' },
  ei_2: { question: 'In a group discussion, you usually:', a: 'Talk through ideas as you go', b: 'Organize your thoughts before sharing' },
  ei_3: { question: 'At an event where you do not know many people, you usually:', a: 'Start conversations with several people', b: 'Observe first and talk deeply with a few people' },
  ei_4: { question: 'What helps you think through a difficult problem?', a: 'Talking it through with someone', b: 'Thinking or writing alone first' },
  ei_5: { question: 'Your ideal workday includes:', a: 'Plenty of live interaction', b: 'Long stretches of focused work' },
  sn_1: { question: 'When learning a new skill, you prefer to begin with:', a: 'Examples and step-by-step practice', b: 'The big picture and core principles' },
  sn_2: { question: 'When evaluating a proposal, you trust:', a: 'Specific data and tested experience', b: 'Patterns and future possibilities' },
  sn_3: { question: 'When a request is vague, you usually:', a: 'Ask for specific criteria and outputs', b: 'Infer the larger goal and explore possibilities' },
  sn_4: { question: 'When improving a process, you prefer to:', a: 'Refine proven steps', b: 'Try an approach that could reshape it' },
  sn_5: { question: 'When presenting an idea, you emphasize:', a: 'Practical examples and execution', b: 'Vision and future possibilities' },
  tf_1: { question: 'When choosing between two important options, you usually:', a: 'Compare criteria and consequences', b: 'Consider values and impact on people' },
  tf_2: { question: 'When a teammate makes a mistake, you usually:', a: 'Address it directly and agree on action', b: 'Understand their situation before giving feedback' },
  tf_3: { question: 'When the team disagrees, you prioritize:', a: 'Testing which argument is most sound', b: 'Making sure everyone is heard' },
  tf_4: { question: 'When giving feedback, you usually:', a: 'Name the gap and suggest a fix', b: 'Acknowledge effort and adapt your wording' },
  tf_5: { question: 'When a general rule leaves someone unhappy, you usually:', a: 'Keep the rule consistent when it is rational', b: 'Adapt when relationships and human needs matter' },
  jp_1: { question: 'For a task due in two weeks, you usually:', a: 'Set milestones and start early', b: 'Stay flexible and focus closer to the deadline' },
  jp_2: { question: 'When planning your workweek, you prefer to:', a: 'Set a clear schedule at the start', b: 'Set priorities and adjust as things change' },
  jp_3: { question: 'When a plan changes at the last minute, you usually:', a: 'Want a revised plan before continuing', b: 'Shift quickly using the new information' },
  jp_4: { question: 'Once a task meets the requirements, you usually:', a: 'Finalize it and move on', b: 'Keep it open for new ideas' },
  jp_5: { question: 'When preparing for a trip or project, you prefer to:', a: 'Book milestones and prepare early', b: 'Decide later to keep options open' },
};

const TYPES = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

type Props = {
  scores: SharedWorkStyleScores;
  onScoreChange: (key: SharedWorkStyleKey, value: number) => void;
  answers: Record<string, 'A' | 'B'>;
  personalityType: string;
  mode: SharedPersonalityMode;
  questionIndex: number;
  onModeChange: (mode: SharedPersonalityMode) => void;
  onTypeChange: (type: string) => void;
  onAnswer: (itemId: string, choice: 'A' | 'B') => void;
  onQuestionIndexChange: (index: number) => void;
};

export default function WorkStyleAssessment({ scores, onScoreChange, answers, personalityType, mode, questionIndex, onModeChange, onTypeChange, onAnswer, onQuestionIndexChange }: Props) {
  const current = MBTI_ITEMS[Math.min(questionIndex, MBTI_ITEMS.length - 1)];
  const copy = current ? MBTI_COPY[current.id] : null;
  const complete = Object.keys(answers).length === MBTI_ITEMS.length;

  return (
    <>
      <div className="mt-6">
        <h3 className="font-extrabold">Work Environment Preferences</h3>
        <p className="mt-1 text-xs text-[var(--space-text-muted)]">Rate the environment where you tend to do your best work.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">{SHARED_WORK_STYLE_ITEMS.map(([key, label, low, high]) => <label key={key} className="rounded-2xl border border-[var(--space-border-default)] p-3"><span className="flex items-center justify-between text-sm font-bold">{label}<b className="rounded-lg bg-[var(--space-brand-primary)] px-2.5 py-1 text-[var(--space-text-on-primary)]">{scores[key]}</b></span><input type="range" min={1} max={5} value={scores[key]} onChange={(event) => onScoreChange(key, Number(event.target.value))} className="mt-3 w-full accent-[var(--space-brand-primary)]" /><span className="mt-1 flex justify-between text-[10px] text-[var(--space-text-muted)]"><span>1 · {low}</span><span className="text-right">5 · {high}</span></span></label>)}</div>
      </div>
      <div className="mt-7 border-t border-[var(--space-border-default)] pt-6">
        <h3 className="font-extrabold">Personality &amp; Working Style Assessment</h3>
        <p className="mt-1 text-xs text-[var(--space-text-muted)]">A supporting working-style signal only — never an automatic suitability verdict.</p>
        <p className="mt-4 text-sm font-bold">Do you already know your MBTI type?</p>
        <div className="mt-2 flex flex-wrap gap-2"><button type="button" onClick={() => onModeChange('known')} className={`rounded-xl border px-3 py-2 text-xs font-bold ${mode === 'known' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>Yes, Select My Type</button><button type="button" onClick={() => onModeChange('assessment')} className={`rounded-xl border px-3 py-2 text-xs font-bold ${mode === 'assessment' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>No / I'm Not Sure, Take the Assessment</button></div>
        {mode === 'known' ? <select value={personalityType} onChange={(event) => onTypeChange(event.target.value)} className="mt-3 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-3 text-sm"><option value="">Select your type</option>{TYPES.map((type) => <option key={type}>{type}</option>)}</select> : current && copy && <div className="mt-4 rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex justify-between gap-2"><p className="font-bold">{copy.question}</p><span className="text-xs font-bold text-[var(--space-text-muted)]">{questionIndex + 1}/{MBTI_ITEMS.length}</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{(['A', 'B'] as const).map((choice) => <button key={choice} type="button" onClick={() => onAnswer(current.id, choice)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${answers[current.id] === choice ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>{answers[current.id] === choice && <Check className="mr-1.5 inline h-4 w-4 text-[var(--space-text-brand)]" />}{choice === 'A' ? copy.a : copy.b}</button>)}</div><button type="button" disabled={questionIndex === 0} onClick={() => onQuestionIndexChange(Math.max(0, questionIndex - 1))} className="mt-3 text-xs font-bold text-[var(--space-text-muted)] disabled:opacity-30">Previous question</button>{complete && <p className="mt-2 text-sm font-bold text-[var(--space-text-brand)]">Working-style result: {personalityType || scoreMbti(answers).type}</p>}</div>}
      </div>
    </>
  );
}
