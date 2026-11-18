export type FitCvEntryView = 'chooser' | 'paste' | 'confirmation' | null;

export type FitCvEntryState = {
  step: number;
  cvReady: boolean;
  chooserVisible: boolean;
  showPaste: boolean;
};

export function resolveFitCvEntryView({ step, cvReady, chooserVisible, showPaste }: FitCvEntryState): FitCvEntryView {
  if (step !== 1) return null;
  if (chooserVisible) return 'chooser';
  if (showPaste && !cvReady) return 'paste';
  return cvReady ? 'confirmation' : 'chooser';
}
