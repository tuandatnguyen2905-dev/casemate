type Brand = { name: string; url: string };

const brands: Brand[] = [
  { name: 'TikTok', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c175bc23-297a-4cb8-8ec8-ab00cd5d7ec5.png' },
  { name: 'Kimberly-Clark', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c05b4f9f-78d5-4c39-baa2-8c402e6bd02a.png' },
  { name: 'Deloitte', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/776fe6a7-2180-481c-9dcc-457c1550ecc9.png' },
  { name: 'Perfetti Van Melle', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/b139bdf1-6631-43ec-a751-6e4e18587001.png' },
  { name: 'FrieslandCampina', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/65c298ad-f8e1-442a-899e-e2cabbb01cd8.png' },
  { name: 'BCG', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/dfa5e306-6a31-4c21-8146-b5a8f5197931.png' },
  { name: 'Heineken', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/9bfa0711-a2c1-4c00-9252-f8a8f5561d41.png' },
  { name: 'Coca-Cola', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/e08f2226-ce74-4d31-9355-274894dcf788.png' },
  { name: 'Suntory PepsiCo', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/2f5be2a7-b927-47d1-94db-786ad4cbba03.jpg' },
  { name: 'Unilever', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/4b442312-ddbc-4fbf-9e04-35354ffc752d.png' },
  { name: 'Samsung', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/ddd7d9ad-1fe3-4590-92f9-5f6033a3cebf.png' },
  { name: 'Garena', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/8d8c8dc0-4f8e-444c-a295-f651b40b1c5d.png' },
  { name: 'Nielsen', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/efe5af79-04d2-4001-96c4-3657bda9c417.png' },
  { name: 'WPP Media', url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/df982513-6caf-4e73-8e07-734bf76017c8.png' },
];

function LogoSequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={duplicate || undefined}>
      {brands.map((brand) => (
        <div
          key={`${duplicate ? 'copy-' : ''}${brand.name}`}
          className="flex h-16 w-[140px] shrink-0 items-center justify-center overflow-hidden bg-transparent"
          title={duplicate ? undefined : brand.name}
        >
          <img
            src={brand.url}
            alt={duplicate ? '' : brand.name}
            loading="lazy"
            decoding="async"
            className="h-11 w-[120px] object-contain object-center mix-blend-multiply"
            style={{ backgroundColor: 'transparent', filter: 'none' }}
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

