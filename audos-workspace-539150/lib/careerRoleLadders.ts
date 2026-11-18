/** Typical in-department progression labels for Target Fit role-path hints (illustrative, not employer-specific). */

const DEFAULT_LADDER = ['Associate / Executive', 'Senior specialist', 'Team lead / Manager'];

const LADDERS: Record<string, string[]> = {
  'Field Sales': ['Sales executive', 'Territory supervisor', 'Regional sales manager'],
  'Commercial Excellence': ['Commercial analyst', 'Category / channel manager', 'Commercial excellence lead'],
  'Key Account Management': ['Account executive', 'Key account manager', 'National accounts lead'],
  'Performance Marketing / Growth Marketing': ['Growth analyst', 'Performance marketer', 'Growth lead'],
  'Brand Marketing': ['Brand assistant', 'Brand manager', 'Brand director'],
  'FP&A': ['Financial analyst', 'FP&A manager', 'Finance business partner'],
  'Strategy & Planning': ['Business analyst', 'Strategy manager', 'Head of strategy'],
  'Product Management': ['Associate product manager', 'Product manager', 'Senior product lead'],
  'Data Analytics': ['Data analyst', 'Analytics manager', 'Head of analytics'],
  'Talent Acquisition': ['Recruiter', 'TA manager', 'Talent acquisition lead'],
  'Planning': ['Demand planner', 'Supply planning manager', 'Planning director'],
};

export function careerLadderForRole(roleTitle: string): string[] {
  const direct = LADDERS[roleTitle];
  if (direct) return direct;
  const key = Object.keys(LADDERS).find((name) => roleTitle.toLowerCase().includes(name.toLowerCase().split(' ')[0]));
  return key ? LADDERS[key] : DEFAULT_LADDER;
}

export function roadmapsForSubroles(subroles: string[]) {
  return subroles.map((role) => ({ role, steps: careerLadderForRole(role) }));
}
