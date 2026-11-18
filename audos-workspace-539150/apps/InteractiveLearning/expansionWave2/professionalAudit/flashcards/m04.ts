// Audit & Assurance, Module 04 (apps/IndustryKnowledge/auditAssuranceModule04.tsx), lessons 4.1 to 4.5.
// The chapters carry no figures and no named firms, so none appear. Lessons 4.2 and 4.4 show text on a
// different topic than their titles (see source.ts); cards teach the text actually displayed.

import type { FlashcardDeckContent } from '../../types';
import { lessonDeck } from '../../kit';
import { PA_M4 as module } from '../source';

export const PA_M04_DECKS: FlashcardDeckContent[] = [
  lessonDeck({
    module, lessonNo: 1,
    description: 'What decides a firm\u2019s market position and how competitors differ.',
    notes: ['Chapters 2 and 3 (Porter\u2019s forces; licensing and trust barriers) repeat the lesson\u2019s single source item and do not address those topics, so cards sit on chapter 1.'],
    cards: [
      ['position-depends-on-fit', 1, 'M', 'What does a firm\u2019s market position depend on, if not size or brand recognition alone?', 'Reliable fit with a defined client and engagement.', 'A large or well-known firm can still be a poor fit for a given engagement.', 'A firm with a strong brand but no sector experience may be a weaker choice than a specialist.', ['Market position', 'Fit'],
        [[1, 'Market position depends on reliable fit with a defined client and engagement\u2014not firm size or brand recognition alone.']]],
      ['competitors-differ-by', 1, 'C', 'In what ways do competitors differ from one another?', 'Geographic reach, client segments, technical depth, cost structures, authorizations and delivery models.', 'Competitors are not interchangeable.', 'Two firms can serve the same client segment with different cost structures and delivery models.', ['Authorization', 'Delivery model'],
        [[1, 'competitors with different geographic reach, client segments, technical depth, cost structures, authorizations and delivery models.']]],
      ['compare-within-authorization', 1, 'B', 'When comparing firms, within which engagements should the comparison be made?', 'Only engagements a firm is authorized, independent, competent and sufficiently resourced to perform.', 'A comparison is only meaningful where the firm could take the work.', 'A firm not authorized for an engagement type is not a competitor for it.', ['Authorization', 'Independence'],
        [[1, 'Compare firms only within engagements they are authorized, independent, competent and sufficiently resourced to perform.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 2,
    description: 'Quality, reputation and trust as what clients and regulators look at.',
    notes: ['All three chapters are titled about network types, firm categories and Vietnamese institutions, but the text is about quality, reputation and trust. Cards teach that text and sit on chapter 1, where the quality-management definition is shown.'],
    cards: [
      ['reputation-is-sustained', 1, 'M', 'How is reputation built, and what must sustain it?', 'Reputation is accumulated professional performance and ethics. It must be sustained through evidence of quality and effective remediation.', 'Reputation is earned over time and can be lost if quality problems are not fixed.', 'A firm that finds a quality problem and fixes it promptly protects its reputation better than one that leaves it.', ['Reputation', 'Remediation'],
        [[1, 'Reputation is accumulated professional performance and ethics; it must be sustained through evidence of quality and effective remediation.']]],
      ['confidence-signals', 1, 'C', 'Which signals shape the confidence that clients, regulators and stakeholders place in a firm?', 'Quality, technical, regulatory, ethical and delivery signals.', 'Confidence draws on several kinds of evidence.', 'Ethical conduct and delivery record both contribute alongside technical skill.', ['Stakeholder confidence'],
        [[1, 'the quality, technical, regulatory, ethical and delivery signals shaping client, regulator and stakeholder confidence.']]],
      ['quality-management-definition', 1, 'C', 'What is quality management in a firm?', 'Firm and engagement systems for achieving quality objectives, identifying risks, implementing responses, monitoring and remediation.', 'It is a system, not a single control.', 'Monitoring and remediation are part of the definition, not extras added afterwards.', ['Quality management'],
        [[1, 'Firm and engagement systems for achieving quality objectives, identifying risks, implementing responses, monitoring and remediation.']]],
      ['proactive-not-paper', 1, 'D', 'What do IAASB quality standards emphasise, as opposed to policy documents alone?', 'Proactive monitoring, root causes and timely remediation.', 'Having a policy is not enough; the firm must act on what monitoring finds.', 'A firm that investigates why a finding arose is applying root-cause thinking.', ['Root cause', 'Monitoring'],
        [[1, 'IAASB quality standards emphasize proactive monitoring, root causes and timely remediation rather than policy documents alone.']]],
      ['assess-not-prestige', 1, 'B', 'A client wants to pick a firm because of its historical prestige. What should be assessed instead?', 'Current licensing, quality controls, relevant experience, inspection or regulatory context, delivery capacity and independence, not historical prestige alone.', 'Present capability matters more than past standing.', 'The client asks about the firm\u2019s quality controls and capacity for this engagement.', ['Quality controls', 'Capacity'],
        [[1, 'Assess current licensing, quality controls, relevant experience, inspection or regulatory context, delivery capacity and independence\u2014not historical prestige alone.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 3,
    description: 'Benchmarking talent and technology.',
    notes: ['Chapter 3 is titled about benchmarking quality against financial performance, but its text is the technology item; cards on technology sit on chapter 2.'],
    cards: [
      ['talent-capacity-and-quality', 1, 'M', 'Why is talent more than productive capacity?', 'It is also a determinant of quality, and experienced continuity can reduce repeated training and rework.', 'Keeping experienced people matters for quality as well as output.', 'Losing experienced staff means newer staff have to be trained again and work is redone.', ['Talent', 'Continuity'],
        [[1, 'Talent is both productive capacity and a determinant of quality; experienced continuity can reduce repeated training and rework.']]],
      ['headcount-versus-quality', 1, 'B', 'A firm adds headcount quickly. What can still weaken its quality?', 'Supervision, technical development and experienced retention not keeping pace.', 'More people does not mean better work.', 'A firm that doubles its staff but not its supervision risks weaker review.', ['Headcount', 'Supervision'],
        [[1, 'A firm can increase headcount while weakening quality if supervision, technical development and experienced retention do not keep pace.']]],
      ['benchmark-beyond-headcount', 1, 'D', 'What should a talent benchmark compare, rather than headcount alone?', 'Competence, qualifications, staff continuity, workload, coaching, specialist depth and review capacity.', 'Headcount hides how well people are equipped and supported.', 'Two firms with the same headcount can differ in specialist depth and review capacity.', ['Benchmark', 'Specialist depth'],
        [[1, 'Benchmark competence, qualifications, staff continuity, workload, coaching, specialist depth and review capacity rather than headcount alone.']]],
      ['expertise-competition', 1, 'C', 'Which kinds of expertise do firms compete for across career stages?', 'Accounting, audit, technology, valuation, sustainability and sector expertise.', 'Competition for talent spans more than accounting.', 'A firm may compete for technology and sustainability specialists as well as auditors.', ['Sector expertise'],
        [[1, 'competition for accounting, audit, technology, valuation, sustainability and sector expertise across career stages.']]],
      ['technology-advantage-source', 2, 'M', 'Where does a technology advantage come from?', 'From solving meaningful evidence and workflow problems under governance, not from adopting tools for their own sake.', 'A tool earns its place by what it solves.', 'A firm adopts an analytics tool because it addresses a specific evidence problem, and governs its use.', ['Governance', 'Workflow'],
        [[2, 'Technology advantage comes from solving meaningful evidence and workflow problems under governance\u2014not adopting tools for their own sake.']]],
      ['tool-guidance-highlights', 2, 'C', 'What does IAASB guidance highlight about technology tools?', 'Tool fitness, monitoring, documentation, training, output evaluation, confidentiality and professional skepticism.', 'The guidance covers use as well as selection.', 'Evaluating a tool\u2019s output is part of using it responsibly.', ['IAASB', 'Output evaluation'],
        [[2, 'IAASB guidance highlights tool fitness, monitoring, documentation, training, output evaluation, confidentiality and professional skepticism.']]],
      ['test-before-scaling-a-tool', 2, 'B', 'Before scaling a new tool across engagements, what should be tested?', 'Accuracy, completeness, access, localization, data protection, system integration and human review.', 'Testing first limits the damage of an unreliable tool.', 'A firm pilots a tool on one engagement and checks its accuracy before wider use.', ['Data protection', 'Human review'],
        [[2, 'Test accuracy, completeness, access, localization, data protection, system integration and human review before scaling a tool.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 4,
    description: 'What the Vietnamese market rewards and where a firm should compete.',
    notes: ['All three chapters are titled about independence, methodology and talent as success factors, but the text is about competitive dynamics in Vietnam. Cards teach that text and sit on chapter 1.'],
    cards: [
      ['what-the-market-rewards', 1, 'C', 'What does the Vietnamese market reward?', 'Local regulatory expertise and reliable execution, combined where needed with international coordination.', 'Local knowledge and dependable delivery come first.', 'A subsidiary of a foreign group needs both local expertise and coordination with the group.', ['Regulatory expertise', 'Coordination'],
        [[1, 'Vietnam rewards local regulatory expertise and reliable execution combined, where needed, with international coordination.']]],
      ['competing-segments', 1, 'C', 'In which client segments do international networks, domestic firms and smaller practices compete?', 'Statutory, FDI, listed, group and local client segments.', 'The three firm types overlap across several segments.', 'A listed client and a local client are different segments even if the same firms compete for both.', ['FDI', 'Listed'],
        [[1, 'competition among international networks, domestic firms and smaller practices across statutory, FDI, listed, group and local client segments.']]],
      ['parallel-requirements', 1, 'B', 'A subsidiary has local statutory reporting and also overseas group instructions. What can result?', 'Parallel deadlines, frameworks and evidence requirements.', 'Two sets of requirements can apply to the same work.', 'The team plans for two deadlines that follow different frameworks.', ['Group instructions'],
        [[1, 'Local statutory reporting and overseas group instructions can create parallel deadlines, frameworks and evidence requirements.']]],
      ['compete-where-it-fits', 1, 'B', 'Where should a firm compete?', 'Only where authorizations, standards, independence, sector competence, language, technology and staffing fit the mandate.', 'Competing outside what it can deliver risks quality.', 'A firm declines a mandate where it lacks the language or sector competence to do the work.', ['Mandate fit'],
        [[1, 'Compete only where authorizations, standards, independence, sector competence, language, technology and staffing fit the mandate.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 5,
    description: 'The vulnerabilities that arise when commercial pressure meets quality and independence.',
    notes: ['Chapters 2 and 3 repeat the lesson\u2019s single source item under titles about opportunities, threats and strategic choices, which the text only partly answers. Cards sit on chapter 1.'],
    cards: [
      ['most-serious-vulnerability', 1, 'M', 'When does the most serious competitive vulnerability appear?', 'When commercial pressure weakens quality, independence, staffing or evidence.', 'Pressure on results is what turns other risks into serious ones.', 'A firm that cuts staffing to protect margin weakens the evidence it can obtain.', ['Commercial pressure'],
        [[1, 'The most serious vulnerability appears when commercial pressure weakens quality, independence, staffing or evidence.']]],
      ['interacting-risks', 1, 'C', 'Which kinds of risk interact to undermine a firm\u2019s resilience?', 'Quality, people, technology, legal, client and reputation risks.', 'The risks interact rather than standing alone.', 'A technology failure can become a client and reputation problem at the same time.', ['Resilience'],
        [[1, 'interacting quality, people, technology, legal, client and reputation risks that can undermine resilience.']]],
      ['turnover-systems-concentration', 1, 'B', 'Staff turnover, a system failure and a concentrated client occur together. How can they interact?', 'Turnover can increase review effort, system failures can disrupt evidence, and concentrated clients can amplify pressure.', 'Each makes the others harder to handle.', 'A dominant client pressing for speed during a period of turnover strains review.', ['Client concentration', 'Review effort'],
        [[1, 'Staff turnover can increase review effort, while system failures can disrupt evidence and concentrated clients can amplify pressure.']]],
      ['integrate-the-controls', 1, 'B', 'Which controls and plans should be integrated to manage these vulnerabilities?', 'Acceptance, independence, capacity, quality indicators, cyber controls, insurance, collections and continuity planning.', 'The vulnerabilities cross functions, so the responses should be joined up.', 'Acceptance decisions consider capacity and collection risk together.', ['Continuity planning'],
        [[1, 'Integrate acceptance, independence, capacity, quality indicators, cyber controls, insurance, collections and continuity planning.']]],
    ],
  }),
];
