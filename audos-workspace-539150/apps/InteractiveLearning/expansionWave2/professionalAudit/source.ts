// Stable source mapping for Audit & Assurance (catalog id `professional-audit`).
//
// The reader's chapters are produced by apps/IndustryKnowledge/auditAssuranceCore.tsx
// (`standardizeAuditLessons`): a table of canonical chapter titles is laid over the module file's
// source items. Where a lesson has more titles than source items, the extra chapters repeat the
// nearest item's text with a "focuses specifically on <dimension>" suffix, and titles listed in
// AUDIT_DETAILS get their own authored text. The alignment flag records, for every chapter, whether
// its displayed text answers its own title (see ../types.ts). It is an editorial reading of the text,
// recorded so that content authored against a flagged chapter can be re-checked if the source is fixed.

import type { KnownHold, SourceModule } from '../types';

type LessonInput = [lessonTitle: string, chapterTitles: string[], alignment: string, sourceIds: string[]];

const FLAG = { A: 'aligned', D: 'authored', W: 'weak', X: 'mismatch', H: 'held' } as const;

function define(no: number, label: string, readAtSha256: string, lessons: LessonInput[]): SourceModule & { lessonSources: string[][] } {
  const n = String(no).padStart(2, '0');
  return {
    moduleKey: `PROFESSIONAL_AUDIT_MODULE${n}`,
    moduleId: `pa-m${no}`,
    moduleLabel: label,
    file: `apps/IndustryKnowledge/auditAssuranceModule${n}.tsx`,
    readAtSha256,
    lessons: lessons.map(([lessonTitle, titles, flags], index) => ({
      lessonTitle,
      lessonId: `pa-m${no}-l${index + 1}`,
      chapters: titles.map((title, chapter) => ({ title, alignment: FLAG[flags[chapter] as keyof typeof FLAG] })),
    })),
    lessonSources: lessons.map((lesson) => lesson[3]),
  };
}

const hb = 'iaasbHandbook', qm = 'iaasbQuality', eth = 'iesba', law = 'vnAuditLaw', std = 'vnStandards', tech = 'technology', g600 = 'isa600', oth = 'otherEngagements', data = 'vnData';

export const PA_M1 = define(1, 'Module 01 \u00b7 Industry Context', '67e1ff6ba64178914e667b921d3ca7b8c04a343a584bfb5ee6b57c2b642e4086', [
  ['Industry Definition & Scope', ['What Is the Audit & Assurance Industry?', 'What Makes External Audit Unique?', 'Where Does Audit Begin and End?', 'Understanding Audit and Assurance Engagements', "Who Are Audit and Assurance's Users and Stakeholders?"], 'AWDAW', [hb, oth, 'aups', law, std, g600]],
  ['Industry History & Development', ['How Did Independent Auditing Develop?', 'How Did Professional Standards and Oversight Evolve?', 'How Did Risk-Based Auditing and Quality Management Develop?', 'How Have Audit and Assurance Developed in Vietnam?'], 'AWWW', [qm, hb, law, std]],
  ['Global Market Overview', ['How Is the Global Audit Industry Structured?', 'How Are Audit Markets and Firms Measured?', 'Which Entities and Reporting Needs Drive Demand?', 'Who Are the Major Audit Provider Types?', 'How Do Global Networks and Local Member Firms Operate?'], 'AXAAW', [hb, eth, law]],
  ['Vietnam Market Overview', ['What Does Vietnam\'s Audit and Assurance Market Look Like?', 'Which Entities and Engagements Drive Audit Demand?', 'Who Are the Key Audit and Professional Institutions?', 'How Are Audits Regulated and Delivered in Vietnam?', "What Opportunities and Constraints Shape Vietnam's Audit Market?"], 'AAWWW', [law, std, g600]],
  ['Industry Drivers & External Factors', ['How Do Capital Markets and Corporate Complexity Affect Audit Demand?', 'Why Do Public Interest, Regulation and Trust Matter?', 'How Are Technology and Data Changing Audit Work?', 'How Are Talent and Reporting Expectations Evolving?', 'What External Risks and Opportunities Shape Audit Firms?'], 'AWWWA', ['issa5000', tech, eth, law, std]],
]);

export const PA_M2 = define(2, 'Module 02 \u00b7 Value Chain', 'd722282551758759ef8fdb9e69358845268f8b6ca2ffaa7dfd72c61a2bdf5992', [
  ['Value Chain Overview', ['How Does an External Audit Engagement Work?', 'Who Participates in the Audit Engagement Lifecycle?', 'How Do Information, Evidence, Decisions and Risk Flow?'], 'AWW', [qm, hb, std]],
  ['Upstream Activities', ['How Are Clients Accepted and Independence Evaluated?', 'How Are Engagement Terms, Strategy and Audit Plans Defined?', 'How Are Materiality and Performance Materiality Applied?'], 'AAD', [eth, hb, law, std]],
  ['Midstream Activities', ['How Are Risks of Material Misstatement Assessed?', 'How Are Controls, Assertions and Audit Procedures Linked?', 'How Are Sampling, Evidence and Documentation Evaluated?'], 'DWD', ['isa315', hb, std, qm]],
  ['Downstream Activities', ['How Is an Audit Completed and Reviewed?', 'How Are Audit Opinions and Other Report Elements Distinguished?', 'How Are Findings Communicated Without Assuming Management Responsibility?'], 'ADA', [hb, law, std]],
  ['Inputs, Outputs & Value Creation', ['What Resources and Evidence Support an Audit?', 'How Do Professional Judgment, Skepticism and Quality Management Create Value?', 'How Are Monitoring, Remediation and Professional Development Sustained?'], 'WAA', [qm, law, std]],
  ['Global vs. Local Value Chain', ['How Do Global Audit Networks and Group Audits Operate?', 'How Is Audit Delivery Adapted to Vietnam?', 'How Do International Standards and Vietnam-Adopted Requirements Interact?'], 'AAH', [g600, eth, law, std, data]],
]);

export const PA_M3 = define(3, 'Module 03 \u00b7 Business Models & Economics', 'b87604b0ae943fe544aecabc3bcb1dc195be7d5d57d50b0774cb9b06093848b2', [
  ['Industry Business Models', ['How Do Independent Audit Firms Make Money?', 'How Do Partnerships, Networks and Local Member Firms Differ?', 'How Do Specialist Assurance and Permitted Adjacent Services Fit?'], 'XAX', [eth, qm, law]],
  ['Products, Services & Segmentation', ['How Are Financial Audit and Other Assurance Services Segmented?', 'How Do Review, Agreed-Upon Procedures and Advisory Differ?', 'Which Financial Reporting Areas Commonly Drive Audit Work?'], 'XXD', [qm, eth, law, std]],
  ['Customer Segments & Needs', ['Who Purchases or Requires Audit and Assurance?', 'How Do Public-Interest, Private, Group and Voluntary Needs Differ?', 'How Do Governance, Regulators and Intended Users Evaluate Audit?'], 'XXX', [qm, tech, law, std]],
  ['Revenue Streams & Cost Structure', ['How Do Audit Engagements Generate Revenue?', 'What Determines Audit Delivery Costs and Profitability?', 'Which KPIs Explain Audit-Firm Performance?'], 'DDD', [tech, qm, data, std]],
  ['Engagement Economics & Delivery Profitability', ['How Do Staffing, Leverage and Chargeable Hours Shape Economics?', 'How Do Utilization, Billing Rates and Realization Affect Revenue?', 'Why Must Audit Quality Indicators Remain Separate From Financial KPIs?'], 'XXX', [eth, qm, law, std]],
  ['Industry Ecosystem & Stakeholders', ['Who Participates in the Audit and Assurance Ecosystem?', 'How Do Independence, Ethics and Conflicts Shape Services?', 'How Do Regulators, Professional Bodies and Technology Providers Shape Delivery?'], 'WAX', [eth, law, std]],
]);

export const PA_M4 = define(4, 'Module 04 \u00b7 Competitive Landscape', '9fc7449eb03de00e43c891ca06944d9e0da432731da053c940483cf563c3736f', [
  ['Industry Competition Structure', ['How Competitive Is Audit & Assurance?', "How Do Porter's Five Forces Apply to Audit Firms?", 'What Creates Licensing, Trust and Capability Barriers?'], 'AWW', [hb, eth, law]],
  ['Key Industry Players', ['Who Are the Major Global Audit Network Types?', 'How Do Big Four, Mid-Tier, Specialist and Local Firms Differ?', "Which Firms and Institutions Shape Vietnam's Audit Market?"], 'XXX', [qm, eth, law, std]],
  ['Competitor Benchmarking', ['How Should Audit Firms Be Compared?', 'How Do Talent, Sector Expertise, Methodology and Technology Differ?', 'How Should Audit Quality and Financial Performance Be Benchmarked?'], 'AWX', [qm, tech, data, law, std]],
  ['Key Success Factors', ['Why Do Independence, Expertise and Professional Skepticism Matter?', 'How Do Methodology, Evidence and Quality Management Create Trust?', 'How Do Talent, Technology and Client Governance Support Sustainable Growth?'], 'XXX', [law, std, g600]],
  ['Industry SWOT & Strategic Challenges', ["What Are the Industry's Main Strengths and Weaknesses?", 'What Opportunities and Threats Shape Audit and Assurance?', 'What Strategic Choices Must Audit Firms Make?'], 'AWW', [qm, eth, tech, law, data]],
]);

export const PA_M5 = define(5, 'Module 05 \u00b7 Outlook & Trends', '298a248c284b40e546a245e33c7ee040288c08d63ae0bbfc11fbbc899e8f7144', [
  ['Client Trends', ['How Are Corporate Reporting and Stakeholder Expectations Changing?', 'Why Are Audit Quality and Transparency More Important?', 'How Are Talent and Client Collaboration Evolving?'], 'XWA', [tech, qm, law, std]],
  ['Technology & Innovation Trends', ['How Are Data Analytics and Automation Changing Audit Procedures?', 'How Are Continuous Monitoring and Technology-Enabled Evidence Developing?', 'What Role Can AI Play\u2014and Not Play\u2014in Audit Judgment?'], 'AAX', [tech, hb, qm, data, oth, std]],
  ['Market & Delivery Model Trends', ['How Are Group Audits and Cross-Border Delivery Evolving?', 'How Are Shared Delivery and Specialist Models Developing?', 'How Are Audit Firms Expanding Assurance Capabilities?'], 'AWX', [g600, eth, law, std, data]],
  ['Regulatory & Sustainability Trends', ['How Are Audit Standards, Ethics and Quality Requirements Evolving?', 'How Is Sustainability and Non-Financial Assurance Developing?', 'How Are Cybersecurity, Data and Technology Assurance Evolving?'], 'AAX', ['issa5000', oth, eth, law, qm, 'fraud', 'goingConcern', std]],
  ['Growth Outlook & Strategic Opportunities', ['What Factors Will Drive Future Audit and Assurance Demand?', 'Where Are New Opportunities Emerging in Vietnam and Global Markets?', 'How Should Audit Firms Position Themselves?'], 'AWW', [qm, tech, 'issa5000', eth, law, std]],
]);

export const PROFESSIONAL_AUDIT_SOURCE = [PA_M1, PA_M2, PA_M3, PA_M4, PA_M5] as const;

/**
 * Holds in apps/IndustryKnowledge/reviewHolds.ts for this curriculum when it was read (2026-11-08).
 * The live registry is consulted instead whenever the test can import it.
 */
export const PROFESSIONAL_AUDIT_KNOWN_HOLDS: KnownHold[] = [
  { id: 'REV-P0-10', moduleKey: 'PROFESSIONAL_AUDIT_MODULE02', lesson: 'Global vs. Local Value Chain', chapter: 'How Do International Standards and Vietnam-Adopted Requirements Interact?' },
];

/** Source defects found while mapping. Reported, not edited: the curriculum files are out of scope for this task. */
export const PROFESSIONAL_AUDIT_SOURCE_DEFECTS = [
  'Chapter titles come from a canonical title table that is laid over the legacy items by index. 23 of the 90 chapters carry text on a different topic than their title (alignment "mismatch"); 26 more only partly answer their title ("weak"); 31 are aligned, 9 are authored detail entries and 1 is held.',
  'Entire lessons whose displayed text is about a different subject than the lesson title: Module 03 "Customer Segments & Needs" (text: staffing and leverage), Module 03 "Engagement Economics & Delivery Profitability" (text: client portfolio and specialisation), Module 04 "Key Industry Players" (text: quality and reputation), Module 04 "Key Success Factors" (text: Vietnam competitive dynamics).',
  'Module 02 "Midstream Activities": the second legacy item (technical evaluation, consultation and review) is displayed in no chapter, because its target chapter title has an AUDIT_DETAILS entry that overrides it.',
  'Module 05 "Technology & Innovation Trends" chapter 3 is titled as an AI question but shows the cybersecurity and IT-controls item; Module 05 "Regulatory & Sustainability Trends" chapter 3 is titled as a cybersecurity question but shows sustainability text.',
];
