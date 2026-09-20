import { CalendarDays, Loader2 } from 'lucide-react';

type ProgramRow = {
  id: number;
  program_id: string;
  program_name: string;
  open_date?: string | null;
  close_date?: string | null;
  logo_url?: string | null;
  active?: boolean | null;
  version?: number | null;
};

type LiveProgram = {
  row: ProgramRow;
  company: string;
  program: string;
  closesLabel: string;
};

type WorkspaceDbHook = <T>(table: string, options: Record<string, unknown>) => {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
};

type CompanyBrand = {
  aliases: string[];
  color: string;
  logoUrl?: string;
};

const COMPANY_BRANDS: CompanyBrand[] = [
  { aliases: ['ShopeeFood'], color: '#EE4D2D' },
  { aliases: ['Shopee'], color: '#EE4D2D' },
  { aliases: ['Central Retail'], color: '#E31E24' },
  { aliases: ['Techcombank'], color: '#C8102E' },
  { aliases: ['JTI', 'Japan Tobacco'], color: '#003087' },
  { aliases: ["L'Oréal", 'Loreal'], color: '#C8102E' },
  { aliases: ['Unilever'], color: '#1F36C7', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/4b442312-ddbc-4fbf-9e04-35354ffc752d.png' },
  { aliases: ['Nestlé', 'Nestle'], color: '#009FE3' },
  { aliases: ['MoMo'], color: '#A50064' },
  { aliases: ['AB InBev'], color: '#F5A623' },
  { aliases: ['Suntory PepsiCo', 'PepsiCo'], color: '#004B87', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/2f5be2a7-b927-47d1-94db-786ad4cbba03.jpg' },
  { aliases: ['Carlsberg'], color: '#006B54' },
  { aliases: ['P&G', 'Procter & Gamble'], color: '#003C71' },
  { aliases: ['Deloitte'], color: '#86BC25', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/776fe6a7-2180-481c-9dcc-457c1550ecc9.png' },
  { aliases: ['EY'], color: '#FFE600' },
  { aliases: ['Home Credit'], color: '#E30613' },
  { aliases: ['Viettel'], color: '#D62027' },
  { aliases: ['Prudential'], color: '#ED1B2F' },
  { aliases: ['Maersk'], color: '#42B0D5' },
  { aliases: ['Mondelēz', 'Mondelez'], color: '#6B2D8B' },
  { aliases: ['Masan'], color: '#C8102E' },
  { aliases: ['Vinamilk'], color: '#009FDA' },
  { aliases: ['BAT', 'British American Tobacco'], color: '#002D62' },
  { aliases: ['Bosch'], color: '#E20015' },
  { aliases: ['Schneider Electric'], color: '#3DCD58' },
  { aliases: ['Techtronic', 'TTI'], color: '#E31E24' },
  { aliases: ['Fast Retailing'], color: '#E40521' },
  { aliases: ['Uniqlo'], color: '#E40521' },
  { aliases: ['Decathlon'], color: '#0082C3' },
  { aliases: ['MUJI'], color: '#333333' },
  { aliases: ['Starbucks', 'Starbuck'], color: '#00704A' },
  { aliases: ['ACB'], color: '#E30613' },
  { aliases: ['VPBank'], color: '#004A97' },
  { aliases: ['HSBC'], color: '#DB0011' },
  { aliases: ['MSB'], color: '#E30613' },
  { aliases: ['Manulife'], color: '#00A758' },
  { aliases: ['OPPO'], color: '#1D8348' },
  { aliases: ['Panasonic'], color: '#003087' },
  { aliases: ['Hitachi'], color: '#E30613' },
  { aliases: ['Knauf'], color: '#E30613' },
  { aliases: ['NAB', 'National Australia Bank'], color: '#E30613' },
  { aliases: ['VNG'], color: '#F37021' },
  { aliases: ['Zalo'], color: '#0068FF' },
  { aliases: ['SPX', 'Shopee Xpress'], color: '#E30613' },
  { aliases: ['Garena'], color: '#E30613', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/8d8c8dc0-4f8e-444c-a295-f651b40b1c5d.png' },
  { aliases: ['TikTok'], color: '#000000', logoUrl: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c175bc23-297a-4cb8-8ec8-ab00cd5d7ec5.png' },
  { aliases: ['DKSH'], color: '#E30613' },
  { aliases: ['Crystal'], color: '#1A237E' },
  { aliases: ['Louis Dreyfus'], color: '#006A4E' },
  { aliases: ['PropertyGuru'], color: '#2DBD6E' },
  { aliases: ['Expeditors'], color: '#003087' },
  { aliases: ['Abbott'], color: '#009FDA' },
  { aliases: ['Turner & Townsend', 'Turner and Townsend'], color: '#EF3E33' },
  { aliases: ['Adidas'], color: '#000000' },
  { aliases: ['Texas Instruments'], color: '#C00000' },
  { aliases: ['PMAX'], color: '#E30613' },
  { aliases: ['C.P. Group', 'CP Group'], color: '#E30613' },
];

const DEFAULT_BRAND_COLOR = '#6B7280';

function normalizeCompany(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function companyBrand(company: string): CompanyBrand {
  const normalized = normalizeCompany(company);
  return COMPANY_BRANDS.find((brand) => brand.aliases.some((alias) => normalized.includes(normalizeCompany(alias)))) || {
    aliases: [company],
    color: DEFAULT_BRAND_COLOR,
  };
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  }[character] || character));
}

function wordmarkDataUrl(company: string, color: string) {
  const label = company || 'Program';
  const fontSize = label.length > 24 ? 20 : label.length > 16 ? 24 : 30;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="64" viewBox="0 0 240 64"><text x="0" y="43" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700">${escapeXml(label)}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function dateParts(value?: string | null) {
  if (!value) return [] as Array<{ day: number; month: number; label: string }>;
  let values = [value];
  if (value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) values = parsed.map(String);
    } catch {
      values = [value];
    }
  }
  return values.flatMap((item) => {
    const match = String(item).trim().match(/^(\d{1,2})\/(\d{1,2})$/);
    if (!match) return [];
    const day = Number(match[1]);
    const month = Number(match[2]);
    if (day < 1 || day > 31 || month < 1 || month > 12) return [];
    return [{ day, month, label: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}` }];
  });
}

function splitProgramName(value: string) {
  const [company, ...parts] = String(value || '').split(' — ');
  return parts.length
    ? { company: company.trim(), program: parts.join(' — ').trim() }
    : { company: '', program: String(value || '').trim() };
}

function classify(row: ProgramRow, now = new Date()): LiveProgram | null {
  const open = dateParts(row.open_date)[0];
  if (!open || row.active === false) return null;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const openYear = today.getFullYear();
  const openDate = new Date(openYear, open.month - 1, open.day);
  if (openDate > today) return null;

  const close = dateParts(row.close_date)[0];
  let closeDate: Date;
  if (close) {
    const closeYear = close.month < open.month ? openYear + 1 : openYear;
    closeDate = new Date(closeYear, close.month - 1, close.day);
  } else {
    closeDate = new Date(openDate);
    closeDate.setDate(closeDate.getDate() + 45);
  }

  if (today < openDate || today > closeDate) return null;
  return {
    row,
    ...splitProgramName(row.program_name),
    closesLabel: `${String(closeDate.getDate()).padStart(2, '0')}/${String(closeDate.getMonth() + 1).padStart(2, '0')}`,
  };
}

function ProgramCard({ item, duplicate = false }: { item: LiveProgram; duplicate?: boolean }) {
  const brand = companyBrand(item.company);
  const statusColor = '#16A34A';
  const logoUrl = item.row.logo_url?.trim() || brand.logoUrl || wordmarkDataUrl(item.company, brand.color);

  return (
    <article
      className="flex min-h-[250px] w-[82vw] max-w-[320px] shrink-0 snap-start flex-col rounded-2xl border border-l-4 border-[#e5e7eb] bg-white p-5 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.45)] sm:w-72"
      style={{ borderLeftColor: brand.color }}
      aria-hidden={duplicate || undefined}
    >
      <div className="flex h-12 items-center">
        <img src={logoUrl} alt={duplicate ? '' : `${item.company} logo`} className="max-h-12 max-w-[180px] object-contain object-left" loading="lazy" decoding="async" />
      </div>
      <h3 className="mt-5 text-base font-extrabold leading-6 text-[#111827]">{item.program}</h3>
      <div className="mt-2 flex items-start justify-between gap-3">
        <p className="text-xs font-bold text-[#6b7280]">{item.company}</p>
        <span className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold" style={{ color: statusColor, backgroundColor: `${statusColor}14` }}>
          Open Now
        </span>
      </div>
      <p className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-bold text-[#374151]">
        <CalendarDays className="h-3.5 w-3.5 shrink-0" style={{ color: brand.color }} />
        Closes {item.closesLabel}
      </p>
    </article>
  );
}

function ProgramSequence({ items, duplicate = false }: { items: LiveProgram[]; duplicate?: boolean }) {
  return (
    <div className={`casemate-program-sequence flex shrink-0 gap-5 pr-5 ${duplicate ? 'casemate-program-duplicate' : ''}`} aria-hidden={duplicate || undefined}>
      {items.map((item) => (
        <ProgramCard key={`${duplicate ? 'copy-' : ''}${item.row.program_id}`} item={item} duplicate={duplicate} />
      ))}
    </div>
  );
}

export default function LandingLivePrograms(_props: { onStart: () => void }) {
  const useWorkspaceDB = (window as any).useWorkspaceDB as WorkspaceDbHook;
  const { data, loading, error } = useWorkspaceDB<ProgramRow>('program_fit_rubrics', {
    shared: true,
    filters: [{ column: 'active', operator: 'eq', value: true }],
    orderBy: { column: 'program_name', direction: 'asc' },
    limit: 500,
  });
  const newest = new Map<string, ProgramRow>();
  for (const row of data || []) {
    const current = newest.get(row.program_id);
    if (!current || Number(row.version || 0) > Number(current.version || 0) || (Number(row.version || 0) === Number(current.version || 0) && row.id > current.id)) newest.set(row.program_id, row);
  }
  const programs = Array.from(newest.values())
    .map((row) => classify(row))
    .filter((item): item is LiveProgram => item !== null)
    .sort((a, b) => a.closesLabel.localeCompare(b.closesLabel) || a.program.localeCompare(b.program));

  if (!loading && (error || programs.length === 0)) return null;

  return (
    <section id="programs-open" className="border-y border-[#e5e7eb] bg-white" aria-labelledby="landing-live-programs-title">
      <style>{`
        @keyframes casemate-program-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .casemate-program-track { animation: casemate-program-marquee 42s linear infinite; }
        .casemate-program-marquee:hover .casemate-program-track { animation-play-state: paused; }
        @media (max-width: 639px) {
          .casemate-program-marquee { overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
          .casemate-program-marquee::-webkit-scrollbar { display: none; }
          .casemate-program-track { animation: none; }
          .casemate-program-duplicate { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .casemate-program-marquee { overflow-x: auto; scroll-snap-type: x mandatory; }
          .casemate-program-track { animation: none; }
          .casemate-program-duplicate { display: none; }
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#cc0000]">Expecting Application Calendar</p>
          <h2 id="landing-live-programs-title" className="mt-4 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">MT Programs Now Accepting Applications</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b7280]">Programs currently open for applications — updated automatically from Casemate&apos;s program database.</p>
        </div>

        {loading ? (
          <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-8 text-sm font-semibold text-[#6b7280]"><Loader2 className="h-4 w-4 animate-spin" />Syncing application windows…</div>
        ) : (
          <div className="casemate-program-marquee -mx-4 mt-12 overflow-hidden px-4 sm:-mx-6 sm:px-6" role="region" aria-label="Programs currently open for applications">
            <div className="casemate-program-track flex w-max py-2">
              <ProgramSequence items={programs} />
              <ProgramSequence items={programs} duplicate />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
