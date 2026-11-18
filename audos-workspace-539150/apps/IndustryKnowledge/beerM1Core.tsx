import type { ReactNode } from 'react';

export type BeerModule01VisualKind = `beer-m1-${string}`;
export interface BeerSource { title: string; href: string; publisher: string }
export interface BeerNarrative { label: 'What it is' | 'How it works' | 'Global example' | 'Vietnam example' | 'Why it matters'; text: string }
export interface BeerCardData {
  title: string; chapterTitle: string; readingTime: string; objective: string; mateIntro: string; keyInsight: string;
  concepts: []; narrative: BeerNarrative[]; visualKind: BeerModule01VisualKind; visualHeading: string; visualIntro: string; imageAlt: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>; recap: string[]; chapterRecap: string; deepDiveTitle: string; body: ReactNode; sources: BeerSource[];
}
export interface BeerQuestion { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface BeerTakeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
export interface BeerLessonBundle {
  deck: BeerCardData[];
  quiz: BeerQuestion[];
  takeaways: BeerTakeaways;
  visuals: Record<string, () => ReactNode>;
}

export const SRC = {
  s1: { title: 'Global Beer Consumption by Country in 2024', href: 'https://www.kirinholdings.com/en/newsroom/release/2025/1222_01.html', publisher: 'Kirin Holdings (brewer-compiled tracker, industry estimate)' },
  s2: { title: 'Special consumption tax on alcoholic beverages could double by 2030: MoF', href: 'https://vietnamnet.vn/en/special-consumption-tax-on-alcoholic-beverages-could-double-by-2030-mof-2311196.html', publisher: 'Vietnamnet (VNS), reporting a Ministry of Finance proposal' },
  s3: { title: 'Vietnam Approves 90 Percent Tax Rate on Beer, Strong Alcohol by 2031', href: 'https://cambodianess.com/article/vietnam-approves-90-percent-tax-rate-on-beer-strong-alcohol-by-2031', publisher: 'Agence France-Presse via Cambodianess (news)' },
  s4: { title: "Craft brews still shine in Vietnam's gloomy beer market", href: 'https://asiabrewersnetwork.com/news/craft-brews-still-shine-in-vietnams-gloomy-beer-market', publisher: 'Asia Brewers Network (trade press, citing Vietnamnet and Kantar)' },
  s5: { title: "Vietnam's largest brewer a foreign owned business now", href: 'https://e.vnexpress.net/news/business/companies/vietnam-s-largest-brewer-a-foreign-owned-business-now-3864025.html', publisher: 'VnExpress International (news)' },
  s6: { title: 'Vietnam Beer Market Set to Reach Valuation of US$14.85 Billion By 2033', href: 'https://finance.yahoo.com/news/vietnam-beer-market-set-reach-163000017.html', publisher: 'Astute Analytica press release (commercial estimate, not official statistics)' },
  s7: { title: 'Alcohol - WHO Fact Sheet', href: 'https://www.who.int/news-room/fact-sheets/detail/alcohol', publisher: 'World Health Organization (official)' },
  s8: { title: 'Over 3 million annual deaths due to alcohol and drug use - WHO Global status report', href: 'https://www.who.int/news/item/25-06-2024-over-3-million-annual-deaths-due-to-alcohol-and-drug-use-majority-among-men', publisher: 'World Health Organization (official)' },
  s9: { title: 'HS Code Chapter 22 - Beverages, spirits and vinegar', href: 'https://www.foreign-trade.com/reference/hscode.htm?code=22', publisher: 'WCO Harmonized System nomenclature, via Foreign Trade Online' },
  s10: { title: 'Wine Industry Faces Shrinking Vineyards, Low Production And Consumption - OIV', href: 'https://www.esmmagazine.com/drinks/wine-industry-faces-shrinking-vineyards-low-production-and-consumption-oiv-311921', publisher: 'OIV annual report, as reported by ESM Magazine' },
  s11: { title: 'Vietnam opens new malt factory to supply Heineken and Carlsberg with processed Australian grain', href: 'https://fooddigital.com/drink/vietnam-opens-new-malt-factory-supply-heineken-and-carlsberg-processed-australian-grain', publisher: 'Food & Drink Digital (trade press, 2020)' },
  s12: { title: 'From Juice to Beer: How Far Will the Local Movement Go?', href: 'https://www.choicesmagazine.org/choices-magazine/submitted-articles/from-juice-to-beer-how-far-will-the-local-movement-go', publisher: 'Choices Magazine, AAEA (peer-reviewed, 2025)' },
  s13: { title: 'Heineken N.V. Reports 2024 Full Year Results', href: 'https://www.jamessharp.co.uk/market-news/heineken-n-v-reports-2024-full-year-results/', publisher: 'Heineken N.V. results, reproduced by James Sharp & Co' },
  s14: { title: 'SABECO honoured in Fortune Southeast Asia 500 list', href: 'https://english.vov.vn/en/economy/sabeco-honoured-in-fortune-southeast-asia-500-list-post1102895.vov', publisher: 'Voice of Vietnam (state broadcaster)' },
  s15: { title: 'Non-alcoholic beer sector in ascendancy across Europe', href: 'https://www.brewersjournal.info/non-alcoholic-beer-sector-in-ascendancy-across-europe/', publisher: 'The Brewers Journal, reporting Brewers of Europe trade-body data' },
  s16: { title: 'The Role of Aging in Spirits', href: 'https://pambos.wine/aging-in-spirits/', publisher: 'Pambos (retailer blog, illustrative secondary source)' },
  s17: { title: 'Diageo - Preliminary Results, Year Ended 30 June 2026', href: 'https://www.jamessharp.co.uk/market-news/diageo-preliminary-results/', publisher: 'Diageo plc results, reproduced by James Sharp & Co' },
  s18: { title: 'Pernod Ricard: FY25 Full-Year Sales and Results', href: 'https://www.nasdaq.com/press-release/pernod-ricard-steering-through-challenging-environment-agility-discipline-and', publisher: 'Pernod Ricard press release via Nasdaq/BusinessWire' },
  s19: { title: 'RTD Market 2026 Forecast and Trends', href: 'https://www.ohbev.com/blog/rtd-market-2024-comprehensive-overview', publisher: 'OhBEV, compiling IWSR and NielsenIQ data (commercial compilation)' },
  s20: { title: 'Brewing groups dominate international beer market (BarthHaas Report 2022/2023)', href: 'https://brauwelt.com/en/topics/market/645775-brewing-groups-dominate-international-beer-market', publisher: 'BarthHaas Report, as reported by Brauwelt International' },
  s21: { title: 'Anheuser-Busch InBev finishes with a flourish in 2024', href: 'https://drinks-intel.com/subscriber-news/anheuser-busch-inbev-finishes-with-a-flourish-in-2024-results-data/', publisher: 'Global Drinks Intel (trade press, reporting audited results)' },
  s22: { title: 'Carlsberg A/S - Solid top-line development and earnings growth (H1 2026)', href: 'https://via.ritzau.dk/announcement/15098999?publisherId=13560234&lang=en', publisher: 'Carlsberg A/S official announcement via Ritzau' },
  s23: { title: 'Security ministry presses ahead with zero tolerance policy for drink driving', href: 'https://english.vov.vn/en/society/security-ministry-presses-ahead-with-zero-tolerance-policy-for-drink-driving-post1092127.vov', publisher: 'Voice of Vietnam (state broadcaster)' },
  s24: { title: 'Huge new penalties justified, will help improve Vietnam traffic order', href: 'https://e.vnexpress.net/news/perspectives/huge-new-penalties-justified-will-help-improve-vietnam-traffic-order-4836935.html', publisher: 'VnExpress International (news, reporting Decree 168/2024)' },
  s25: { title: 'IWSR forecasts $34bn beverage alcohol growth by 2034', href: 'https://drinksint.com/iwsr-forecasts-34bn-beverage-alcohol-growth-by-2034/', publisher: 'IWSR, as reported by Drinks International (industry forecast)' },
  rec: { title: 'Module 01 research record (row 17, module01-research-v1)', href: 'https://audos.com/', publisher: 'Casemate WorkspaceDB' },
} satisfies Record<string, BeerSource>;
export type BeerSourceId = keyof typeof SRC;
export const cite = (...ids: BeerSourceId[]): BeerSource[] => ids.map((id) => SRC[id]);

export function DeepDive({ paragraphs, caveat }: { paragraphs: string[]; caveat?: string }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {caveat ? <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600"><span className="font-black text-slate-800">Evidence note: </span>{caveat}</p> : null}
    </div>
  );
}

export function chapter(input: Omit<BeerCardData, 'concepts'>): BeerCardData { return { ...input, concepts: [] }; }

interface QuizSeed { c: '1' | '2' | '3' | '4' | '5'; o: string; q: string; a: string; w: [string, string, string]; e: string }
const OPTION_IDS = ['a', 'b', 'c', 'd'];
export function quiz(prefix: string, seeds: QuizSeed[]): BeerQuestion[] {
  return seeds.map((seed, index) => {
    const rotation = (index * 3 + 1) % 4;
    const raw = [seed.a, ...seed.w];
    const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
    return {
      id: `${prefix}-${index + 1}`,
      question: seed.q,
      options: rotated.map((text, i) => ({ id: OPTION_IDS[i], text })),
      correctOptionId: OPTION_IDS[rotated.indexOf(seed.a)],
      explanation: seed.e,
      moduleId: seed.c,
      objective: seed.o,
    };
  });
}

export const NAVY = '#0b1f44';
export const RED = '#dc2626';
export const INK = '#334155';
export const MUTED = '#64748b';
export const LINE = '#cbd5e1';
const SOFT = '#f8fafc';
const TINT = '#fef2f2';

export function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) { out.push(line); line = word; } else line = next;
  }
  if (line) out.push(line);
  return out;
}

export function Txt({ x, y, text, size = 14, weight = 500, fill = INK, anchor = 'start', max, lh = 1.3 }: { x: number; y: number; text: string; size?: number; weight?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; max?: number; lh?: number }) {
  const lines = max ? wrap(text, max) : [text];
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor}>
      {lines.map((line, index) => <tspan key={`${index}-${line}`} x={x} dy={index === 0 ? 0 : size * lh}>{line}</tspan>)}
    </text>
  );
}

export function SvgWrap({ w, h, label, children }: { w: number; h: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" role="img" aria-label={label} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
      <defs>
        <marker id="beer-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill={NAVY} /></marker>
        <marker id="beer-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill={RED} /></marker>
      </defs>
      {children}
    </svg>
  );
}

export function Arrow({ x1, y1, x2, y2, red = false, dashed = false }: { x1: number; y1: number; x2: number; y2: number; red?: boolean; dashed?: boolean }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={red ? RED : NAVY} strokeWidth={2} strokeDasharray={dashed ? '6 5' : undefined} markerEnd={red ? 'url(#beer-arrow-red)' : 'url(#beer-arrow)'} />;
}

type Tone = 'light' | 'soft' | 'red' | 'navy' | 'tint' | 'outline';
const PALETTE: Record<Tone, { fill: string; stroke: string; t: string; b: string; dash?: string }> = {
  light: { fill: '#ffffff', stroke: LINE, t: NAVY, b: INK },
  soft: { fill: SOFT, stroke: LINE, t: NAVY, b: INK },
  red: { fill: RED, stroke: RED, t: '#ffffff', b: '#fee2e2' },
  navy: { fill: NAVY, stroke: NAVY, t: '#ffffff', b: '#cbd5e1' },
  tint: { fill: TINT, stroke: '#fecaca', t: NAVY, b: INK },
  outline: { fill: '#ffffff', stroke: RED, t: NAVY, b: INK, dash: '6 5' },
};

export function Box({ x, y, w, h, title, body, tone = 'light', size = 13, titleSize, center = false }: { x: number; y: number; w: number; h: number; title?: string; body?: string | string[]; tone?: Tone; size?: number; titleSize?: number; center?: boolean }) {
  const p = PALETTE[tone];
  const ts = titleSize ?? size + 1;
  const bodyChars = Math.max(6, Math.floor((w - 22) / (size * 0.54)));
  const titleChars = Math.max(6, Math.floor((w - 22) / (ts * 0.6)));
  const titleLines = title ? wrap(title, titleChars) : [];
  const bodyGroups = (body ? (Array.isArray(body) ? body : [body]) : []).map((item) => wrap(item, bodyChars));
  const bodyCount = bodyGroups.reduce((sum, group) => sum + group.length, 0);
  const gap = 5;
  const need = 20 + titleLines.length * ts * 1.25 + (titleLines.length && bodyCount ? 4 : 0) + bodyCount * size * 1.35 + Math.max(0, bodyGroups.length - 1) * gap;
  if ((globalThis as { __beerDebug?: boolean }).__beerDebug && need > h + 1) console.warn(`Box overflow: ${title ?? ''} needs ${Math.round(need)} has ${h}`);
  const cx = center ? x + w / 2 : x + 11;
  const anchor = center ? 'middle' : 'start';
  const startY = center ? y + Math.max(ts + 8, (h - (need - 20)) / 2 + ts) : y + ts + 9;
  const bodyStart = startY + titleLines.length * ts * 1.25 + (titleLines.length ? 3 : -2);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={p.fill} stroke={p.stroke} strokeWidth={1.5} strokeDasharray={p.dash} />
      {titleLines.length > 0 && <Txt x={cx} y={startY} text={titleLines.join(' ')} size={ts} weight={800} fill={p.t} anchor={anchor} max={titleChars} lh={1.25} />}
      {bodyGroups.flatMap((group, groupIndex) => group.map((line, lineIndex) => {
        const lineNumber = bodyGroups.slice(0, groupIndex).reduce((sum, g) => sum + g.length, 0) + lineIndex;
        return <text key={`${groupIndex}-${lineIndex}`} x={cx} y={bodyStart + lineNumber * size * 1.35 + groupIndex * gap} fontSize={size} fill={p.b} textAnchor={anchor}>{line}</text>;
      }))}
    </g>
  );
}

export function Frame({ title, subtitle, takeaway, note, ribbon, children }: { title: string; subtitle: string; takeaway: string; note?: string; ribbon?: string[]; children: ReactNode }) {
  const factors = ['Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal'];
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm sm:p-6">
      <header className="border-b border-slate-200 pb-4">
        <h4 className="text-xl font-black tracking-tight" style={{ color: NAVY }}>{title}</h4>
        <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
        {ribbon ? (
          <div className="mt-3 flex flex-wrap gap-1.5" aria-label="PESTEL factors">
            {factors.map((factor) => <span key={factor} className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${ribbon.includes(factor) ? 'border-red-600 bg-red-600 text-white' : 'border-slate-200 bg-white text-slate-400'}`}>{factor}</span>)}
          </div>
        ) : null}
      </header>
      <div className="mt-5 overflow-x-auto"><div className="min-w-[600px]">{children}</div></div>
      <p className="mt-5 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold leading-6 text-white"><span className="font-black">Key takeaway: </span>{takeaway}</p>
      {note ? <p className="mt-3 text-[11px] leading-5 text-slate-500"><span className="font-bold text-slate-700">Data note: </span>{note}</p> : null}
    </div>
  );
}

export interface BarRow { label: string; sub?: string; value: number; text: string; tone?: 'red' | 'navy' | 'slate' }
const BAR_FILL = { red: RED, navy: NAVY, slate: '#94a3b8' };

export function HBars({ rows, max, label, w = 720, labelW = 230, rowH = 60 }: { rows: BarRow[]; max: number; label: string; w?: number; labelW?: number; rowH?: number }) {
  const barX = labelW + 12;
  const barMax = w - barX - 130;
  return (
    <SvgWrap w={w} h={rows.length * rowH + 10} label={label}>
      {rows.map((row, index) => {
        const y = 6 + index * rowH;
        const bw = Math.max(4, (row.value / max) * barMax);
        return (
          <g key={row.label}>
            <Txt x={0} y={y + 18} text={row.label} size={14} weight={800} fill={NAVY} max={Math.floor(labelW / 8.2)} lh={1.2} />
            <rect x={barX} y={y + 2} width={barMax} height={24} rx={6} fill="#f1f5f9" />
            <rect x={barX} y={y + 2} width={bw} height={24} rx={6} fill={BAR_FILL[row.tone ?? 'navy']} />
            <Txt x={barX + bw + 8} y={y + 20} text={row.text} size={14} weight={800} fill={NAVY} />
            {row.sub ? <Txt x={barX} y={y + 44} text={row.sub} size={11.5} fill={MUTED} max={Math.floor((w - barX) / 6.2)} /> : null}
          </g>
        );
      })}
    </SvgWrap>
  );
}

export function DivBars({ rows, label, w = 720, labelW = 200, rowH = 54 }: { rows: BarRow[]; label: string; w?: number; labelW?: number; rowH?: number }) {
  const minV = Math.min(0, ...rows.map((r) => r.value));
  const maxV = Math.max(0, ...rows.map((r) => r.value));
  const plotX = labelW + 20;
  const plotW = w - plotX - 90;
  const unit = plotW / (maxV - minV || 1);
  const zeroX = plotX + (0 - minV) * unit;
  return (
    <SvgWrap w={w} h={rows.length * rowH + 14} label={label}>
      <line x1={zeroX} y1={0} x2={zeroX} y2={rows.length * rowH + 8} stroke={NAVY} strokeWidth={1.5} />
      {rows.map((row, index) => {
        const y = 6 + index * rowH;
        const bw = Math.max(3, Math.abs(row.value) * unit);
        const bx = row.value >= 0 ? zeroX : zeroX - bw;
        const textX = row.value >= 0 ? zeroX + bw + 8 : bx - 8;
        return (
          <g key={row.label}>
            <Txt x={0} y={y + 16} text={row.label} size={14} weight={800} fill={NAVY} max={Math.floor(labelW / 8.2)} lh={1.2} />
            <rect x={bx} y={y + 2} width={bw} height={24} rx={5} fill={row.value >= 0 ? NAVY : RED} />
            <Txt x={textX} y={y + 20} text={row.text} size={14} weight={800} fill={NAVY} anchor={row.value >= 0 ? 'start' : 'end'} />
            {row.sub ? <Txt x={plotX} y={y + 44} text={row.sub} size={11.5} fill={MUTED} max={Math.floor((w - plotX) / 6.2)} /> : null}
          </g>
        );
      })}
    </SvgWrap>
  );
}

export interface ColRow { label: string; value: number; text: string; tone?: 'red' | 'navy' | 'slate' | 'outline'; sub?: string }

export function VCols({ rows, max, label, w = 720, h = 330 }: { rows: ColRow[]; max: number; label: string; w?: number; h?: number }) {
  const base = h - 78;
  const plotH = h - 150;
  const slot = (w - 20) / rows.length;
  const colW = Math.min(88, slot * 0.62);
  return (
    <SvgWrap w={w} h={h} label={label}>
      <line x1={0} y1={base} x2={w} y2={base} stroke={LINE} strokeWidth={1.5} />
      {rows.map((row, index) => {
        const cx = 10 + slot * index + slot / 2;
        const ch = Math.max(4, (row.value / max) * plotH);
        const tone = row.tone ?? 'navy';
        return (
          <g key={row.label}>
            <rect x={cx - colW / 2} y={base - ch} width={colW} height={ch} rx={6} fill={tone === 'outline' ? '#ffffff' : BAR_FILL[tone]} stroke={tone === 'outline' ? RED : undefined} strokeWidth={tone === 'outline' ? 2 : 0} strokeDasharray={tone === 'outline' ? '6 5' : undefined} />
            <Txt x={cx} y={base - ch - 8} text={row.text} size={15} weight={800} fill={NAVY} anchor="middle" />
            <Txt x={cx} y={base + 22} text={row.label} size={13} weight={800} fill={NAVY} anchor="middle" max={Math.floor(slot / 7.4)} lh={1.2} />
            {row.sub ? <Txt x={cx} y={base + 56} text={row.sub} size={11} fill={MUTED} anchor="middle" max={Math.floor(slot / 6)} lh={1.2} /> : null}
          </g>
        );
      })}
    </SvgWrap>
  );
}

export interface DonutPart { label: string; value: number; color: string; note?: string }

export function Donut({ parts, centerTop, centerBottom, label, w = 720, h = 280 }: { parts: DonutPart[]; centerTop: string; centerBottom: string; label: string; w?: number; h?: number }) {
  const r = 82;
  const circumference = 2 * Math.PI * r;
  const cx = 150;
  const cy = h / 2;
  let offset = 0;
  return (
    <SvgWrap w={w} h={h} label={label}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={34} />
      {parts.map((part) => {
        const length = (part.value / 100) * circumference;
        const node = <circle key={part.label} cx={cx} cy={cy} r={r} fill="none" stroke={part.color} strokeWidth={34} strokeDasharray={`${length} ${circumference - length}`} strokeDashoffset={-offset} transform={`rotate(-90 ${cx} ${cy})`} />;
        offset += length;
        return node;
      })}
      <Txt x={cx} y={cy + 4} text={centerTop} size={26} weight={900} fill={NAVY} anchor="middle" />
      <Txt x={cx} y={cy + 24} text={centerBottom} size={12} fill={MUTED} anchor="middle" />
      {parts.map((part, index) => (
        <g key={part.label}>
          <rect x={300} y={34 + index * 66} width={16} height={16} rx={4} fill={part.color} />
          <Txt x={326} y={48 + index * 66} text={`${part.label} - ${part.value}%`} size={15} weight={800} fill={NAVY} />
          {part.note ? <Txt x={326} y={67 + index * 66} text={part.note} size={12} fill={MUTED} max={62} lh={1.25} /> : null}
        </g>
      ))}
    </SvgWrap>
  );
}

export interface TimelineEvent { when: string; title: string; detail: string; tone?: 'red' | 'navy' | 'outline' }

export function Timeline({ events, label, w = 720 }: { events: TimelineEvent[]; label: string; w?: number }) {
  const textX = 176;
  const chars = Math.floor((w - textX) / 6.7);
  let cursor = 10;
  const laid = events.map((event) => {
    const lines = wrap(event.detail, chars);
    const height = Math.max(62, 38 + lines.length * 17);
    const top = cursor;
    cursor += height;
    return { event, lines, top, height };
  });
  return (
    <SvgWrap w={w} h={cursor + 6} label={label}>
      <line x1={142} y1={14} x2={142} y2={cursor - 14} stroke={LINE} strokeWidth={3} />
      {laid.map(({ event, lines, top }) => {
        const tone = event.tone ?? 'navy';
        return (
          <g key={`${event.when}-${event.title}`}>
            <Txt x={120} y={top + 14} text={event.when} size={13} weight={800} fill={tone === 'navy' ? NAVY : RED} anchor="end" max={16} lh={1.2} />
            <circle cx={142} cy={top + 10} r={7} fill={tone === 'outline' ? '#ffffff' : tone === 'red' ? RED : NAVY} stroke={tone === 'outline' ? RED : undefined} strokeWidth={tone === 'outline' ? 2.5 : 0} />
            <Txt x={textX} y={top + 15} text={event.title} size={14.5} weight={800} fill={NAVY} />
            {lines.map((line, index) => <text key={`${index}-${line}`} x={textX} y={top + 34 + index * 17} fontSize={12.5} fill={INK}>{line}</text>)}
          </g>
        );
      })}
    </SvgWrap>
  );
}
