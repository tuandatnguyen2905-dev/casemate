// Audit & Assurance, Module 05 (apps/IndustryKnowledge/auditAssuranceModule05.tsx), lessons 5.1 to 5.5.
// The chapters also state international effective dates for standards and a statement about when a final
// global standard becomes local law. Neither is used: they are regulatory claims whose Vietnam status the
// curriculum itself says must be verified. Cards teach only the stable, non-legal points.

import type { FlashcardDeckContent } from '../../types';
import { lessonDeck } from '../../kit';
import { PA_M5 as module } from '../source';

export const PA_M05_DECKS: FlashcardDeckContent[] = [
  lessonDeck({
    module, lessonNo: 1,
    description: 'How automation changes the skills audit professionals need.',
    notes: ['Chapter 1 is titled about corporate reporting expectations but shows the talent item; cards sit on chapter 3 (talent and collaboration), plus chapter 2 for the professional skepticism definition it displays.'],
    cards: [
      ['future-capability', 3, 'C', 'What does future audit capability combine?', 'Accounting and assurance foundations with analytics, technology, communication and judgment.', 'Technology adds to the foundations; it does not replace them.', 'A graduate needs accounting basics and also analytics and communication skills.', ['Analytics', 'Judgment'],
        [[3, 'Future capability combines accounting and assurance foundations with analytics, technology, communication and judgment.']]],
      ['automation-task-mix', 3, 'M', 'How does automation change the task mix, and what grows more important?', 'It changes the mix of tasks while increasing the importance of skepticism, systems understanding, exception investigation, supervision and leadership.', 'Less routine work leaves more of the judgment-heavy work.', 'As data extraction is automated, investigating exceptions becomes a larger share of the work.', ['Automation', 'Exception investigation'],
        [[3, 'how automation changes task mix while increasing the importance of skepticism, systems understanding, exception investigation, supervision and leadership.']]],
      ['routine-work-automated', 3, 'B', 'Routine work is automated. What does that not remove the need for?', 'Experienced professionals who assess complex judgments and contradictory evidence.', 'Judgment on difficult matters stays with people.', 'A tool produces the analysis, and an experienced auditor decides what a contradictory result means.', ['Contradictory evidence'],
        [[3, 'Automating routine work does not remove the need for experienced professionals to assess complex judgments and contradictory evidence.']]],
      ['skills-to-develop', 3, 'B', 'Which skills should a firm develop while planning sustainable peak-season workloads?', 'Technical, digital, language, sector, coaching and leadership skills.', 'Skills development has to fit within realistic workloads.', 'A firm schedules coaching outside the busiest weeks.', ['Coaching', 'Leadership'],
        [[3, 'Develop technical, digital, language, sector, coaching and leadership skills while planning sustainable peak-season workloads.']]],
      ['professional-skepticism', 2, 'C', 'What is professional skepticism?', 'A questioning mind and critical assessment of evidence, including contradictory information and potential bias.', 'It means testing evidence rather than accepting it.', 'An auditor who meets an inconsistent explanation keeps questioning rather than accepting the first answer.', ['Professional skepticism'],
        [[2, 'A questioning mind and critical assessment of evidence, including contradictory information and potential bias.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 2,
    description: 'What analytics, AI, continuous monitoring and digital assurance can and cannot do.',
    notes: ['Chapter 3 is titled as a question about AI in audit judgment, but it shows the cybersecurity and IT-controls item; its cards teach that item. The AI item is shown in chapter 1.'],
    cards: [
      ['ai-analytics-limits', 1, 'D', 'What can AI and analytics improve, and what do they not replace?', 'They can improve risk identification and efficiency, but they do not replace evidence evaluation, skepticism or responsibility for the conclusion.', 'The tools help the auditor and leave responsibility with the auditor.', 'An anomaly flagged by a tool still has to be investigated and judged by a person.', ['Analytics', 'Responsibility'],
        [[1, 'AI and analytics can improve risk identification and efficiency but do not replace evidence evaluation, skepticism or responsibility for the conclusion.']]],
      ['analytics-uses', 1, 'C', 'Which kinds of work do AI and analytics support under controlled methodologies?', 'Population analysis, anomaly detection, extraction, summaries, workflow and review support.', 'The uses are supporting tasks inside a controlled method.', 'Anomaly detection narrows a whole population to the items worth a closer look.', ['Anomaly detection'],
        [[1, 'population analysis, anomaly detection, extraction, summaries, workflow and review support under controlled methodologies.']]],
      ['automation-bias-warning', 1, 'C', 'What does IAASB warn against when tools produce outputs, and what does it require?', 'It warns against automation bias and overreliance, and requires critical assessment of information and outputs.', 'A tool\u2019s output is not accepted without checking.', 'A team tests a summary produced by a tool before relying on it.', ['Automation bias', 'Overreliance'],
        [[1, 'IAASB warns against automation bias and overreliance and requires critical assessment of information and outputs.']]],
      ['safe-tool-use', 1, 'B', 'What should accompany the use of an approved tool?', 'Data controls, validation, human verification, documentation, limitations and incident response.', 'Using a tool safely takes more than switching it on.', 'The team records what the tool cannot do as part of using it.', ['Validation', 'Human verification'],
        [[1, 'Use approved, secure tools with data controls, validation, human verification, documentation, limitations and incident response.']]],
      ['monitoring-vs-assurance', 2, 'D', 'How does continuous monitoring compare with a properly scoped statutory audit or assurance engagement?', 'More frequent monitoring improves visibility, but it is not automatically equivalent to a properly scoped audit or assurance engagement.', 'Frequency is not the same as assurance.', 'A dashboard that updates daily does not by itself give assurance on the statements.', ['Continuous monitoring'],
        [[2, 'More frequent monitoring improves visibility but is not automatically equivalent to a properly scoped statutory audit or assurance engagement.']]],
      ['alert-vs-assurance', 2, 'B', 'An automated alert flags an exception early. What does formal assurance still require?', 'Criteria, evidence, scope and reporting under applicable standards.', 'An alert is a signal; assurance is a defined engagement.', 'The alert prompts an investigation, and the assurance work follows its own scope and reporting.', ['Exception alert'],
        [[2, 'An automated alert can identify an exception sooner, but formal assurance still requires criteria, evidence, scope and reporting under applicable standards.']]],
      ['keep-roles-distinct', 2, 'D', 'Which four activities should contracts and communications keep distinct?', 'Management monitoring, internal audit, controls testing and independent external assurance.', 'Blurring them can lead a reader to expect assurance that is not given.', 'A contract says clearly whether it covers monitoring or independent assurance.', ['Internal audit', 'Controls testing'],
        [[2, 'Distinguish management monitoring, internal audit, controls testing and independent external assurance in contracts and communication.']]],
      ['digital-assurance-bounded', 3, 'M', 'What must digital assurance conclusions stay bounded by?', 'A defined scope, suitable criteria, evidence and practitioner competence.', 'A conclusion cannot reach beyond what was scoped and evidenced.', 'A conclusion about one system cannot be stretched to cover systems outside the scope.', ['Scope', 'Criteria'],
        [[3, 'Digital assurance conclusions must remain bounded by defined scope, suitable criteria, evidence and practitioner competence.']]],
      ['controls-assurance-limit', 3, 'C', 'What does a controls assurance engagement not guarantee?', 'Immunity from every cyber threat or future incident.', 'It speaks to controls in scope, not to the future.', 'A clean controls report does not mean no incident can happen later.', ['Controls assurance'],
        [[3, 'A controls assurance engagement does not guarantee immunity from every cyber threat or future incident.']]],
      ['define-for-digital-assurance', 3, 'B', 'What should be defined for a digital assurance engagement?', 'The system, period, control objective, criteria, locations, providers, limitations, specialist role, evidence and data-protection duties.', 'Defining these upfront sets the boundary of the conclusion.', 'The team records which locations and providers are inside the engagement.', ['Control objective', 'Data protection'],
        [[3, 'Define system, period, control objective, criteria, locations, providers, limitations, specialist role, evidence and data-protection duties.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 3,
    description: 'What makes group audits across borders work.',
    notes: ['Chapters 2 and 3 repeat the lesson\u2019s single source item under titles about shared delivery and expanding assurance capabilities, which the text does not address. Cards sit on chapter 1.'],
    cards: [
      ['group-quality-needs', 1, 'M', 'What does group audit quality require, and what is not enough on its own?', 'Coordinated risk assessment, clear responsibilities and evaluation of component work. Geographic coverage alone is insufficient.', 'Spreading across locations does not make a group audit good.', 'A firm present in every country still needs to coordinate its risk assessment across them.', ['Group audit', 'Component'],
        [[1, 'Group quality requires coordinated risk assessment, clear responsibilities and evaluation of component work; geographic coverage alone is insufficient.']]],
      ['group-complexity-sources', 1, 'C', 'What makes a group audit complex?', 'Components across jurisdictions, frameworks, languages, deadlines and data restrictions.', 'Complexity comes from differences between the components.', 'Components in different countries may report under different frameworks and deadlines.', ['Jurisdiction', 'Framework'],
        [[1, 'audits of groups with components across jurisdictions, frameworks, languages, deadlines and data restrictions.']]],
      ['isa600-strengthens', 1, 'C', 'What does ISA 600 (Revised) strengthen in group audits?', 'Two-way communication, professional skepticism, planning, performance and documentation.', 'The standard tightens how the group team works with components.', 'Component auditors report back, not only receive instructions.', ['ISA 600', 'Two-way communication'],
        [[1, 'ISA 600 (Revised) strengthens two-way communication, professional skepticism, planning, performance and documentation in group audits.']]],
      ['align-local-and-group', 1, 'B', 'Local statutory work meets group instructions. What should be aligned, and what assessed?', 'Local statutory work and group instructions should be aligned, while assessing component competence, independence, evidence, secure data transfer and accountability.', 'Both sets of work must fit together.', 'The team checks a component\u2019s independence before relying on its work.', ['Group instructions', 'Secure data transfer'],
        [[1, 'Align local statutory work and group instructions while assessing component competence, independence, evidence, secure data transfer and accountability.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 4,
    description: 'Where quality management and sustainability assurance are heading.',
    notes: ['Chapter 3 is titled about cybersecurity and technology assurance but shows sustainability text; no card sits there. Effective dates for standards and the statement about when a final global standard is local law are not used.'],
    cards: [
      ['quality-management-direction', 1, 'M', 'In which direction is quality management moving?', 'Toward proactive risk identification, root-cause analysis and evidence that remediation works.', 'The aim is to show that fixes actually work.', 'A firm tests whether a remediation reduced the problem rather than assuming it did.', ['Root-cause analysis', 'Remediation'],
        [[1, 'Quality management is moving toward proactive risk identification, root-cause analysis and evidence that remediation works.']]],
      ['translate-new-requirements', 1, 'C', 'Into what do firms translate new audit, ethics, quality and reporting requirements?', 'Methods, training, engagement execution, monitoring and remediation.', 'A requirement has to reach the work to have any effect.', 'A new requirement becomes a training session and a change to the review method.', ['Methods', 'Training'],
        [[1, 'translating new audit, ethics, quality and reporting requirements into methods, training, engagement execution, monitoring and remediation.']]],
      ['sustainability-opportunity-depends', 2, 'M', 'What does opportunity in sustainability assurance depend on?', 'Actual reporting requirements, suitable criteria, reliable data and qualified practitioners, not generic ESG interest.', 'Interest alone does not create an engagement.', 'A firm needs criteria and reliable data before offering assurance on emissions.', ['Suitable criteria', 'Reliable data'],
        [[2, 'Opportunity depends on actual reporting requirements, suitable criteria, reliable data and qualified practitioners\u2014not generic ESG interest.']]],
      ['sustainability-scope', 2, 'C', 'What does sustainability assurance cover, and how does the information differ from the financial kind?', 'Environmental, social, governance and other sustainability information, with different data, boundaries, estimates and expertise.', 'The subject matter is broader and needs different expertise.', 'Emissions data raises different boundary questions from a financial balance.', ['Boundary', 'Emissions'],
        [[2, 'assurance over environmental, social, governance and other sustainability information with different data, boundaries, estimates and expertise.']]],
      ['verify-before-promising', 2, 'B', 'Before promising a sustainability assurance conclusion, what must be verified?', 'Whether, when and under which framework sustainability reporting or assurance applies.', 'A conclusion cannot be promised before the basis is known.', 'The team confirms the framework in use before agreeing the engagement terms.', ['Framework'],
        [[2, 'Verify whether, when and under which framework sustainability reporting or assurance applies before promising a conclusion.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 5,
    description: 'What strong positions combine and when to enter an adjacent assurance area.',
    notes: ['Chapters 2 and 3 repeat the lesson\u2019s single source item with a different focus; cards sit on chapter 1.'],
    cards: [
      ['strong-positions-combine', 1, 'C', 'What do strong long-term positions combine?', 'Competence, independent judgment, quality management, controlled technology and reliable delivery.', 'No one element is enough.', 'A firm with advanced tools but weak independent judgment does not have a strong position.', ['Quality management', 'Controlled technology'],
        [[1, 'Strong long-term positions combine competence, independent judgment, quality management, controlled technology and reliable delivery.']]],
      ['selective-growth-areas', 1, 'C', 'Alongside recurring audit demand, where does the chapter see selective growth?', 'In sustainability, controls and technology assurance, amid regulation, talent, investment and liability constraints.', 'Growth is selective because it comes with constraints.', 'Controls assurance can be a growth area, but it needs talent and investment.', ['Selective growth', 'Liability'],
        [[1, 'recurring audit demand and selective growth in sustainability, controls and technology assurance amid regulation, talent, investment and liability constraints.']]],
      ['enter-adjacent-area', 1, 'B', 'When should a firm enter an adjacent assurance area?', 'Only when criteria, market demand, competence, independence, quality systems and economics are credible.', 'All six conditions have to hold, not just demand.', 'A firm sees demand but lacks criteria and competence, so it does not enter yet.', ['Adjacent area', 'Economics'],
        [[1, 'A firm should enter an adjacent assurance area only when criteria, market demand, competence, independence, quality systems and economics are credible.']]],
      ['staged-capability-investment', 1, 'B', 'How should a firm build a new capability?', 'Through staged capability investment, with current standards, engagement acceptance criteria, leading quality signals and stop-or-scale decisions.', 'Stages allow the firm to stop or scale as evidence comes in.', 'The firm pilots the capability and decides after the pilot whether to stop or scale.', ['Stop-or-scale decision'],
        [[1, 'Use staged capability investment, current standards, engagement acceptance criteria, leading quality signals and stop-or-scale decisions.']]],
    ],
  }),
];
