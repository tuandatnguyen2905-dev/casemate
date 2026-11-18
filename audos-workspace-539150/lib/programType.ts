export type ProgramTypeLabel = 'Internship program' | 'Graduate program' | 'Leadership program';

// programs.program_type is founder-maintained (Internship Program, Graduate
// Program, Leadership Program, Management Trainee). Management Trainee counts
// as a leadership program; an empty cell falls back to the program name.
export function programTypeLabel(programType: unknown, programName: unknown = ''): ProgramTypeLabel | '' {
  const read = (value: unknown) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const classify = (text: string): ProgramTypeLabel | '' => {
    if (/intern|thuc tap|apprentice/.test(text)) return 'Internship program';
    if (/leader|management trainee|\bmt\b/.test(text)) return 'Leadership program';
    if (/graduate|trainee/.test(text)) return 'Graduate program';
    return '';
  };
  return classify(read(programType)) || classify(read(programName));
}
