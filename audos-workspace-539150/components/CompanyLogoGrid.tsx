import { COMPANY_LOGO_ASSETS } from '../data/companyLogos';

const CLOUDINARY_TRIM_URL = 'https://res.cloudinary.com/asfzhhej/image/fetch/e_trim/c_fit,w_180,h_72';

function trimmedLogoUrl(sourceUrl: string) {
  return `${CLOUDINARY_TRIM_URL}/${sourceUrl}`;
}

function LogoSequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={duplicate || undefined}>
      {COMPANY_LOGO_ASSETS.map((brand) => (
        <div
          key={`${duplicate ? 'copy-' : ''}${brand.name}`}
          className="flex h-16 w-[140px] shrink-0 items-center justify-center overflow-hidden bg-transparent"
          title={duplicate ? undefined : brand.name}
        >
          <img
            src={trimmedLogoUrl(brand.url)}
            alt={duplicate ? '' : brand.name}
            loading="lazy"
            decoding="async"
            className="h-12 w-[132px] object-contain object-center mix-blend-multiply"
            style={{ backgroundColor: 'transparent', filter: 'none' }}
            onError={(event) => {
              if (event.currentTarget.src !== brand.url) event.currentTarget.src = brand.url;
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

export default function CompanyLogoGrid() {
  return (
    <div className="mt-10 overflow-hidden" role="region" aria-label="Companies represented by Casemate users">
      <style>{`
        @keyframes casemate-logo-marquee { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-50%, 0, 0); } }
        .casemate-logo-track { animation: casemate-logo-marquee 36s linear infinite; will-change: transform; }
        .casemate-logo-marquee:hover .casemate-logo-track { animation-play-state: paused; }
      `}</style>
      <div className="casemate-logo-marquee overflow-hidden">
        <div className="casemate-logo-track flex w-max" style={{ animation: 'casemate-logo-marquee 36s linear infinite', willChange: 'transform' }}>
          <LogoSequence />
          <LogoSequence duplicate />
        </div>
      </div>
    </div>
  );
}
