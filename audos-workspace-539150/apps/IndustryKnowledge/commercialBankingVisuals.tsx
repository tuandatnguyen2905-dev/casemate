import { VisualView } from './fashionVisualKit';
import { useLearningLanguage } from './localization/learningLanguage';
import { localizedVisualSpec } from './localization/visualLocalization';
import { CB_M1_VISUALS } from './commercialBankingM01VisualSpecs';
import { CB_M2_VISUALS } from './commercialBankingM02VisualSpecs';
import { CB_M3_VISUALS } from './commercialBankingM03VisualSpecs';
import { CB_M4_VISUALS } from './commercialBankingM04VisualSpecs';
import { CB_M5_VISUALS } from './commercialBankingM05VisualSpecs';
import type { ChapterVisual } from './chapterVisualText';
import type { CommercialBankingVisualKind } from './commercialBankingCore';

export type { CommercialBankingVisualKind } from './commercialBankingCore';

const COMMERCIAL_BANKING_VISUALS: Record<string, ChapterVisual> = {
  ...CB_M1_VISUALS,
  ...CB_M2_VISUALS,
  ...CB_M3_VISUALS,
  ...CB_M4_VISUALS,
  ...CB_M5_VISUALS,
};

/** `spec` stays the English spec so anything reading the element's props sees the source; VI swaps display text only. */
function CommercialBankingVisual({ kind, spec }: { kind: string; spec: ChapterVisual['spec'] }) {
  const [language] = useLearningLanguage();
  const shown = language === 'vi' ? localizedVisualSpec(kind, spec) ?? spec : spec;
  return <VisualView spec={shown} />;
}

export function renderCommercialBankingVisual(kind: CommercialBankingVisualKind) {
  const visual = COMMERCIAL_BANKING_VISUALS[kind];
  return visual ? <CommercialBankingVisual kind={kind} spec={visual.spec} /> : null;
}
