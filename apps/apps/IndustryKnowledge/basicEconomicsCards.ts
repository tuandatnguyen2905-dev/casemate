// Casemate Domain Knowledge — Basic Economics for STEM students and first-time business learners.
// Seven microeconomics cards, seven macroeconomics cards, and 43 consulting toolkit cards.

import { BASIC_ECONOMICS_SPRINT_CARDS } from './industrySprintExpansion';

export type BasicEconomicsTopic =
  | 'glossary'
  | 'economics-micro'
  | 'economics-macro'
  | 'economics-toolkits'
  | 'supply-chain'
  | 'rnd-product'
  | 'finance'
  | 'marketing-sales'
  | 'people-career'
  | 'surprising';

export interface BasicEconomicsCardSeed {
  topic: BasicEconomicsTopic;
  title: string;
  front: string;
  back: string[];
  diagram?: string[];
}

function card(topic: BasicEconomicsTopic, title: string, front: string, back: string[], diagram?: string[]): BasicEconomicsCardSeed {
  return { topic, title, front, back, ...(diagram ? { diagram } : {}) };
}

const micro = (title: string, front: string, back: string[], diagram?: string[]) => card('economics-micro', title, front, back, diagram);
const macro = (title: string, front: string, back: string[], diagram?: string[]) => card('economics-macro', title, front, back, diagram);
const toolkit = (title: string, front: string, back: string[], diagram?: string[]) => card('economics-toolkits', title, front, back, diagram);

export const BASIC_ECONOMICS_INDUSTRY = {
  slug: 'basic-economics',
  label: 'Basic Economics',
  shortLabel: 'Economics',
  badge: 'Economic Foundations',
  tagline: 'Microeconomics, macroeconomics, and 43 problem-solving toolkits explained from zero.',
  icon: 'Landmark',
  accent: 'var(--space-brand-primary-700)',
};

export const BASIC_ECONOMICS_CARD_SEEDS: BasicEconomicsCardSeed[] = [
  ...BASIC_ECONOMICS_SPRINT_CARDS,
  micro('Supply and demand', 'Demand is how much buyers want at each price. Supply is how much sellers offer at each price. Market prices move toward the point where the two meet.', [
    'If demand rises while supply stays fixed, price and quantity usually rise. If supply rises while demand stays fixed, price usually falls while quantity rises.',
    'Example: hot weather raises demand for cold drinks. If factories cannot increase output quickly, shelves empty faster and prices may rise.',
    'Formula: Market equilibrium occurs when Quantity Demanded (Qd) = Quantity Supplied (Qs).',
  ], ['A need appears', 'Buyers demand', 'Firms supply', 'Price adjusts', 'Market clears']),
  micro('Price elasticity', 'Price elasticity measures how strongly the quantity bought changes when price changes. It helps predict whether a price increase will raise or reduce revenue.', [
    'Demand is elastic when buyers react strongly, often because substitutes are easy to find. It is inelastic when buyers react weakly, often because the product is essential or hard to replace.',
    'Formula: Price Elasticity of Demand = % Change in Quantity Demanded / % Change in Price.',
  ]),
  micro('Four market structures', 'Market structure describes how many sellers compete, how different their products are, and how much control each firm has over price.', [
    'Perfect competition has many sellers and nearly identical products. A monopoly has one main seller and high entry barriers. An oligopoly has a few large sellers that react to one another.',
    'Monopolistic competition has many sellers differentiated by brand, service, or location. Ask: what can customers switch to, and what stops a new competitor from entering?',
  ]),
  micro('Consumer behavior and utility', 'Utility means the satisfaction a buyer receives. With a limited budget, a buyer chooses the bundle that offers the greatest perceived benefit.', [
    'Marginal utility is the extra satisfaction from one more unit. It usually declines: the first glass of water when thirsty matters more than the fourth.',
    'Price, income, habits, emotion, and substitutes all shape choices; people do not calculate perfectly every time.',
    'Formula: Marginal Utility = Change in Total Utility / Change in Quantity Consumed.',
  ]),
  micro('Fixed, variable, average, and marginal costs', 'Separating cost types shows whether producing one more unit is worthwhile and which operating scale is efficient.', [
    'Fixed costs do not change with short-term output, such as factory rent. Variable costs rise with output, such as materials and delivery fees.',
    'Formula: Total Cost = Fixed Cost + Variable Cost.',
    'Formula: Average Cost = Total Cost / Quantity; Marginal Cost = Change in Total Cost / Change in Quantity.',
  ]),
  micro('Break-even point', 'Break-even is the sales level where total revenue exactly covers total cost. Below it the business loses money; above it the business begins to earn profit.', [
    'Contribution per unit is the money left after variable cost to cover fixed cost. If price is $10, variable cost is $6, and fixed cost is $4,000, break-even is 1,000 units.',
    'Formula: Break-even Units = Fixed Costs / (Price per Unit − Variable Cost per Unit).',
  ]),
  micro('Market failure: externalities and public goods', 'A market fails when private prices and trades do not include the full cost or benefit to society.', [
    'An externality affects someone outside the transaction. Factory pollution is a negative externality; vaccination creates a positive externality by reducing infection risk for others.',
    'Public goods are hard to exclude people from and one person’s use does not reduce another’s, such as street lighting. Taxes, subsidies, regulation, or public provision can address these failures.',
  ]),

  macro('GDP and how to calculate it', 'GDP is the market value of final goods and services produced inside a country during a period.', [
    'Do not count intermediate goods twice. Flour sold to a bakery is already included in the final bread price. Real GDP adjusts for price changes; nominal GDP uses current prices.',
    'Formula: GDP = Consumption (C) + Investment (I) + Government Spending (G) + Exports (X) − Imports (M).',
    'Formula: GDP per Capita = GDP / Population.',
  ]),
  macro('Inflation and CPI', 'Inflation is a sustained rise in the overall price level, which reduces how much one unit of money can buy.', [
    'The Consumer Price Index tracks the cost of a representative basket. One product becoming expensive is not general inflation if most other prices are unchanged.',
    'Formula: Inflation Rate = (Current CPI − Previous CPI) / Previous CPI × 100%.',
  ]),
  macro('Types of unemployment', 'Unemployment has different causes, so each type needs a different response.', [
    'Frictional unemployment occurs while people move between jobs. Structural unemployment comes from a mismatch of skills or location. Cyclical unemployment rises in recessions. Seasonal unemployment follows the calendar.',
    'Formula: Unemployment Rate = Unemployed People Actively Seeking Work / Labor Force × 100%.',
  ]),
  macro('Monetary policy', 'A central bank uses interest rates, liquidity, and the money supply to influence borrowing, spending, exchange rates, growth, and inflation.', [
    'Lower rates usually make borrowing cheaper and can support demand. Higher rates usually slow demand and can reduce inflation pressure. The effect takes time to pass through banks and borrowers.',
    'Transmission path: Central-bank action → Interest rates and liquidity → Credit → Total demand → Output and inflation.',
  ], ['Central bank acts', 'Rates change', 'Credit reacts', 'Spending adjusts', 'Inflation and growth respond']),
  macro('Fiscal policy', 'Fiscal policy uses taxes and government spending to influence demand, income distribution, and the economy’s long-term capacity.', [
    'During a recession, lower taxes or higher spending can support jobs. When the economy overheats, the reverse can reduce inflation pressure. Infrastructure can raise future productivity if projects create real value.',
    'Formula: Budget Balance = Government Revenue − Government Spending.',
  ]),
  macro('Trade balance', 'The trade balance compares the value a country exports with the value it imports.', [
    'A surplus means exports exceed imports; a deficit means imports exceed exports. A deficit is not automatically harmful if imports are productive machines that raise future output.',
    'Formula: Trade Balance = Exports − Imports.',
  ]),
  macro('The business cycle', 'Economic activity commonly moves around its long-term trend through expansion, peak, recession, and trough.', [
    'Expansion brings rising output and jobs. At a peak, capacity is tight. In recession, demand and employment fall. A trough is the low point before recovery.',
    'Use several signals together—GDP, employment, inflation, credit, and confidence—rather than naming the phase from one number.',
  ], ['Expansion', 'Peak', 'Recession', 'Trough', 'Recovery']),

  toolkit('SWOT', 'SWOT separates Strengths, Weaknesses, Opportunities, and Threats.', [
    'Strengths and weaknesses are internal; opportunities and threats come from outside. Prioritize evidence-based factors and turn them into actions rather than stopping at a list.',
  ]),
  toolkit('PEST / PESTLE', 'PESTLE scans Political, Economic, Social, Technological, Environmental, and Legal forces outside a business.', [
    'Use it for a new market or long-term risk. Keep only forces that could change the decision, then connect each force to a business impact and response.',
  ]),
  toolkit("Porter’s Five Forces", 'Five Forces explains why an industry is easy or difficult to profit from.', [
    'Assess rivalry, new entrants, substitutes, buyer power, and supplier power. Rate each with evidence, then identify which force matters most and what the firm can change.',
  ]),
  toolkit('BCG Matrix', 'The BCG Matrix classifies businesses by market growth and relative market share.', [
    'Stars, Cash Cows, Question Marks, and Dogs suggest where to invest, maintain, test, or exit. It starts a discussion; it does not make the decision automatically.',
    'Formula: Relative Market Share = Company Market Share / Largest Competitor’s Market Share.',
  ]),
  toolkit('McKinsey 7S', '7S checks whether seven internal elements support the same change.', [
    'The elements are Strategy, Structure, Systems, Shared Values, Skills, Style, and Staff. Look for mismatches—for example, a digital strategy with rewards that still favor branch-only sales.',
  ]),
  toolkit('Ansoff Matrix', 'Ansoff creates four growth paths from current or new products and current or new markets.', [
    'The paths are market penetration, market development, product development, and diversification. Risk usually rises as the firm moves further from current customers and capabilities.',
  ]),
  toolkit('Value Chain Analysis', 'Value Chain Analysis breaks a business into activities from inputs through after-sales service.', [
    'Ask which activities create customer differentiation, which create most cost, and which handoffs cause delay. Do not cut an activity that creates valuable quality, speed, or data.',
  ], ['Inputs', 'Operations', 'Distribution', 'Marketing and sales', 'Service']),
  toolkit('MECE principle', 'MECE groups are Mutually Exclusive and Collectively Exhaustive: they do not overlap and together cover the problem.', [
    'Example: Revenue = Customers × Orders per Customer × Value per Order. Each branch has a distinct role and together they explain revenue.',
  ]),
  toolkit('Issue Tree', 'An Issue Tree divides one large decision into smaller questions that can be analyzed and assigned.', [
    'Start with the decision, split it into two to four main branches, and continue until each branch can be tested with data. Prioritize branches instead of creating a decorative tree.',
  ], ['Define the decision', 'Split main branches', 'Form hypotheses', 'Attach evidence', 'Conclude']),
  toolkit('Hypothesis-driven thinking', 'Start with the best provisional answer, then seek evidence that can confirm or disprove it.', [
    'A useful hypothesis is specific and can be wrong—for example, profit fell mainly because supermarket volume declined. Update it openly when new evidence appears.',
  ]),
  toolkit('3C: Company, Customer, Competitor', '3C checks internal capability, customer need, and competitor behavior before choosing a strategy.', [
    'A strong option sits where customers care, the company has a right to win, and competitors do not serve the need well. Ignoring any one C creates a blind spot.',
  ]),
  toolkit('4P Marketing Mix', '4P designs marketing from the company side: Product, Price, Place, and Promotion.', [
    'Define the need solved, the value and position signaled by price, where customers can buy, and how the benefit is communicated. The four choices must reinforce one another.',
  ]),
  toolkit('4C Marketing Mix', '4C checks marketing from the customer side: Customer Value, Cost, Convenience, and Communication.', [
    'Use 4P to design the offer, then 4C to test whether the offer makes sense to the buyer, including effort and risk—not only the sticker price.',
  ]),
  toolkit('Blue Ocean Strategy', 'Blue Ocean seeks new value space by changing what the industry normally offers.', [
    'Use Eliminate–Reduce–Raise–Create to redesign value. A valid idea needs differentiation, customer demand, and workable economics; having no competitor may simply mean having no market.',
  ]),
  toolkit('Balanced Scorecard', 'The Balanced Scorecard tracks strategy through Financial, Customer, Internal Process, and Learning and Growth perspectives.', [
    'Link early indicators to results: skills improve processes, processes improve customer outcomes, and customer outcomes improve financial results. Keep only a few strategic measures.',
  ]),
  toolkit('VRIN / VRIO', 'VRIN and VRIO test whether a resource can create durable advantage.', [
    'VRIO asks whether it is Valuable, Rare, hard to Imitate, and Organized for use. VRIN uses Non-substitutable. A resource matters only if the firm can convert it into customer and economic value.',
  ]),
  toolkit('Pareto Principle (80/20)', 'Pareto suggests that a small share of causes often creates a large share of results.', [
    'Treat 80/20 as a prioritization prompt, not a law. Test the data, then focus first on the few products, customers, or defects that drive most impact.',
  ]),
  toolkit('First Principles Thinking', 'Separate proven facts from inherited assumptions, then rebuild the solution from basic constraints.', [
    'Ask what must be true, what is merely industry habit, and which physical or economic limits are real. This prevents “we have always done it this way” from becoming evidence.',
  ]),
  toolkit('Pyramid Principle', 'State the main message first, then group supporting reasons and evidence beneath it.', [
    'The basic structure is conclusion → two to four reasons → evidence. Reasons at the same level should be parallel and non-overlapping.',
  ], ['Main answer', 'Supporting reasons', 'Evidence', 'Action implication']),
  toolkit('SCQA', 'SCQA builds a story with Situation, Complication, Question, and Answer.', [
    'Establish shared context, show what changed, define the decision question, and lead with the answer. It turns analysis into a clear reason to act.',
  ]),
  toolkit('Eisenhower Matrix', 'The Eisenhower Matrix sorts work by importance and urgency.', [
    'Do important and urgent work now; schedule important but not urgent work; delegate low-importance urgent work; remove work that is neither. The goal is to protect time before crises form.',
  ]),
  toolkit('RACI', 'RACI clarifies who is Responsible, Accountable, Consulted, and Informed for each deliverable.', [
    'Use one clear Accountable owner. Too many final owners slow decisions. RACI clarifies handoffs but does not replace a plan or communication.',
  ]),
  toolkit('OKRs', 'An OKR combines an inspiring Objective with measurable Key Results.', [
    'Key Results describe outcomes, not tasks. “Launch a campaign” is an activity; “raise activation from 30% to 45%” is a result. Give each OKR a time limit and owner.',
  ]),
  toolkit('KPIs vs. metrics', 'A metric is any tracked number. A KPI is one of the few numbers that determines whether a specific objective is succeeding.', [
    'Each KPI needs a definition, data source, owner, frequency, and action threshold. A number is not a KPI merely because it is available.',
    'Formula: Completion Rate = People Who Complete / People Who Start × 100%.',
  ]),
  toolkit('Zero-based budgeting', 'Zero-based budgeting asks every cost to justify its need and value each cycle instead of automatically extending last year’s budget.', [
    'Define activities, estimate cost, rank value, and fund priorities. It removes inertia but can become short-term if long-horizon investments are cut only because their impact is harder to measure.',
  ]),
  toolkit('Waterfall vs. Agile', 'Waterfall moves sequentially from requirements to design, build, and delivery. Agile delivers small increments and learns through iteration.', [
    'Waterfall fits stable requirements and costly changes. Agile fits uncertain needs that can be tested in pieces. One program can use both for different workstreams.',
  ], ['Define requirements', 'Choose delivery model', 'Build an increment', 'Test', 'Learn and adjust']),
  toolkit('Design Thinking', 'Design Thinking solves problems through Empathize, Define, Ideate, Prototype, and Test.', [
    'A cheap prototype creates learning before a large investment. Observe behavior rather than asking only whether people like the idea. Repeat earlier steps when evidence changes the problem.',
  ], ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test']),
  toolkit('Jobs To Be Done', 'JTBD asks what job a customer “hires” a product to complete in a specific situation.', [
    'The job can be functional, emotional, and social. Study the trigger, alternatives, anxieties, and desired outcome rather than beginning with a feature list.',
  ]),
  toolkit('Customer Journey Map', 'A Journey Map shows customer steps, touchpoints, emotions, pain points, and improvement opportunities.', [
    'Map the customer’s goal rather than the company org chart. Add real evidence, prioritize moments that shape trust or conversion, and assign an owner.',
  ], ['Need appears', 'Explore', 'Buy', 'Use', 'Get support', 'Return or leave']),
  toolkit('Net Promoter Score (NPS)', 'NPS asks how likely a customer is to recommend the product from 0 to 10.', [
    'Scores 9–10 are Promoters, 7–8 are Passives, and 0–6 are Detractors. NPS signals relationship strength but needs comments and behavior to explain why.',
    'Formula: NPS = % Promoters − % Detractors.',
  ]),
  toolkit('Unit Economics', 'Unit economics tests whether one customer, order, or store creates money after variable costs.', [
    'Choose the correct unit, calculate net revenue and all costs that change directly with it, then ask whether contribution can cover fixed costs and growth.',
    'Formula: Contribution Margin per Unit = Revenue per Unit − Variable Cost per Unit.',
  ]),
  toolkit('CAC and LTV', 'CAC is the cost to acquire a customer. LTV is the expected contribution over the full customer relationship.', [
    'Formula: CAC = Sales and Marketing Spend / New Customers.',
    'Formula: LTV = Average Revenue per Period × Gross Margin × Average Retention Periods.',
    'Formula: LTV:CAC = LTV / CAC.',
  ]),
  toolkit('Payback Period', 'Payback Period is the time required for cumulative cash inflows to recover the initial investment.', [
    'Shorter payback reduces liquidity risk, but the measure ignores cash after payback and often ignores the time value of money.',
    'Formula: Simple Payback = Initial Investment / Periodic Cash Inflow, when inflows are even.',
  ]),
  toolkit('IRR and NPV', 'NPV converts future cash flows into today’s value. IRR is the discount rate that makes NPV equal zero.', [
    'Positive NPV means the project creates value above the required return. For mutually exclusive projects, NPV is usually more reliable than IRR.',
    'Formula: NPV = Σ[CFt / (1 + r)^t] − Initial Investment.',
    'Formula: IRR is r where Σ[CFt / (1 + r)^t] − Initial Investment = 0.',
  ]),
  toolkit('EBITDA', 'EBITDA estimates operating profit before financing, tax, depreciation, and amortization.', [
    'It helps compare operations but is not cash flow because it excludes working-capital changes and capital expenditure.',
    'Formula: EBITDA = Net Income + Interest + Tax + Depreciation + Amortization.',
  ]),
  toolkit('Working Capital', 'Working capital shows cash tied up in inventory and receivables after short-term supplier financing.', [
    'A profitable business can still run out of cash when customers pay slowly or inventory grows too quickly.',
    'Formula: Net Working Capital = Current Assets − Current Liabilities.',
    'Formula: Operating Working Capital = Inventory + Receivables − Payables.',
  ]),
  toolkit('Gross Margin', 'Gross Margin is the share of revenue left after the direct cost of producing the product or service.', [
    'The remainder must cover marketing, office staff, technology, interest, and tax. Margin can improve through price, mix, or lower direct cost.',
    'Formula: Gross Margin = (Revenue − COGS) / Revenue × 100%.',
  ]),
  toolkit('Break-even Analysis', 'Break-even Analysis finds the sales level needed to cover fixed and variable costs.', [
    'Stress-test the answer if price falls or variable cost rises.',
    'Formula: Contribution Margin per Unit = Price − Variable Cost per Unit.',
    'Formula: Break-even Units = Fixed Costs / Contribution Margin per Unit.',
  ]),
  toolkit('Market Sizing: top-down and bottom-up', 'Market sizing estimates an opportunity in two independent ways and compares assumptions.', [
    'Top-down starts with a total market and filters it. Bottom-up starts with customers or outlets × usage × price. Separate TAM, SAM, and realistically obtainable SOM.',
    'Formula: Bottom-up Market Size = Target Customers × Units per Customer × Price × Periods.',
  ]),
  toolkit('Fishbone / Ishikawa Diagram', 'A Fishbone Diagram groups possible causes so a team can investigate a problem systematically.', [
    'Typical groups are People, Process, Machine, Material, Measurement, and Environment. The diagram generates hypotheses; evidence or experiments must confirm the cause.',
  ]),
  toolkit('Mind Mapping', 'A Mind Map expands related ideas from one central topic to support exploration and memory.', [
    'Use short keywords and one idea per branch. After brainstorming, convert the map into priorities, an issue tree, or an action plan.',
  ]),
  toolkit('Five Whys', 'Five Whys repeatedly asks why to move from a symptom toward a controllable root cause.', [
    'The number five is a guide, not a rule. For problems with several branches, combine it with Fishbone and verify the proposed cause with data.',
  ], ['State the symptom', 'Ask why', 'Find the near cause', 'Go deeper', 'Verify the root cause']),
  toolkit('SWOT–TOWS cross-analysis', 'TOWS converts SWOT factors into actions by crossing internal and external factors.', [
    'SO uses strengths to capture opportunities; ST uses strengths to reduce threats; WO uses opportunities to repair weaknesses; WT reduces both weakness and exposure. Add owner, resources, risk, and measure.',
  ]),
];
