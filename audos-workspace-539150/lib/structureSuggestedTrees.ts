import type { LibraryQuestion } from './skillQuestionLibrary';
import { structuresEasySuggestedTree } from './structuresEasyBank';
import { guideToSuggestedTree, structureAnswerGuideFor } from './structureFrameworkGuides';

export type CoverageStatus = 'covered' | 'partial' | 'missed';

export interface SuggestedTreeNode {
  id: string;
  text: string;
  test?: string;
  children?: SuggestedTreeNode[];
}

export interface SuggestedStructureTree {
  caseId: string;
  root: SuggestedTreeNode;
  branches: SuggestedTreeNode[];
  explanations: Array<{ branchId: string; title: string; explanation: string }>;
  investigateFirst: string;
}

type BranchDraft = {
  text: string;
  explanation: string;
  children: Array<{ text: string; test: string }>;
};

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'branch';
}

function companyFor(question: LibraryQuestion): string {
  const title = String(question.title || '').split(/\s[-–—]\s/)[0]
    .replace(/\s+(?:Profit Decline|Profitability|Market Entry|Growth Strategy|Operations Bottleneck|Operations|Acquisition Due Diligence|Structure).*$/i, '')
    .trim();
  return title || 'the client';
}

function evidenceLabel(question: LibraryQuestion): string {
  const exhibits = question.exhibits?.length ? question.exhibits : question.exhibit ? [question.exhibit] : [];
  if (!exhibits.length) return 'case prompt, customer evidence, and unit economics';
  return exhibits.slice(0, 2).map((exhibit, index) => `Exhibit ${index + 1} (${exhibit.title})`).join(' and ');
}

function archetypeFor(question: LibraryQuestion): string {
  const text = `${question.title} ${question.question} ${question.businessProblem || ''} ${question.drillType || ''}`.toLowerCase();
  if (/acquisition|due diligence|m&a|merger|target company/.test(text)) return 'acquisition';
  if (/market entry|enter(?:ing)? a new|launch in|new market/.test(text)) return 'entry';
  if (/profit|margin|cost decline|earnings/.test(text)) return 'profit';
  if (/bottleneck|operations|service level|capacity|process/.test(text)) return 'operations';
  if (/growth|double revenue|expand/.test(text)) return 'growth';
  if (/pricing|price/.test(text)) return 'pricing';
  if (/competitive|competitor|response/.test(text)) return 'competition';
  if (/product launch|new product/.test(text)) return 'launch';
  return 'decision';
}

function draftsFor(question: LibraryQuestion): { branches: BranchDraft[]; investigateFirst: string } {
  const company = companyFor(question);
  const industry = question.industry || 'the client’s industry';
  const evidence = evidenceLabel(question);
  const archetype = archetypeFor(question);

  if (archetype === 'profit') return {
    branches: [
      {
        text: 'Revenue performance',
        explanation: 'Separates price, volume, and mix so the team can locate whether the decline comes from demand, monetisation, or portfolio shifts.',
        children: [
          { text: `Has ${company} lost volume or market share by customer, product, channel, or geography?`, test: `volume trend, market share, and segment mix in ${evidence}` },
          { text: 'Have realised prices, discounts, or product mix reduced revenue per unit?', test: 'net price, discount rate, and revenue per unit by segment' },
        ],
      },
      {
        text: 'Variable costs and contribution',
        explanation: 'Tests costs that move with each unit before fixed overhead is blamed, preserving the profit equation and avoiding overlap.',
        children: [
          { text: `Which input, fulfilment, service, or channel costs have changed for ${company}?`, test: 'unit-cost bridge and supplier or channel rates' },
          { text: 'Which products or customers now create the weakest contribution margin?', test: 'contribution margin by product, customer, and channel' },
        ],
      },
      {
        text: 'Fixed costs and operating model',
        explanation: 'Checks whether capacity, staffing, facilities, or overhead grew faster than the business and whether utilisation has fallen.',
        children: [
          { text: 'Which fixed-cost lines explain the change, and were they planned investments or leakage?', test: 'fixed-cost bridge, headcount, and overhead trend' },
          { text: `Is ${company} carrying excess capacity or duplicated activity in ${industry}?`, test: 'capacity utilisation and cost per site, team, or asset' },
        ],
      },
      {
        text: 'External and segment effects',
        explanation: 'Isolates where the change sits and tests market forces without mixing them into internal revenue and cost drivers.',
        children: [
          { text: 'Is the decline concentrated in a segment, period, or region?', test: 'profit trend by segment and time period' },
          { text: 'Did competitors, regulation, or customer behaviour change the economics?', test: 'competitor benchmarks, regulation, and customer research' },
        ],
      },
    ],
    investigateFirst: 'Order the analysis as: locate the decline by segment, isolate the revenue movement, compare contribution margin, and review fixed overhead last. This sequence identifies where the profit equation changed before deeper cause testing.',
  };

  if (archetype === 'entry') return {
    branches: [
      {
        text: 'Market attractiveness',
        explanation: 'Establishes whether the opportunity is large, growing, profitable, and durable enough to justify entry.',
        children: [
          { text: `How large and fast-growing is the addressable market for ${company}?`, test: `${evidence}, market size, growth, and segment demand` },
          { text: 'Are margins structurally attractive after regulation, channel power, and likely price pressure?', test: 'industry margin pool, regulation, and channel economics' },
        ],
      },
      {
        text: 'Ability to win',
        explanation: 'Compares the client’s proposition and capabilities with customer needs and incumbent advantages.',
        children: [
          { text: `Which target customers have an unmet need that ${company} can serve better?`, test: 'customer needs, willingness to switch, and willingness to pay' },
          { text: `Do ${company}’s brand, product, data, channel, and operating capabilities beat local alternatives?`, test: 'capability gap and competitor benchmark' },
        ],
      },
      {
        text: 'Entry economics',
        explanation: 'Converts the strategic idea into a return case with explicit volume, price, cost, investment, and downside assumptions.',
        children: [
          { text: 'What share, price, and ramp-up are realistic, and when does the entry break even?', test: 'revenue build, unit economics, and break-even analysis' },
          { text: 'Does the return clear the hurdle under downside scenarios?', test: 'NPV or payback sensitivity to share, price, and cost' },
        ],
      },
      {
        text: 'Entry mode and risks',
        explanation: 'Determines how to enter while managing speed, control, investment, execution, and regulatory exposure.',
        children: [
          { text: 'Should the client build, partner, acquire, or pilot first?', test: 'mode scorecard for speed, control, cost, and capability access' },
          { text: 'What are the critical risks, milestones, and exit criteria?', test: 'risk register, pilot KPIs, and decision gates' },
        ],
      },
    ],
    investigateFirst: 'Order the analysis as: confirm market attractiveness, test the ability to win, validate entry economics, and assess entry mode last. A failed early gate makes the later design work irrelevant.',
  };

  if (archetype === 'growth') return {
    branches: [
      {
        text: 'Grow the core',
        explanation: 'Tests how much growth is available from current customers, products, channels, and geographies before adding complexity.',
        children: [
          { text: `Can ${company} increase retention, frequency, share of wallet, price, or penetration in the core?`, test: `${evidence}, cohort retention, frequency, price, and penetration` },
          { text: 'Which current segments have the largest profitable headroom?', test: 'segment revenue pool, growth, margin, and share' },
        ],
      },
      {
        text: 'Adjacent expansion',
        explanation: 'Separates new-customer, new-product, new-channel, and new-geography moves so each opportunity can be sized without double counting.',
        children: [
          { text: 'Which adjacent customers, products, channels, or geographies fit existing strengths?', test: 'adjacency map and capability reuse' },
          { text: 'How large, profitable, and reachable is each adjacency?', test: 'market size, expected share, margin, and acquisition cost' },
        ],
      },
      {
        text: 'New businesses and partnerships',
        explanation: 'Covers growth beyond close adjacencies while making build, partner, and acquire choices explicit.',
        children: [
          { text: `Could ${company} create a new business model or monetise an underused asset?`, test: 'customer demand and asset-monetisation economics' },
          { text: 'Would a partnership or acquisition accelerate access or reduce risk?', test: 'partner landscape, target screen, and synergy case' },
        ],
      },
      {
        text: 'Economics, capabilities, and sequence',
        explanation: 'Forces prioritisation by impact, feasibility, investment, timing, and risk rather than presenting an unranked idea list.',
        children: [
          { text: 'Which options create the most risk-adjusted value for the investment required?', test: 'option-level revenue, margin, investment, and risk score' },
          { text: 'What must be built first, and what are the pilot and scale gates?', test: 'capability gaps, roadmap, pilot KPIs, and owners' },
        ],
      },
    ],
    investigateFirst: 'Order the analysis as: size remaining headroom in the core, compare the closest adjacencies, and assess new businesses or partnerships last. The sequence moves from the most familiar demand base to progressively higher execution uncertainty.',
  };

  if (archetype === 'operations') return {
    branches: [
      {
        text: 'Demand pattern and service promise',
        explanation: 'Checks whether workload, mix, timing, or an unrealistic service promise is creating apparent operational failure.',
        children: [
          { text: `How has demand volume, mix, location, and timing changed for ${company}?`, test: `${evidence}, demand by period, segment, and location` },
          { text: 'Which service-level failures matter most to customers and economics?', test: 'on-time rate, wait time, defects, churn, and penalty cost' },
        ],
      },
      {
        text: 'Process capacity and bottleneck',
        explanation: 'Maps demand through each process step to identify the true constraint instead of averaging capacity across the system.',
        children: [
          { text: 'Which process step has the highest utilisation, queue, or cycle time?', test: 'step-level capacity, throughput, queue, and cycle time' },
          { text: 'Is the constraint caused by equipment, labour, space, systems, or policy?', test: 'downtime, staffing, layout, system logs, and rules' },
        ],
      },
      {
        text: 'Variability, scheduling, and handoffs',
        explanation: 'Tests whether volatility and coordination losses, rather than average capacity, drive missed service levels.',
        children: [
          { text: 'Do peaks, schedule gaps, batching, or poor forecasting create queues?', test: 'hourly or daily demand versus scheduled capacity' },
          { text: 'Where do handoffs, approvals, or information gaps create waiting?', test: 'handoff time, approval rate, and exception logs' },
        ],
      },
      {
        text: 'Quality, rework, and improvement economics',
        explanation: 'Captures hidden capacity consumed by defects and evaluates fixes by impact, cost, and implementation risk.',
        children: [
          { text: 'How much capacity and cost are lost to errors, returns, rework, or repeat contacts?', test: 'first-pass yield, defect rate, rework hours, and cost' },
          { text: 'Which fix removes the constraint with the best service and financial return?', test: 'impact-effort comparison and pilot results' },
        ],
      },
    ],
    investigateFirst: 'Order the analysis as: locate where service failure concentrates, compare demand timing with step-level capacity, inspect variability and handoffs, and evaluate remedies last. This separates a true constraint from coordination noise.',
  };

  if (archetype === 'acquisition') return {
    branches: [
      { text: 'Market and competitive position', explanation: 'Tests whether the target operates in an attractive market and has a defensible right to win.', children: [
        { text: 'Is the market growing, profitable, and resilient under plausible scenarios?', test: `${evidence}, market growth, margin pool, and downside case` },
        { text: 'Is the target’s share, proposition, and customer position defensible?', test: 'share trend, customer retention, win rate, and competitor benchmark' },
      ] },
      { text: 'Revenue quality', explanation: 'Separates durable recurring demand from concentration, discounting, one-offs, and optimistic pipeline assumptions.', children: [
        { text: 'How recurring, concentrated, and retained is the revenue base?', test: 'cohort retention, customer concentration, contract term, and churn' },
        { text: 'Are price, volume, mix, and pipeline assumptions supported?', test: 'revenue bridge, price realisation, backlog, and conversion' },
      ] },
      { text: 'Margin and operating sustainability', explanation: 'Tests whether reported earnings survive normalisation and whether capabilities can support the plan.', children: [
        { text: 'Which costs or earnings are one-off, deferred, capitalised, or below normal run rate?', test: 'quality-of-earnings bridge and benchmark costs' },
        { text: 'Can operations, people, systems, and suppliers support forecast growth?', test: 'capacity, key-person dependency, systems, and supplier risk' },
      ] },
      { text: 'Deal economics, synergies, and risks', explanation: 'Links standalone value and realistic synergies to price, financing, integration cost, and downside protection.', children: [
        { text: 'Does standalone value plus risk-adjusted synergies exceed price and integration cost?', test: 'valuation, synergy build, integration cost, and return sensitivity' },
        { text: 'What diligence red flags, deal terms, or integration issues could change the decision?', test: 'risk register, warranties, milestones, and integration plan' },
      ] },
    ],
    investigateFirst: 'Order the analysis as: validate revenue quality, normalise earnings, test market resilience, and value synergies and deal terms last. Weak underlying cash generation invalidates the later valuation layers.',
  };

  const decisionLabel = archetype === 'pricing' ? 'pricing decision' : archetype === 'competition' ? 'competitive response' : archetype === 'launch' ? 'product launch' : 'client decision';
  return {
    branches: [
      { text: 'Customer and market need', explanation: 'Defines the demand, target segment, and unmet need before testing a solution.', children: [
        { text: `Which customers need this ${decisionLabel}, and how valuable is the problem?`, test: `${evidence}, customer research, demand, and willingness to pay` },
        { text: 'How are alternatives and competitor behaviour changing?', test: 'competitor offer, price, share, and customer switching' },
      ] },
      { text: 'Strategic fit and ability to win', explanation: 'Tests whether the choice uses a real client advantage and fits the broader strategy.', children: [
        { text: `Why can ${company} win in this decision better than alternatives?`, test: 'brand, channel, product, data, and capability benchmark' },
        { text: 'What capabilities or partners are missing?', test: 'capability gap and partner assessment' },
      ] },
      { text: 'Economics and value creation', explanation: 'Builds the value case from explicit revenue, cost, investment, and scenario assumptions.', children: [
        { text: 'What price, volume, cost, and investment assumptions drive value?', test: 'unit economics, break-even, and cash-flow model' },
        { text: 'Does the decision create value in base and downside cases?', test: 'return and sensitivity analysis' },
      ] },
      { text: 'Execution, risks, and decision gates', explanation: 'Turns the recommendation into a testable plan with owners, milestones, and stop/go criteria.', children: [
        { text: 'What are the biggest execution, regulatory, and reputational risks?', test: 'risk register and mitigations' },
        { text: 'What should be piloted first, and which results trigger scale or stop?', test: 'pilot design, KPI thresholds, timeline, and owners' },
      ] },
    ],
    investigateFirst: 'Order the analysis as: verify customer need, establish the value economics, test strategic fit, and examine execution detail last. This sequence screens viability before implementation complexity.'
  };
}

export function suggestedStructureFor(question: LibraryQuestion): SuggestedStructureTree {
  const guide = structureAnswerGuideFor(question);
  if (guide) return guideToSuggestedTree(question, guide);
  const authored = structuresEasySuggestedTree(question.id);
  if (authored) return authored;
  const drafted = draftsFor(question);
  const branches = drafted.branches.map((branch, branchIndex) => {
    const branchId = `${question.id}-branch-${branchIndex + 1}-${slug(branch.text)}`;
    return {
      id: branchId,
      text: branch.text,
      children: branch.children.map((child, childIndex) => ({
        id: `${branchId}-test-${childIndex + 1}`,
        text: child.text,
        test: child.test,
      })),
    };
  });
  return {
    caseId: question.id,
    root: { id: `${question.id}-root`, text: question.question },
    branches,
    explanations: drafted.branches.map((branch, index) => ({
      branchId: branches[index].id,
      title: branch.text,
      explanation: branch.explanation,
    })),
    investigateFirst: drafted.investigateFirst,
  };
}

export function flattenSuggestedTree(tree: SuggestedStructureTree): SuggestedTreeNode[] {
  const result: SuggestedTreeNode[] = [tree.root];
  const visit = (node: SuggestedTreeNode) => {
    result.push(node);
    node.children?.forEach(visit);
  };
  tree.branches.forEach(visit);
  return result;
}
