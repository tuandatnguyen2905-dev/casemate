import { GOLDEN_GATE_LOGO_DATA_URL } from './goldenGateLogo';

export type CompanyLogoAsset = {
  name: string;
  url: string;
  aliases: readonly string[];
};

// Durable company-logo catalog shared across landing-page surfaces.
// Add or replace a logo here so future components can reuse the same asset.
export const COMPANY_LOGO_ASSETS: readonly CompanyLogoAsset[] = [
  { name: 'Central Retail', aliases: ['Central Retail'], url: 'https://storage.googleapis.com/audos-images/attachments/general/2200a6c5-0680-4e68-b49b-421bee1e01bc.png' },
  { name: 'Techcombank', aliases: ['Techcombank', 'Techcombank Vietnam'], url: 'https://storage.googleapis.com/audos-images/attachments/general/b32eda14-ec04-41b0-a748-f0b3574a70f4.png' },
  { name: 'TikTok', aliases: ['TikTok'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c175bc23-297a-4cb8-8ec8-ab00cd5d7ec5.png' },
  { name: 'Kimberly-Clark', aliases: ['Kimberly-Clark', 'Kimberly Clark'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/c05b4f9f-78d5-4c39-baa2-8c402e6bd02a.png' },
  { name: 'Deloitte', aliases: ['Deloitte'], url: 'https://storage.googleapis.com/audos-images/attachments/general/e761e5b4-2159-48f3-95af-a840f2a14331.png' },
  { name: 'Perfetti Van Melle', aliases: ['Perfetti Van Melle'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/b139bdf1-6631-43ec-a751-6e4e18587001.png' },
  { name: 'FrieslandCampina', aliases: ['FrieslandCampina'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/65c298ad-f8e1-442a-899e-e2cabbb01cd8.png' },
  { name: 'BCG', aliases: ['BCG', 'Boston Consulting Group'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/dfa5e306-6a31-4c21-8146-b5a8f5197931.png' },
  { name: 'Heineken', aliases: ['Heineken'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/9bfa0711-a2c1-4c00-9252-f8a8f5561d41.png' },
  { name: 'Carlsberg', aliases: ['Carlsberg'], url: 'https://storage.googleapis.com/audos-images/attachments/general/7812e23e-7533-41d0-a660-4c9df8968b07.png' },
  { name: 'Coca-Cola', aliases: ['Coca-Cola', 'Coca Cola'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/e08f2226-ce74-4d31-9355-274894dcf788.png' },
  { name: 'Suntory PepsiCo', aliases: ['Suntory PepsiCo', 'PepsiCo'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/2f5be2a7-b927-47d1-94db-786ad4cbba03.jpg' },
  { name: 'Unilever', aliases: ['Unilever'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/4b442312-ddbc-4fbf-9e04-35354ffc752d.png' },
  { name: 'Vinamilk', aliases: ['Vinamilk'], url: 'https://storage.googleapis.com/audos-images/attachments/general/9ee3504c-007b-450e-b369-fd7c057d3771.png' },
  { name: 'Samsung', aliases: ['Samsung'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/ddd7d9ad-1fe3-4590-92f9-5f6033a3cebf.png' },
  { name: 'Adidas', aliases: ['Adidas', 'adidas'], url: 'https://storage.googleapis.com/audos-images/attachments/general/5a45acde-5ef0-4a0d-9b95-16b75af02698.png' },
  { name: 'AB InBev', aliases: ['AB InBev', 'AB InBev Vietnam', 'AB InBev Southeast Asia'], url: 'https://storage.googleapis.com/audos-images/attachments/general/105908bd-9e37-412c-a0c9-efa1290c8774.png' },
  { name: 'Home Credit', aliases: ['Home Credit', 'Home Credit Vietnam'], url: 'https://storage.googleapis.com/audos-images/attachments/general/3af2d4d0-3cf0-423a-a98d-6c12794a3dca.png' },
  { name: 'Garena', aliases: ['Garena'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/8d8c8dc0-4f8e-444c-a295-f651b40b1c5d.png' },
  { name: 'Nielsen', aliases: ['Nielsen'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/efe5af79-04d2-4001-96c4-3657bda9c417.png' },
  { name: 'Nestlé', aliases: ['Nestlé', 'Nestle'], url: 'https://storage.googleapis.com/audos-images/attachments/general/4f3b4dec-149a-42bf-be81-4770337e7494.png' },
  { name: 'PMAX', aliases: ['PMAX'], url: 'https://storage.googleapis.com/audos-images/attachments/general/d71f69ce-761e-4b71-bc9b-76fbff88d52b.png' },
  { name: 'Bosch', aliases: ['Bosch', 'Bosch Vietnam'], url: 'https://storage.googleapis.com/audos-images/attachments/general/0089c02b-4154-4acb-adac-7ae1d731394b.png' },
  { name: 'TTI', aliases: ['TTI', 'Techtronic Industries'], url: 'https://storage.googleapis.com/audos-images/attachments/general/9e8a22b9-0dcb-487f-8298-61d76fd4155c.png' },
  { name: 'Schneider Electric', aliases: ['Schneider Electric'], url: 'https://storage.googleapis.com/audos-images/attachments/general/98a6b4bf-969a-40f4-9f77-8a5771d51df5.png' },
  { name: 'DKSH', aliases: ['DKSH'], url: 'https://storage.googleapis.com/audos-images/attachments/general/0f34067a-3e31-48a3-856f-31d7aeef2b5c.png' },
  { name: 'Starbucks', aliases: ['Starbucks'], url: 'https://storage.googleapis.com/audos-images/attachments/general/f39744e8-e72e-4247-a352-90cf409a1a25.png' },
  { name: 'Louis Dreyfus Company', aliases: ['Louis Dreyfus Company', 'LDC'], url: 'https://storage.googleapis.com/audos-images/attachments/general/d295329d-47ac-468a-857d-7259a5e3dee0.png' },
  { name: 'Hitachi Energy', aliases: ['Hitachi Energy'], url: 'https://storage.googleapis.com/audos-images/attachments/general/58920530-9f4a-4938-a8a7-61cf60fdd673.png' },
  { name: 'ACB', aliases: ['ACB'], url: 'https://storage.googleapis.com/audos-images/attachments/general/ec9b9843-5ef9-4778-be74-739160b113dd.png' },
  { name: 'CapitaLand Vietnam', aliases: ['CapitaLand Vietnam', 'CapitaLand Development', 'CapitaLand'], url: 'https://storage.googleapis.com/audos-images/attachments/general/0ec26f72-af80-452f-9c23-43134ae80241.png' },
  { name: 'Savills', aliases: ['Savills', 'Savills Vietnam'], url: 'https://storage.googleapis.com/audos-images/attachments/general/0cec5887-b033-41a7-91d7-af755551ecd1.png' },
  { name: 'Standard Chartered', aliases: ['Standard Chartered'], url: 'https://storage.googleapis.com/audos-images/attachments/general/9605d19e-6145-46e8-bd6c-6b2a736dbd29.png' },
  { name: 'P&G', aliases: ['P&G', 'Procter & Gamble', 'Procter and Gamble'], url: 'https://storage.googleapis.com/audos-images/attachments/general/ef4ef2fe-299a-4738-9bf1-181ee79bb9c6.png' },
  { name: 'One Mount', aliases: ['One Mount', 'OneMount', 'One Mount Group'], url: 'https://storage.googleapis.com/audos-images/attachments/general/413ea521-ba6b-406d-a384-15a8446c7c92.png' },
  { name: 'Colgate-Palmolive', aliases: ['Colgate-Palmolive', 'Colgate Palmolive', 'Colgate'], url: 'https://storage.googleapis.com/audos-images/attachments/general/be0c4eef-f031-4b44-bfce-c986c0c0c450.png' },
  { name: 'ITL & SOTRANS', aliases: ['ITL & SOTRANS', 'ITL', 'SOTRANS'], url: 'https://storage.googleapis.com/audos-images/attachments/general/5fe68020-ae6c-4281-b5f1-f504c41c07b1.png' },
  { name: 'FPT Long Châu', aliases: ['FPT Long Châu', 'FPT Long Chau', 'Long Châu', 'Long Chau'], url: 'https://storage.googleapis.com/audos-images/attachments/general/8b31cc46-74b4-4af5-8a60-59a424c3aace.png' },
  { name: 'TTC AgriS', aliases: ['TTC AgriS', 'TTC Agris', 'AgriS'], url: 'https://storage.googleapis.com/audos-images/attachments/general/62136eb6-5eb9-4b9a-9538-33ad61f6788a.png' },
  { name: 'VNG', aliases: ['VNG'], url: 'https://storage.googleapis.com/audos-images/attachments/general/4176c716-9b3f-495c-96dd-aa3c01657f6b.png' },
  { name: 'WPP Media', aliases: ['WPP Media', 'WPP'], url: 'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/df982513-6caf-4e73-8e07-734bf76017c8.png' },
  { name: 'Fast Retailing', aliases: ['Fast Retailing'], url: 'https://storage.googleapis.com/audos-images/attachments/general/94b81779-b255-401a-aeed-910942568747.png' },
  { name: 'Michelin', aliases: ['Michelin', 'Michelin Vietnam'], url: 'https://storage.googleapis.com/audos-images/attachments/general/b6219961-6fad-4022-9a78-172fdf121ff5.png' },
  { name: 'Golden Gate', aliases: ['Golden Gate', 'Golden Gate Group'], url: GOLDEN_GATE_LOGO_DATA_URL },
  { name: 'AnyMind Group', aliases: ['AnyMind Group', 'AnyMind'], url: 'https://storage.googleapis.com/audos-images/attachments/general/afe46870-84d3-4bf2-ad52-97d657e76643.png' },
  { name: 'EY', aliases: ['EY', 'Ernst & Young'], url: 'https://storage.googleapis.com/audos-images/attachments/general/3b0130b4-2c73-472f-b38d-80d31795b3e6.png' },
];

function normalizeCompanyName(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export function findCompanyLogo(company: string): CompanyLogoAsset | undefined {
  const normalized = normalizeCompanyName(company);
  return COMPANY_LOGO_ASSETS.find((asset) =>
    asset.aliases.some((alias) => normalized.includes(normalizeCompanyName(alias)))
  );
}

export function getCompanyLogoUrl(company: string): string | undefined {
  return findCompanyLogo(company)?.url;
}
