import type { RealEstateAdvisoryChapterVisual } from './realEstateAdvisoryVisualSpecs';

/** Chapter-specific Learning Visuals for Property Advisory & Management Module 05, keyed by visualKind. Held: realestate-advisory-m5-10. */
export const REAL_ESTATE_ADVISORY_M5_VISUALS: Record<string, RealEstateAdvisoryChapterVisual> = {
  'realestate-advisory-m5-1': {
    heading: 'Occupiers now judge the space and the service that comes with it',
    intro: 'Tenants expect responsive operations, clear communication, convenience and adaptable space. A tenant app creates value only if requests are resolved.',
    spec: {
      layout: 'taxonomy', title: '01 Tenant and Occupier Expectations', kicker: '',
      root: 'Occupier expectations', rootDetail: 'Categories to segment by property type',
      groups: [
        { label: 'Space', items: ['Flexibility', 'Adaptable layout'] },
        { label: 'Service', items: ['Responsive operations', 'Clear communication'] },
        { label: 'Experience', items: ['Convenience', 'Health'] },
        { label: 'Digital', detail: 'A tenant app helps only when requests are resolved' },
      ],
      note: 'Segment expectations by property type.',
      takeaway: 'Occupiers increasingly judge both space and ongoing service.',
    },
  },
  'realestate-advisory-m5-2': {
    heading: 'Owners can outsource management tasks but keep the accountability',
    intro: 'Funds, developers and owners seek standardized reporting, vendor control, leasing and property operations. Outsourcing transfers tasks, not owner accountability.',
    spec: {
      layout: 'compare', title: '02 Professional Management Demand', kicker: '',
      leftTitle: 'Transferred to the manager (tasks)', rightTitle: 'Retained by the owner (accountability)',
      rows: [
        { label: 'Reporting', a: 'Prepares standardized reporting', b: 'Reviews it and decides' },
        { label: 'Vendor control', a: 'Appoints and supervises vendors', b: 'Sets the control framework' },
        { label: 'Leasing', a: 'Runs leasing activity', b: 'Holds agreed decision rights' },
        { label: 'Operations', a: 'Delivers property operations', b: 'Owns the asset risk' },
      ],
      note: 'Define governance and decision rights before outsourcing.',
      takeaway: 'More complex ownership increases demand for accountable recurring services.',
    },
  },
  'realestate-advisory-m5-3': {
    heading: 'Four kinds of evidence that advisers must keep apart in client reports',
    intro: 'Advisers must distinguish observation, estimate, valuation and forecast. A dashboard cannot cure inconsistent lease data.',
    spec: {
      layout: 'table', title: '03 Investor and Client Evidence Needs', kicker: '',
      headers: ['Evidence type', 'What it is', 'What to disclose'],
      rows: [
        { label: 'Observation', a: 'Recorded data, e.g. a signed lease', b: 'Source and date' },
        { label: 'Estimate', a: 'Analyst figure derived from data', b: 'Method and limitation' },
        { label: 'Valuation', a: 'Professional opinion of value', b: 'Purpose, basis and date' },
        { label: 'Forecast', a: 'Projection of future outcomes', b: 'Assumptions and risk' },
      ],
      note: 'A dashboard cannot cure inconsistent lease data — provide source, date and limitation.',
      takeaway: 'Clients expect transparent assumptions and actionable reporting.',
    },
  },
  'realestate-advisory-m5-4': {
    heading: 'How a property management system carries a lease through to the owner report',
    intro: 'Systems support leases, receivables, service charges, tenants, budgets and owner reporting. System balance is not proof of cash collection without reconciliation.',
    spec: {
      layout: 'flow', title: '04 Property Management Systems', kicker: '',
      steps: [
        { label: 'Lease record', detail: 'Tenant and lease terms captured' },
        { label: 'Billing', detail: 'Rent and service charges invoiced' },
        { label: 'Receivables', detail: 'Amounts due tracked by tenant' },
        { label: 'Reconciliation', detail: 'System balance matched to cash collected', kind: 'decision' },
        { label: 'Budget comparison', detail: 'Actuals against owner budget' },
        { label: 'Owner report', detail: 'Controlled data reported to the owner', kind: 'outcome' },
      ],
      note: 'Set permissions and controls; without reconciliation the system balance is not proof of collection.',
      takeaway: 'PMS platforms integrate administration when data and processes are controlled.',
    },
  },
  'realestate-advisory-m5-5': {
    heading: 'Predictive maintenance fits some assets and failure modes, not all',
    intro: 'CMMS schedules work and records history; sensors can flag condition changes. Predictive maintenance is not suitable for every asset or failure mode.',
    spec: {
      layout: 'decision', title: '05 CMMS and Predictive Maintenance', kicker: '',
      root: { label: 'Asset in the asset register', detail: 'With work-order history in the CMMS' },
      question: 'Is the asset critical, and can a sensor detect its failure mode early?',
      branches: [
        { condition: 'Critical and sensor-detectable', outcome: 'Add condition monitoring', detail: 'Sensors flag condition changes', tone: 'positive' },
        { condition: 'Routine wear, not sensor-detectable', outcome: 'Preventive work orders', detail: 'CMMS schedules and records the work', tone: 'caution' },
        { condition: 'Asset data inaccurate', outcome: 'Fix the register first', detail: 'Technology needs accurate data and routines', tone: 'negative' },
      ],
      note: 'Prioritize critical systems. ISO 41001:2018 sets out facility management systems.',
      takeaway: 'Maintenance technology supports reliability when asset data and routines are accurate.',
    },
  },
  'realestate-advisory-m5-6': {
    heading: 'Automation assists the workflow while professionals keep the judgement',
    intro: 'Analytics can support leasing, maintenance and valuation workflows. RICS notes AVM output alone cannot be IVS-compliant valuation without required professional judgement.',
    spec: {
      layout: 'compare', title: '06 Analytics, AI and Automated Valuation', kicker: '',
      leftTitle: 'Analytics and automation', rightTitle: 'Professional judgement',
      rows: [
        { label: 'Valuation', a: 'AVM output', b: 'Required for an IVS-compliant valuation' },
        { label: 'Leasing', a: 'Forecasts of demand and terms', b: 'Advice on the actual deal' },
        { label: 'Maintenance', a: 'Anomaly flags', b: 'Decision on the response' },
        { label: 'Accountability', a: 'Assists the workflow', b: 'Retains evidence and responsibility' },
      ],
      note: 'Disclose model use and limits.',
      takeaway: 'Automation assists professionals but does not remove evidence and accountability.',
    },
  },
  'realestate-advisory-m5-7': {
    heading: 'An integrated contract places the owner, providers and vendors under one governance',
    intro: 'Integrated contracts combine selected property and facility services under governance. Bundling can simplify accountability or obscure service costs.',
    spec: {
      layout: 'ecosystem', title: '07 Outsourced and Integrated Property Services', kicker: '',
      center: { label: 'Integrated services contract', detail: 'Selected property and facility services' },
      actors: [
        { label: 'Owner', relation: 'Outsources for expertise and capacity', flows: ['money', 'oversight'] },
        { label: 'Integrated FM provider', relation: 'Delivers and coordinates services', flows: ['service', 'information'] },
        { label: 'Vendors', relation: 'Perform subcontracted tasks', flows: ['service'] },
        { label: 'Occupiers', relation: 'Receive the services', flows: ['service', 'information'] },
        { label: 'SLA and pricing', relation: 'Make cost and performance visible', flows: ['oversight', 'risk'] },
      ],
      note: 'Bundling can simplify accountability or obscure service costs — use transparent pricing and SLA.',
      takeaway: 'Owners outsource to access expertise and variable delivery capacity.',
    },
  },
  'realestate-advisory-m5-8': {
    heading: 'What actually drives fee growth from an institutional mandate',
    intro: 'Multi-property clients need consistent data, controls and service across assets. AUM growth does not automatically mean fee or profit growth.',
    spec: {
      layout: 'driverTree', title: '08 Institutional Ownership and Recurring Mandates', kicker: '',
      root: { label: 'Fee and profit from the mandate', detail: 'Not the same as AUM growth' },
      drivers: [
        { label: 'AUM', detail: 'Mandate scale on a stated valuation basis' },
        { label: 'Fee schedule', detail: 'How fees relate to the mandate' },
        { label: 'Portfolio', detail: 'Consistent service across assets', children: [{ label: 'Data' }, { label: 'Controls' }] },
        { label: 'Reporting', detail: 'Fund-level reporting quality' },
        { label: 'Renewal', detail: 'Mandate retained over time' },
      ],
      note: 'State valuation basis and fee schedule.',
      takeaway: 'Institutional ownership supports portfolio-level management and advisory demand.',
    },
  },
  'realestate-advisory-m5-9': {
    heading: 'Digital discovery only counts once a lead becomes a completed outcome',
    intro: 'Platforms improve discovery while firms combine local relationships, technology and service portfolios. Lead volume is not conversion or revenue.',
    spec: {
      layout: 'flow', title: '09 Digital Brokerage and Service Consolidation', kicker: '',
      steps: [
        { label: 'Portal discovery', detail: 'Listing seen by a prospect' },
        { label: 'Lead captured', detail: 'Recorded in the CRM; acquisition cost incurred' },
        { label: 'Network follow-up', detail: 'Local relationships work the lead' },
        { label: 'Conversion', detail: 'Lead becomes a transaction', kind: 'decision' },
        { label: 'Completed outcome', detail: 'Only now is revenue earned', kind: 'outcome' },
      ],
      note: 'Track CAC and completed outcomes. Consolidation combines relationships, technology and service portfolios for scale.',
      takeaway: 'Digital channels and consolidation reshape client acquisition and scale.',
    },
  },
  'realestate-advisory-m5-11': {
    heading: 'Safety in operations runs on inspection, records and clear escalation',
    intro: 'Managers coordinate safety, vendors, incidents, tenant communication and contractual service. A management contract does not eliminate owner or statutory responsibilities.',
    spec: {
      layout: 'flow', title: '11 Building Safety and Client Protection', kicker: '',
      steps: [
        { label: 'Inspection', detail: 'Safety checks under building rules', owner: 'Manager and vendors' },
        { label: 'Incident or complaint', detail: 'Logged when raised', owner: 'Manager' },
        { label: 'Escalation', detail: 'To the party with the duty', kind: 'decision', owner: 'Manager / owner' },
        { label: 'Tenant communication', detail: 'Consumers kept informed', owner: 'Manager' },
        { label: 'Record and contract review', detail: 'Evidence kept against contract duties', kind: 'outcome', owner: 'Manager and owner' },
      ],
      note: 'Owner and statutory responsibilities remain under a management contract. Verify project and building rules.',
      takeaway: 'Operations require clear duties, records and escalation.',
    },
  },
  'realestate-advisory-m5-12': {
    heading: 'Credible green performance is measured across five operating areas',
    intro: 'Managers influence utilities, maintenance, procurement, waste and occupier engagement. A green certificate has a defined scope and does not guarantee every operating outcome.',
    spec: {
      layout: 'driverTree', title: '12 ESG and Green Building Operations', kicker: '',
      root: { label: 'Credible operating sustainability', detail: 'Actual performance, not certificate alone' },
      drivers: [
        { label: 'Energy', detail: 'Utility use and maintenance', children: [{ label: 'Utilities' }, { label: 'Maintenance' }] },
        { label: 'Water', detail: 'Consumption managed in operations' },
        { label: 'Waste', detail: 'Procurement and waste handling', children: [{ label: 'Procurement' }, { label: 'Waste streams' }] },
        { label: 'Indoor environment', detail: 'Occupier engagement and comfort' },
        { label: 'Evidence', detail: 'Baseline versus actual performance' },
      ],
      note: 'A green certificate has a defined scope. Measure baseline and actual performance.',
      takeaway: 'Operating performance is central to credible property sustainability.',
    },
  },
  'realestate-advisory-m5-13': {
    heading: 'Recurring revenue grows profitably only when scope and fees move together',
    intro: 'Growth requires disciplined contract pricing, staffing, vendor and renewal economics. Revenue growth can reduce margin when scope expands without fees.',
    spec: {
      layout: 'decision', title: '13 Recurring Fee-Based Services', kicker: '',
      root: { label: 'Recurring contract', detail: 'Property management, FM or asset management' },
      question: 'When scope or staffing changes, does the fee change with it?',
      branches: [
        { condition: 'Fee repriced with scope', outcome: 'Contribution protected', detail: 'Renewal on sound economics', tone: 'positive' },
        { condition: 'Service quality slipping', outcome: 'Renewal at risk', detail: 'Retention depends on quality', tone: 'caution' },
        { condition: 'Scope grows without fees', outcome: 'Revenue up, margin down', detail: 'Contribution falls', tone: 'negative' },
      ],
      note: 'Track contract contribution for each mandate.',
      takeaway: 'Recurring mandates can reduce transaction-cycle volatility when service quality supports retention.',
    },
  },
  'realestate-advisory-m5-14': {
    heading: 'Specialized commercial and industrial assets each call for their own expertise',
    intro: 'Industrial and commercial portfolios require technical systems, tenant knowledge and reliable reporting. A warehouse FM contract differs from residential management.',
    spec: {
      layout: 'taxonomy', title: '14 Industrial and Commercial Service Growth', kicker: '',
      root: 'Specialized asset portfolios', rootDetail: 'Asset types — build property-specific teams',
      groups: [
        { label: 'Commercial', items: ['Office', 'Retail'] },
        { label: 'Industrial', items: ['Industrial', 'Logistics'] },
        { label: 'Cross-cutting needs', items: ['Technical systems', 'Tenant knowledge', 'Reliable reporting'] },
        { label: 'Services demanded', items: ['Leasing', 'Valuation', 'Operational expertise'] },
      ],
      note: 'A warehouse FM contract differs from residential management.',
      takeaway: 'Specialized assets create demand for leasing, valuation and operational expertise.',
    },
  },
  'realestate-advisory-m5-15': {
    heading: 'Premium and digital offers rest on accountable expertise and must prove value',
    intro: 'Firms can offer analytics, strategic asset advice, premium occupier experience and optimized operations. Technology fees need measurable client value.',
    spec: {
      layout: 'pathway', title: '15 Digital and Premium Service Opportunities', kicker: '',
      trunk: [
        { label: 'Accountable expertise', detail: 'Professionals responsible for outcomes' },
        { label: 'Client problem defined', detail: 'Value that can be measured' },
      ],
      optionsLabel: 'Higher-value offers — alternatives, not steps',
      options: [
        { label: 'Analytics', detail: 'Data for client decisions' },
        { label: 'Strategic asset advice', detail: 'Advisory on asset direction' },
        { label: 'Premium occupier experience', detail: 'Enhanced tenant service' },
        { label: 'Optimized operations', detail: 'Automation of routine work' },
      ],
      afterLabel: 'Before scaling',
      after: [
        { label: 'Pilot outcomes', detail: 'Measured client value' },
        { label: 'Human review', detail: 'Retained over automated output', kind: 'outcome' },
      ],
      note: 'Technology fees need measurable client value; manage the risk of automated output.',
      takeaway: 'Higher-value growth combines technology with accountable expertise.',
    },
  },
};
