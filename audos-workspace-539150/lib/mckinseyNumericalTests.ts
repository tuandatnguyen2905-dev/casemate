import testAMeta from '../data/mckinsey-pst-a-meta.json';
import testASection1 from '../data/mckinsey-pst-a-section-1.json';
import testASection2 from '../data/mckinsey-pst-a-section-2.json';
import testASection3 from '../data/mckinsey-pst-a-section-3.json';
import testBMeta from '../data/mckinsey-pst-b-meta.json';
import testBSection1 from '../data/mckinsey-pst-b-section-1.json';
import testBSection2 from '../data/mckinsey-pst-b-section-2.json';
import testBSection3 from '../data/mckinsey-pst-b-section-3.json';
import testCMeta from '../data/mckinsey-pst-c-meta.json';
import testCSection1 from '../data/mckinsey-pst-c-section-1.json';
import testCSection2 from '../data/mckinsey-pst-c-section-2.json';
import testCSection3 from '../data/mckinsey-pst-c-section-3.json';
import rafNumericalBundle from '../data/raf-numerical-test.json';
import mathcentreNumericalBundle from '../data/mathcentre-numerical-test.json';
import civilServiceNumericalBundle from '../data/civil-service-numerical-test.json';
import type {
  NumericalQuestion,
  NumericalSourceExhibit,
  NumericalTest,
} from './numericalReasoning';

interface SourceQuestionDraft extends Omit<NumericalQuestion, 'sectionTitle' | 'contextPassages' | 'sourceExhibits'> {
  number: number;
  visiblePassageCount: number;
  visibleExhibitCount: number;
}

interface SourceSection {
  title: string;
  passages: string[];
  exhibits: NumericalSourceExhibit[];
  questions: SourceQuestionDraft[];
}

interface SourceTestMeta extends Omit<NumericalTest, 'questions'> {}

interface SourceTestBundle {
  meta: SourceTestMeta;
  sections: SourceSection[];
}

function assembleSourceTest(meta: SourceTestMeta, sections: SourceSection[]): NumericalTest {
  return {
    ...meta,
    questions: sections.flatMap((section) =>
      section.questions.map((question) => ({
        ...question,
        sectionTitle: section.title,
        contextPassages: section.passages.slice(0, question.visiblePassageCount),
        sourceExhibits: section.exhibits.slice(0, question.visibleExhibitCount),
      })),
    ),
  };
}

let cache: NumericalTest[] | null = null;

export function loadSourcedNumericalTests(): NumericalTest[] {
  if (!cache) {
    cache = [
      assembleSourceTest(testAMeta as unknown as SourceTestMeta, [
        testASection1 as unknown as SourceSection,
        testASection2 as unknown as SourceSection,
        testASection3 as unknown as SourceSection,
      ]),
      assembleSourceTest(testBMeta as unknown as SourceTestMeta, [
        testBSection1 as unknown as SourceSection,
        testBSection2 as unknown as SourceSection,
        testBSection3 as unknown as SourceSection,
      ]),
      assembleSourceTest(testCMeta as unknown as SourceTestMeta, [
        testCSection1 as unknown as SourceSection,
        testCSection2 as unknown as SourceSection,
        testCSection3 as unknown as SourceSection,
      ]),
      ...[
        rafNumericalBundle,
        mathcentreNumericalBundle,
        civilServiceNumericalBundle,
      ].map((bundle) => {
        const sourced = bundle as unknown as SourceTestBundle;
        return assembleSourceTest(sourced.meta, sourced.sections);
      }),
    ];
  }
  return cache;
}
