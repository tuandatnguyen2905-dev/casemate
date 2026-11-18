export type SubroleRecommendation = { function: string; subroles: string[]; traits: string[]; evidence: string[]; version: number };

export type MotivationAnswers = {
  problemApproach?: string;
  energizingWork?: string;
  contributionStyle?: string;
};

const SUBROLE_PROFILES: Array<{ match: RegExp; roles: Array<{ name: string; tags: string[] }> }> = [
  { match: /marketing|brand|growth|communication/, roles: [
    { name: 'Performance Marketing / Growth Marketing', tags: ['analytical', 'roi', 'experiment'] },
    { name: 'Brand Marketing', tags: ['creative', 'consumer', 'storytelling'] },
    { name: 'User Acquisition / Digital', tags: ['channel', 'experiment', 'analytical'] },
    { name: 'Trade / Commercial Marketing', tags: ['relationship', 'execution', 'negotiation'] },
  ] },
  { match: /finance|accounting|investment|banking/, roles: [
    { name: 'FP&A', tags: ['analytical', 'structured', 'modelling'] },
    { name: 'Corporate Finance / M&A', tags: ['strategic', 'relationship', 'negotiation'] },
    { name: 'Treasury', tags: ['risk', 'process', 'structured'] },
  ] },
  { match: /supply|logistics|procurement|operations?/, roles: [
    { name: 'Planning', tags: ['analytical', 'systems', 'structured'] },
    { name: 'Logistics / Operations', tags: ['execution', 'process', 'coordination'] },
    { name: 'Procurement', tags: ['negotiation', 'relationship', 'risk'] },
  ] },
  { match: /human resources|\bhr\b|people|talent/, roles: [
    { name: 'Talent Acquisition', tags: ['people', 'relationship', 'persuasion'] },
    { name: 'Learning & Development', tags: ['people', 'creative', 'facilitation'] },
    { name: 'HR Business Partner', tags: ['relationship', 'strategic', 'structured'] },
  ] },
  { match: /sales|commercial|business development|account/, roles: [
    { name: 'Key Account Management', tags: ['relationship', 'negotiation', 'strategic'] },
    { name: 'Field Sales', tags: ['persuasion', 'execution', 'roi'] },
    { name: 'Commercial Excellence', tags: ['analytical', 'process', 'structured'] },
  ] },
  { match: /strategy|consult/, roles: [
    { name: 'Strategy & Planning', tags: ['analytical', 'structured', 'strategic'] },
    { name: 'Management Consulting', tags: ['structured', 'relationship', 'analytical'] },
    { name: 'Business Development', tags: ['persuasion', 'relationship', 'experiment'] },
  ] },
  { match: /product/, roles: [
    { name: 'Product Management', tags: ['consumer', 'structured', 'coordination'] },
    { name: 'Product Analytics', tags: ['analytical', 'roi', 'experiment'] },
    { name: 'Product Operations', tags: ['process', 'execution', 'systems'] },
  ] },
  { match: /manufacturing|production|quality/, roles: [
    { name: 'Process Engineering / Continuous Improvement', tags: ['systems', 'analytical', 'process'] },
    { name: 'Production / Plant Operations', tags: ['execution', 'coordination', 'process'] },
    { name: 'Quality Management', tags: ['risk', 'structured', 'analytical'] },
  ] },
  { match: /legal|compliance|governance|risk/, roles: [
    { name: 'Commercial Legal', tags: ['structured', 'negotiation', 'strategic'] },
    { name: 'Compliance & Governance', tags: ['risk', 'process', 'structured'] },
    { name: 'Risk Advisory', tags: ['risk', 'analytical', 'relationship'] },
  ] },
  { match: /customer experience|customer service|service/, roles: [
    { name: 'Customer Experience Strategy', tags: ['consumer', 'analytical', 'strategic'] },
    { name: 'Service Operations', tags: ['process', 'execution', 'coordination'] },
    { name: 'Customer Success', tags: ['people', 'relationship', 'persuasion'] },
  ] },
  { match: /technology|engineering|data|analytics|digital/, roles: [
    { name: 'Data Analytics', tags: ['analytical', 'structured', 'modelling'] },
    { name: 'Engineering / Technical Delivery', tags: ['systems', 'process', 'experiment'] },
    { name: 'Solutions / Implementation', tags: ['relationship', 'execution', 'coordination'] },
  ] },
  { match: /general management|management trainee|leadership/, roles: [
    { name: 'Business Operations', tags: ['coordination', 'execution', 'structured'] },
    { name: 'Strategy & Planning', tags: ['analytical', 'structured', 'strategic'] },
    { name: 'Commercial / Sales rotation', tags: ['relationship', 'persuasion', 'roi'] },
    { name: 'Project / Program management', tags: ['coordination', 'process', 'people'] },
  ] },
];

const ANSWER_TRAITS: Record<string, string[]> = {
  'Numbers & data': ['analytical', 'modelling'],
  'Talking to people': ['people', 'relationship'],
  'Frameworks & structure': ['structured', 'strategic'],
  'Creative experimentation': ['creative', 'experiment'],
  'Building systems & processes': ['systems', 'process'],
  'Influencing & persuading': ['persuasion', 'relationship'],
  'Analyzing & interpreting data': ['analytical', 'risk'],
  'Creating & storytelling': ['creative', 'storytelling'],
  'Optimizing performance and measurable ROI': ['roi', 'analytical'],
  'Shaping ideas and customer experiences': ['consumer', 'creative'],
  'Running rapid channel and funnel experiments': ['channel', 'experiment'],
  'Coordinating people to execute reliably': ['coordination', 'execution'],
  'Negotiating and building long-term partnerships': ['negotiation', 'relationship'],
  'Managing risk and protecting reliable processes': ['risk', 'process'],
  'Coaching and facilitating other people’s growth': ['facilitation', 'people'],
};

export function recommendSubroles(selectedFunction: string, motivation: MotivationAnswers): SubroleRecommendation | null {
  if (!selectedFunction.trim()) return null;
  const evidence = [motivation.problemApproach, motivation.energizingWork, motivation.contributionStyle].filter(Boolean);
  const profile = SUBROLE_PROFILES.find((entry) => entry.match.test(selectedFunction.toLowerCase()));
  const roles = profile?.roles || [
    { name: 'Analytical & Planning', tags: ['analytical', 'structured', 'strategic'] },
    { name: 'People & Partnership', tags: ['people', 'relationship', 'negotiation'] },
    { name: 'Operations & Delivery', tags: ['process', 'execution', 'coordination'] },
    { name: 'Creative & Innovation', tags: ['creative', 'consumer', 'experiment'] },
  ];
  const pickCount = 4;
  if (evidence.length < 3) {
    return { function: selectedFunction, subroles: roles.slice(0, pickCount).map((role) => role.name), traits: [], evidence, version: 2 };
  }
  const traits = Array.from(new Set(evidence.flatMap((answer) => ANSWER_TRAITS[answer] || [])));
  const ranked = roles
    .map((role, index) => ({ ...role, index, score: role.tags.reduce((sum, tag) => sum + (traits.includes(tag) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  return { function: selectedFunction, subroles: ranked.slice(0, pickCount).map((role) => role.name), traits, evidence, version: 2 };
}
