import {
  LABEL_EXACT,
  LABEL_FALLBACK,
  LABEL_RELATED,
  MAX_CARDS_PER_GROUP,
  buildRecommendations,
  companiesMatch,
  detectTopicTags,
  programsMatch,
  validateReviewDraft,
} from './candidateReviews';
import type { CandidateReview, ProgramRow, RecommendationTarget } from './candidateReviews';

const PROGRAMS: ProgramRow[] = [
  { program_id: 'unilever-uflp', program_name: "Future Leaders' Programme (UFLP)", company: 'Unilever', industry: 'FMCG', sector: 'Home & Personal Care, Foods', aptitude_test_types: 'Confirmed: aptitude test (content not published) | Global/other-region report: numerical reasoning, personality/behavioural, situational judgement, game-based' },
  { program_id: 'unilever-ufresh', program_name: 'UFresh (Unilever Fresh Programme)', company: 'Unilever', industry: 'FMCG', sector: 'Home & Personal Care, Foods' },
  { program_id: 'vinamilk-gtp', program_name: 'Graduate Talent Program', company: 'Vinamilk', industry: 'FMCG', sector: 'Dairy & Nutrition', aptitude_test_types: 'Secondary (VN): verbal reasoning, logical/inductive reasoning, IQ test' },
  { program_id: 'tcb-gtp', program_name: 'Gen Z Talent Program', company: 'Techcombank', industry: 'Banking & Financial Services', sector: 'Commercial Banking' },
];

const TARGET: RecommendationTarget = { company: 'Unilever Vietnam', program: "Future Leaders' Programme (UFLP)", position: 'Marketing', programId: 'unilever-uflp' };

function review(partial: Partial<CandidateReview> & { id: number; review_text: string }): CandidateReview {
  return { company: 'Unilever', program: 'UFLP', position: 'Marketing', review_type: 'interview', source_note: null, topic_tags: [], ...partial };
}

function check(condition: unknown, message: string) {
  if (!condition) throw new Error(message);
}

function equal<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

export function runCandidateReviewTests() {
  // Zero reviews: every card is a general preparation suggestion without evidence.
  const empty = buildRecommendations({ target: TARGET, reviews: [], programs: PROGRAMS });
  (['domain', 'aptitude', 'case_drill'] as const).forEach((group) => {
    equal(empty.groups[group].length, MAX_CARDS_PER_GROUP, `${group} card count`);
    empty.groups[group].forEach((card) => {
      equal(card.label, LABEL_FALLBACK, `${group} fallback label`);
      equal(card.evidence.length, 0, `${group} fallback evidence`);
    });
  });
  equal(empty.groups.domain[0].topic.contentId, 'fmcg-household', 'Unilever domain fallback');
  equal(empty.groups.aptitude.slice(0, 2).map((card) => card.topic.contentId), ['numerical', 'situational'], 'published test formats rank first');
  equal(empty.groups.case_drill[0].topic.contentId, 'creativity', 'marketing function puts creativity first');

  // Exact reviews win and are ranked by mention count.
  const exact = buildRecommendations({
    target: TARGET,
    programs: PROGRAMS,
    reviews: [
      review({ id: 1, review_text: 'Vòng 2 là case market sizing cho thị trường dầu gội, sau đó có bài numerical reasoning.' }),
      review({ id: 2, review_text: 'Interviewer hỏi guesstimate về số chai nước giặt bán ra mỗi năm.', position: null }),
    ],
  });
  equal(exact.groups.case_drill[0].topic.contentId, 'market-sizing', 'exact topic first');
  equal(exact.groups.case_drill[0].label, LABEL_EXACT, 'exact label');
  equal(exact.groups.case_drill[0].exactCount, 2, 'exact count');
  check(exact.groups.case_drill[0].evidence[0].excerpt.includes('market sizing'), 'excerpt quotes the review');
  equal(exact.groups.aptitude[0].label, LABEL_EXACT, 'aptitude evidence card');
  equal(exact.groups.aptitude[1].label, LABEL_FALLBACK, 'remaining aptitude slots are fallback');

  // Same company, other program → related, ranked below exact.
  const related = buildRecommendations({
    target: TARGET,
    programs: PROGRAMS,
    reviews: [
      review({ id: 1, review_text: 'Case về market sizing.' }),
      review({ id: 2, program: 'UFresh', position: null, review_text: 'Có bài chart đọc biểu đồ doanh thu và một câu market sizing.' }),
      review({ id: 3, program: 'UFresh', review_text: 'Bài charts exhibit khá dài.' }),
    ],
  });
  equal(related.groups.case_drill.map((card) => card.label), [LABEL_EXACT, LABEL_RELATED, LABEL_FALLBACK], 'exact before related before fallback');
  equal(related.groups.case_drill[1].relatedCount, 2, 'related count');

  // Different position at the same program is related; same-industry companies are related; other industries are ignored.
  const otherPosition = buildRecommendations({ target: TARGET, programs: PROGRAMS, reviews: [review({ id: 1, position: 'Supply Chain', review_text: 'Case market sizing.' })] });
  equal(otherPosition.groups.case_drill[0].label, LABEL_RELATED, 'other position');
  const industry = buildRecommendations({
    target: TARGET,
    programs: PROGRAMS,
    reviews: [
      review({ id: 1, company: 'Vinamilk', program: 'Graduate Talent Program', position: null, review_text: 'Có bài situational judgement.' }),
      review({ id: 2, company: 'Techcombank', program: 'Gen Z Talent Program', position: null, review_text: 'Có bài error checking.' }),
    ],
  });
  equal(industry.groups.aptitude.find((card) => card.topic.contentId === 'situational')?.label, LABEL_RELATED, 'same industry');
  check(!industry.groups.aptitude.some((card) => card.topic.contentId === 'error_checking'), 'other industry ignored');

  // Founder tags override keyword matching.
  const tagged = buildRecommendations({ target: TARGET, programs: PROGRAMS, reviews: [review({ id: 1, topic_tags: ['dk:fmcg-beauty'], review_text: 'Market sizing case.' })] });
  equal(tagged.groups.domain[0].topic.contentId, 'fmcg-beauty', 'manual tag');
  check(tagged.groups.case_drill.every((card) => card.label === LABEL_FALLBACK), 'keywords ignored when tagged');

  // No target: general suggestions only.
  const noTarget = buildRecommendations({ target: null, programs: PROGRAMS, reviews: [review({ id: 1, review_text: 'market sizing' })] });
  equal(noTarget.groups.domain.map((card) => card.topic.contentId), ['fmcg-household', 'banking-commercial', 'retail-grocery'], 'no-target domain');
  check(noTarget.groups.case_drill.every((card) => card.label === LABEL_FALLBACK), 'no-target never uses evidence');

  // Domain Knowledge suggestions stay inside the published sectors.
  const published = ['fmcg-dairy', 'fmcg-beauty', 'retail-grocery'];
  buildRecommendations({ target: TARGET, programs: PROGRAMS, reviews: [], availableSectorIds: published }).groups.domain
    .forEach((card) => check(published.includes(card.topic.contentId), `${card.topic.contentId} is not published`));

  // Name matching and keywords.
  check(companiesMatch('Công ty TNHH Unilever Việt Nam', 'Unilever'), 'company aliases');
  check(!companiesMatch('Unilever', 'Vinamilk'), 'different companies');
  check(programsMatch("Future Leaders' Programme (UFLP)", 'UFLP', 'Unilever'), 'program acronym');
  check(programsMatch('Unilever Future Leaders Programme', "Future Leaders' Programme (UFLP)", 'Unilever'), 'program wording');
  check(!programsMatch('UFresh', "Future Leaders' Programme (UFLP)", 'Unilever'), 'different programs');
  const detected = detectTopicTags('Bài test tư duy logic và đọc hiểu tiếng Anh');
  check(detected.includes('apt:logical') && detected.includes('apt:verbal'), 'Vietnamese keywords');
  equal(detectTopicTags('Tôi bắt đầu sửa chữa CV'), [], 'no accent-stripped collisions');

  const errors = validateReviewDraft({ company: '', program: 'UFLP', position: '', review_type: 'interview', review_text: ' ', source_note: '', topic_tags: ['cd:nope'] });
  check(errors.company && errors.review_text && errors.topic_tags, 'form validation');
}

runCandidateReviewTests();
