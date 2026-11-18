// Vietnamese terminology guide for Learning Hub translations. Every Vietnamese lesson, case study, flashcard
// and activity uses the preferred form; `avoid` lists variants that must not appear in translated content
// (checked by __tests__/localizationVi.test.ts). Acronyms stay in Latin script so Essential Terms and inline
// glossary lookup (which match acronyms) keep working inside Vietnamese text.

export interface ViTerm {
  en: string;
  vi: string;
  note?: string;
  avoid?: string[];
}

export const VI_TERMINOLOGY: ViTerm[] = [
  { en: 'Commercial bank', vi: 'ngân hàng thương mại (NHTM)' },
  { en: 'Joint-stock commercial bank', vi: 'ngân hàng thương mại cổ phần (ngân hàng TMCP)' },
  { en: 'State-controlled / state-owned bank', vi: 'ngân hàng có vốn nhà nước chi phối / ngân hàng thương mại nhà nước', note: 'Use the official SBV category name “ngân hàng thương mại nhà nước” only for the taxonomy category.', avoid: ['ngân hàng quốc doanh'] },
  { en: 'State Bank of Vietnam (SBV)', vi: 'Ngân hàng Nhà nước Việt Nam (NHNN)', note: 'Keep “SBV” only where a source title or glossary acronym needs it.' },
  { en: 'ICBC', vi: 'ICBC (Ngân hàng Công thương Trung Quốc)', note: 'ICBC is a bank (Industrial and Commercial Bank of China); never translate it as a company or institution of another type.' },
  { en: 'Deposit / deposits', vi: 'tiền gửi; tiền gửi của khách hàng (khoản mục nợ phải trả)' },
  { en: 'Term deposit', vi: 'tiền gửi có kỳ hạn' },
  { en: 'Current account', vi: 'tài khoản thanh toán' },
  { en: 'CASA', vi: 'CASA (tiền gửi không kỳ hạn: tài khoản thanh toán và tiết kiệm không kỳ hạn)', note: 'Keep the acronym; the ratio is “tỷ lệ CASA”. Bank definitions differ (e.g. Auto-earning counted in savings).' },
  { en: 'Lending / loan', vi: 'cho vay / khoản vay; dư nợ cho vay (balance)' },
  { en: 'Credit', vi: 'tín dụng; dư nợ tín dụng (outstanding credit)' },
  { en: 'Credit room', vi: 'room tín dụng (hạn mức tăng trưởng tín dụng do NHNN giao)' },
  { en: 'Disbursement', vi: 'giải ngân', note: 'Never use for outstanding-credit growth.' },
  { en: 'Interest income / net interest income (NII)', vi: 'thu nhập lãi / thu nhập lãi thuần (NII)' },
  { en: 'Non-interest income / fee income', vi: 'thu nhập ngoài lãi / thu nhập phí' },
  { en: 'Net interest margin (NIM)', vi: 'biên lãi ròng (NIM)', avoid: ['biên lợi nhuận lãi'] },
  { en: 'Cost of funds', vi: 'chi phí vốn', note: 'Weighted-average cost of funds: “chi phí vốn bình quân gia quyền”.' },
  { en: 'Credit risk', vi: 'rủi ro tín dụng' },
  { en: 'Liquidity / liquidity risk', vi: 'thanh khoản / rủi ro thanh khoản' },
  { en: 'Liquidity transformation / maturity transformation', vi: 'chuyển hóa thanh khoản / chuyển hóa kỳ hạn' },
  { en: 'Capital adequacy / CAR', vi: 'an toàn vốn / hệ số an toàn vốn (CAR)' },
  { en: 'Risk-weighted assets (RWA)', vi: 'tài sản có rủi ro (RWA)' },
  { en: 'Non-performing loan (NPL) / NPL ratio', vi: 'nợ xấu (NPL) / tỷ lệ nợ xấu', avoid: ['nợ khó đòi'] },
  { en: 'Provisions', vi: 'dự phòng (rủi ro)', note: 'Not the same as the NPL ratio.' },
  { en: 'Bancassurance', vi: 'bancassurance (phân phối bảo hiểm qua ngân hàng)', note: 'The bank earns commission; premiums belong to the insurer.' },
  { en: 'Financial intermediation', vi: 'trung gian tài chính' },
  { en: 'Deposit insurance (DIV)', vi: 'bảo hiểm tiền gửi; Bảo hiểm Tiền gửi Việt Nam (DIV)', note: 'Always capped and conditional; never “bảo đảm toàn bộ”.' },
  { en: 'Law on Credit Institutions', vi: 'Luật Các tổ chức tín dụng' },
  { en: 'Prudential regulation / supervision', vi: 'quy định an toàn (prudential) / giám sát an toàn' },
  { en: 'Resolution', vi: 'xử lý ngân hàng đổ vỡ', note: 'Resolution protects critical functions, not every investor.' },
  { en: 'Systemic risk', vi: 'rủi ro hệ thống' },
  { en: 'Relationship manager (RM)', vi: 'chuyên viên quan hệ khách hàng (RM)' },
  { en: 'SME', vi: 'SME (doanh nghiệp nhỏ và vừa)' },
  { en: 'Trade finance / letter of credit', vi: 'tài trợ thương mại / thư tín dụng (L/C)' },
  { en: 'Cash management', vi: 'quản lý dòng tiền' },
  { en: 'Treasury services', vi: 'dịch vụ ngân quỹ' },
  { en: 'Stock / flow', vi: 'số dư (stock) / dòng chảy (flow)' },
  { en: 'Company-reported', vi: 'theo số liệu do ngân hàng công bố', note: 'Keeps the fact-versus-analysis distinction of case studies.' },
  { en: 'Approximately / about / roughly', vi: 'khoảng', note: 'Never drop an approximation qualifier.' },
  { en: 'Verification Required — Do Not Publish', vi: 'Cần xác minh — Không xuất bản' },
  { en: 'Under Review (status)', vi: 'Đang được rà soát', note: 'Display only; the internal status value stays English.' },
];

/** Variants that must never appear in Vietnamese learning content. */
export const VI_AVOIDED_TERMS: string[] = VI_TERMINOLOGY.flatMap((entry) => entry.avoid ?? []);
