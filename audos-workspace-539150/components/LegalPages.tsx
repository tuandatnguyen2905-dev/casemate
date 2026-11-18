import { ArrowLeft, ShieldAlert } from 'lucide-react';

export type LegalPageKind = 'terms' | 'acceptable-use';
export type LegalNavTarget = LegalPageKind | 'privacy';

type Props = {
  page: LegalPageKind;
  onClose: () => void;
  onNavigate: (target: LegalNavTarget) => void;
};

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  after?: string[];
  highlight?: boolean;
};

const CONTACT_EMAIL = 'support@casemateaud.com';
const EFFECTIVE_DATE_LABEL = '2 November 2026';

export const NSFW_PROHIBITION_STATEMENT =
  'Sexual or NSFW content is strictly prohibited. You must not use any Casemate AI generation feature to create, request or upload sexually explicit, pornographic, sexualised or otherwise NSFW content, and never anything sexual involving minors. Casemate may block such content, suspend or terminate accounts and report to the authorities where required by law.';

const TERMS_SECTIONS: Section[] = [
  {
    id: 'about',
    title: '1. Who we are and what Casemate does',
    paragraphs: [
      'Casemate (“Casemate”, “we”, “us”) is an online preparation platform for Management Trainee, graduate, internship, rotational and consulting candidates, mainly in Vietnam. These Terms of Service (“Terms”) govern your access to and use of casemateaud.com, app.casemateaud.com and the features listed below (together, the “Service”).',
      'The Service includes: Fit Assessment (CV and preference-based industry, function and program fit, plus a preparation roadmap); Case Drill (short, structured case practice with feedback); Case Pool (a library of full practice cases); Case Arena (live team case competitions); Domain Knowledge (industry learning cards and quizzes); and Aptitude Test (numerical, logical, verbal and situational practice). Some features use artificial intelligence to generate content or feedback.',
    ],
  },
  {
    id: 'accepting',
    title: '2. Accepting these Terms, eligibility and accounts',
    paragraphs: [
      'By creating an account, signing in or otherwise using the Service you agree to these Terms, our Acceptable Use Policy and our Privacy Policy. If you do not agree, do not use the Service.',
    ],
    items: [
      'You must be at least 16 years old, or the minimum age at which you can lawfully enter into this agreement where you live. If you are under the age of legal majority, you confirm that a parent or guardian has agreed to these Terms on your behalf.',
      'You sign in with your email address (using a one-time code) or another sign-in method we make available. You are responsible for keeping access to your email account and devices secure and for all activity under your account.',
      'Provide accurate information, keep one account per person, and do not share your account or let others use your paid access.',
      'Tell us at once at ' + CONTACT_EMAIL + ' if you believe your account has been accessed without permission.',
    ],
  },
  {
    id: 'plans',
    title: '3. Free and paid features, 14-day trial and billing',
    paragraphs: [
      'Fit Assessment and your personalised roadmap are free. New accounts receive 14 days of free access to the paid practice toolkit without entering payment details. After the free access period ends, continued use of paid features (such as Case Pool, Case Drill, Domain Knowledge and Aptitude Test) requires an active Casemate Pro plan.',
      'Casemate Pro is offered as several plans (for example a first-month promotional plan, a monthly plan and a 6-month plan). The price, currency, access period and any renewal terms for each plan are shown at checkout before you pay. Some plans are one-time purchases that give access for a fixed period and end automatically; where a plan renews, this is stated at checkout and you can cancel before the next renewal.',
      'Payments are processed by third-party payment providers. Vietnamese bank transfer and VietQR payments, charged in Vietnamese dong (VND), are processed by PayOS. Card payments, charged in US dollars (USD), are processed by Creem.io, which acts as the merchant of record for card payments and may appear on your card statement. Creem.io’s own terms and privacy notice apply to those card payments. We do not store your full card number.',
      'Prices may include or exclude taxes depending on your location and the payment method; any applicable taxes are shown at checkout. We may change prices or plans for future purchases; a change never affects a plan you have already paid for.',
      'Promotional or discount codes are valid only for the plans, payment methods and period stated with the code and cannot be exchanged for cash.',
    ],
  },
  {
    id: 'cancellation',
    title: '4. Cancellation and refunds',
    paragraphs: [
      'You can stop using Casemate at any time. If your plan renews automatically, you can cancel renewal before the next billing date by emailing ' + CONTACT_EMAIL + ' from the address on your account, and you will keep access until the end of the period you have already paid for. If you pay through a payment provider’s own subscription tools, you may also cancel there.',
      'Because Casemate gives immediate access to digital content and AI-generated features, payments are generally non-refundable once access has started. Exceptions: (a) if you were charged by mistake or charged twice, we will refund the duplicate or incorrect amount; (b) if you contact us within 7 days of a first-time purchase and have made little or no use of the paid features, we will review your request and may refund it at our discretion; and (c) where a refund is required by applicable law.',
      'To request a refund, email ' + CONTACT_EMAIL + ' with your account email and payment details. Approved refunds are returned to the original payment method through PayOS or Creem.io and can take several business days to appear. Nothing in these Terms limits any consumer rights you have under the law that applies to you.',
    ],
  },
  {
    id: 'content',
    title: '5. Your content and our right to process it',
    paragraphs: [
      'You may upload or enter content such as your CV, work-style and motivation answers, and answers to cases and tests (“Your Content”). You keep ownership of Your Content.',
      'You give Casemate a limited, non-exclusive, worldwide, royalty-free licence to host, store, process, analyse and display Your Content, including by sending it to AI service providers acting on our behalf, solely to provide, secure, support and improve the Service for you and as described in our Privacy Policy. If you opt in at CV confirmation, we may also use anonymised signals from your confirmed CV and fit scores for peer benchmarks and product improvement. This licence ends when you delete Your Content or your account, except for copies we must keep by law or in routine backups for a limited time.',
      'You confirm that you have the right to submit Your Content and that doing so does not break the law or anyone else’s rights. Do not upload other people’s personal data without their consent.',
    ],
  },
  {
    id: 'ai',
    title: '6. AI-generated content and educational guidance only',
    paragraphs: [
      'Parts of the Service, including fit results, feedback on your answers, generated cases and the preparation roadmap, are produced or assisted by artificial intelligence and by automated scoring. AI output can be incomplete, out of date or wrong.',
      'Everything in the Service is educational guidance only. It is not professional, career, legal, financial or immigration advice. Casemate does not guarantee any score, admission, interview, offer, job or other outcome, and a fit result is not a prediction of whether an employer will select you.',
      'Program and employer information (such as requirements, dates, deadlines and application windows) comes from public sources and our research and may change at any time without notice. Always confirm details with the employer or program before you rely on them.',
    ],
  },
  {
    id: 'acceptable-use',
    title: '7. Acceptable use',
    paragraphs: [
      'You must use the Service lawfully and in line with our Acceptable Use Policy, which forms part of these Terms. In short: do not misuse the AI features, do not copy or resell Casemate content, do not cheat on real employer assessments, do not attack or overload the Service, and do not upload content you have no right to share.',
      NSFW_PROHIBITION_STATEMENT,
    ],
  },
  {
    id: 'ip',
    title: '8. Casemate’s intellectual property',
    paragraphs: [
      'The Service and everything in it, including cases, case solutions and marking guides, exhibits, aptitude questions and explanations, domain knowledge cards, program data, scoring methods, software, branding and design, belongs to Casemate or its licensors and is protected by intellectual property laws.',
      'We give you a personal, non-exclusive, non-transferable, revocable right to use the Service for your own preparation. You must not copy, scrape, download in bulk, republish, redistribute, share outside your own use, sell, sublicense or create derivative products from Casemate content (including cases and cards), or use it to train another AI or machine-learning model, without our written permission.',
    ],
  },
  {
    id: 'termination',
    title: '9. Suspension and termination',
    paragraphs: [
      'You may stop using the Service and ask us to delete your account at any time by emailing ' + CONTACT_EMAIL + '.',
      'We may suspend, restrict or terminate your access, with or without notice, if you breach these Terms or the Acceptable Use Policy, if your use creates risk or legal exposure for us or others, or if required by law. Where we terminate for your breach, we may refuse a refund of the current period. Sections that by their nature should survive termination (including content licences, intellectual property, disclaimers, limitation of liability and governing law) will survive.',
    ],
  },
  {
    id: 'disclaimer',
    title: '10. Service availability and disclaimers',
    paragraphs: [
      'We work to keep Casemate available and accurate, but the Service is provided “as is” and “as available”. To the extent permitted by law, we do not promise that it will be uninterrupted, error-free or that content will always be current, and we disclaim all warranties not expressly stated in these Terms.',
    ],
  },
  {
    id: 'liability',
    title: '11. Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, Casemate and its owners, team members and suppliers are not liable for indirect, incidental, special, consequential or punitive damages, or for loss of opportunity, employment, profits, data or goodwill, arising from your use of or inability to use the Service or from reliance on AI-generated content.',
      'To the maximum extent permitted by law, our total liability to you for any claim relating to the Service is limited to the amount you paid to Casemate for the Service in the 12 months before the event giving rise to the claim. Nothing in these Terms excludes liability that cannot be excluded under applicable law.',
    ],
  },
  {
    id: 'law',
    title: '12. Governing law and disputes',
    paragraphs: [
      'These Terms are governed by the laws of the Socialist Republic of Vietnam, without regard to conflict-of-law rules. Please contact us first at ' + CONTACT_EMAIL + ' so we can try to resolve any concern informally. If a dispute cannot be resolved, it will be submitted to the competent courts of Vietnam, unless mandatory consumer-protection law where you live gives you the right to bring a claim elsewhere.',
    ],
  },
  {
    id: 'changes',
    title: '13. Changes to these Terms',
    paragraphs: [
      'We may update these Terms from time to time, for example when we add features or change how we operate. We will post the updated version on this page with a new effective date, and for material changes we will take reasonable steps to notify you (for example by email or an in-product notice). Continuing to use the Service after the effective date means you accept the updated Terms.',
    ],
  },
  {
    id: 'contact',
    title: '14. Contact',
    paragraphs: [
      'Questions about these Terms, billing or refunds? Email us at ' + CONTACT_EMAIL + '. We typically respond within 24–48 hours.',
    ],
  },
];

const AUP_SECTIONS: Section[] = [
  {
    id: 'scope',
    title: '1. Scope',
    paragraphs: [
      'This Acceptable Use Policy explains what you may and may not do with Casemate, in particular with our AI-generated case and preparation features: AI-generated feedback on your answers, Fit Assessment and roadmap generation, and the generation of practice cases and explanations. It applies to everyone who uses Casemate and is part of our Terms of Service.',
    ],
  },
  {
    id: 'allowed',
    title: '2. What you can do',
    items: [
      'Use Casemate for your own career exploration and interview and aptitude test preparation.',
      'Upload your own CV and enter your own answers so the AI features can assess your fit, give feedback and build a roadmap.',
      'Practise cases, drills, aptitude tests and domain knowledge as often as your plan allows.',
      'Take part in Case Arena sessions respectfully with your teammates and other participants.',
      'Share feedback with us, including reporting AI output you think is wrong, unsafe or inappropriate.',
    ],
  },
  {
    id: 'prohibited',
    title: '3. What you must not do',
    paragraphs: ['You must not use Casemate, or any AI feature in it, to:'],
    items: [
      'Break any law or regulation, or help someone else do so.',
      'Harass, threaten, bully, stalk or discriminate against anyone, or create or share hateful, violent or abusive content, including in Case Arena team spaces.',
      'Impersonate another person or organisation, or misrepresent your identity, education, experience or affiliation, including by submitting a CV that is not yours.',
      'Upload, enter or request another person’s personal data (including their CV, contact details or identity documents) without their clear consent.',
      'Cheat on real employer assessments, online tests or interviews, for example by using Casemate or its AI features to obtain answers during a live, proctored or time-limited employer test, or by sharing a real employer’s confidential test content.',
      'Scrape, crawl, bulk-download, copy, republish, redistribute, resell or sublicense Casemate cases, questions, answers, cards, program data or other content, or use them to train, fine-tune or evaluate another AI model.',
      'Share your account or paid access with others, or try to avoid paying for features that require a plan.',
      'Bypass, probe or defeat access controls, trial limits, rate limits, paywalls, scoring or safety measures, or otherwise abuse the AI features, for example with automated bots, scripts, or excessive or repetitive requests intended to overload the Service or to extract model prompts, grading rubrics or hidden answers.',
      'Try to manipulate the AI into producing harmful, deceptive or policy-violating output (for example through prompt-injection or “jailbreak” attempts), or present AI-generated output as guaranteed fact.',
      'Upload or transmit viruses, malicious code or anything designed to disrupt, damage or gain unauthorised access to the Service, its users or our systems.',
      'Infringe copyright, trademarks or other intellectual-property or privacy rights.',
    ],
  },
  {
    id: 'nsfw',
    title: '4. Sexual or NSFW content is strictly prohibited',
    paragraphs: [
      NSFW_PROHIBITION_STATEMENT,
      'This applies to everything you type, paste, upload or request in Casemate, including CV text and images, answers, case prompts, Case Arena messages and feedback forms, and to all AI-generated output. Casemate is a professional career-preparation product; it must not be used to generate or store adult content of any kind.',
      'We use automated and manual checks to detect prohibited content. If we find or reasonably suspect a breach we may refuse or block the request, remove the content, restrict or suspend features, terminate your account without refund of the current period, and preserve and report relevant information to law enforcement or other competent authorities, including child-safety organisations, where the law requires or permits.',
    ],
    highlight: true,
  },
  {
    id: 'ai-limits',
    title: '5. About AI-generated output',
    paragraphs: [
      'AI-generated feedback, fit results, cases and roadmaps are educational guidance only, can contain mistakes and are not a guarantee of any admission, interview or job outcome. You are responsible for how you use the output. Please do not enter sensitive personal data (such as government ID numbers, health information or financial account details) into free-text fields; the Service does not need it.',
    ],
  },
  {
    id: 'reporting',
    title: '6. Reporting a problem',
    paragraphs: [
      'If you see content or behaviour in Casemate that breaks this policy, or AI output that is unsafe or inappropriate, email ' + CONTACT_EMAIL + ' with as much detail as you can (what happened, where, and when). We review reports and take action where needed.',
    ],
  },
  {
    id: 'enforcement',
    title: '7. Enforcement and changes',
    paragraphs: [
      'Depending on the seriousness of a breach, we may issue a warning, limit or disable features, suspend or terminate accounts and take legal action. We may update this policy from time to time; the effective date above shows the latest version, and continued use of Casemate means you accept the update.',
    ],
  },
];

const PAGE_COPY: Record<LegalPageKind, { title: string; intro: string; sections: Section[] }> = {
  terms: {
    title: 'Terms of Service',
    intro: 'The rules for using Casemate: what the service does, how plans and payments work, and what you can expect from us and we from you.',
    sections: TERMS_SECTIONS,
  },
  'acceptable-use': {
    title: 'Acceptable Use Policy',
    intro: 'How to use Casemate and its AI-generated case and preparation features responsibly, including our strict ban on sexual or NSFW content.',
    sections: AUP_SECTIONS,
  },
};

const NAV_LINKS: { target: LegalNavTarget; label: string; href: string }[] = [
  { target: 'terms', label: 'Terms of Service', href: '/terms' },
  { target: 'acceptable-use', label: 'Acceptable Use Policy', href: '/acceptable-use' },
  { target: 'privacy', label: 'Privacy Policy', href: '/privacy-policy' },
];

export default function LegalPages({ page, onClose, onNavigate }: Props) {
  const copy = PAGE_COPY[page];
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <header className="sticky top-0 z-10 border-b border-[#e5e7eb] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/" onClick={(event) => { event.preventDefault(); onClose(); }} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#374151] hover:bg-[#f3f4f6]"><ArrowLeft className="h-4 w-4" />Back to Casemate</a>
          <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#cc0000] text-sm font-black text-white">C</span><span className="font-extrabold">Casemate</span></div>
        </div>
      </header>

      <main>
        <section className="border-b border-[#e5e7eb] bg-[#0f172a] text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#fca5a5]">Direction first. Prep second.</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">{copy.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{copy.intro}</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-9">
            <p className="text-sm font-semibold text-[#374151]">Effective date: {EFFECTIVE_DATE_LABEL} (2026-11-02)</p>
            <p className="mt-3 text-sm leading-7 text-[#6b7280]">
              Casemate is operated from Vietnam. Questions? Email <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[#cc0000] hover:underline">{CONTACT_EMAIL}</a>. See also our{' '}
              {page === 'terms'
                ? <a href="/acceptable-use" onClick={(event) => { event.preventDefault(); onNavigate('acceptable-use'); }} className="font-bold text-[#cc0000] hover:underline">Acceptable Use Policy</a>
                : <a href="/terms" onClick={(event) => { event.preventDefault(); onNavigate('terms'); }} className="font-bold text-[#cc0000] hover:underline">Terms of Service</a>}
              {' '}and{' '}
              <a href="/privacy-policy" onClick={(event) => { event.preventDefault(); onNavigate('privacy'); }} className="font-bold text-[#cc0000] hover:underline">Privacy Policy</a>.
            </p>
          </div>

          {copy.sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className={section.highlight
                ? 'scroll-mt-24 rounded-3xl border-2 border-[#cc0000] bg-[#fff5f5] p-6 sm:p-9'
                : 'scroll-mt-24 rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-9'}
            >
              <div className="flex items-start gap-3">
                {section.highlight && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#cc0000] text-white"><ShieldAlert className="h-5 w-5" /></span>}
                <h2 className="text-xl font-extrabold leading-snug sm:text-2xl">{section.title}</h2>
              </div>
              {section.paragraphs?.map((text, index) => (
                <p key={index} className={`mt-4 leading-7 sm:leading-8 ${section.highlight && index === 0 ? 'font-bold text-[#111827]' : 'text-[#4b5563]'}`}>{text}</p>
              ))}
              {section.items && (
                <ul className="mt-4 list-disc space-y-2.5 pl-5 leading-7 text-[#4b5563] marker:text-[#cc0000] sm:leading-8">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.after?.map((text, index) => <p key={index} className="mt-4 leading-7 text-[#4b5563] sm:leading-8">{text}</p>)}
            </article>
          ))}

          <p className="px-1 text-xs leading-6 text-[#6b7280]">This page is a plain-language policy for Casemate users and is not legal advice.</p>
        </section>
      </main>

      <footer className="bg-black text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="font-extrabold">Casemate</p><p className="mt-1 text-sm text-white/55">Direction first. Prep second.</p></div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold" aria-label="Legal pages">
            <a href="/about" className="text-white/65 hover:text-white">About Us</a>
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                href={link.href}
                onClick={(event) => { event.preventDefault(); onNavigate(link.target); }}
                aria-current={link.target === page ? 'page' : undefined}
                className={link.target === page ? 'text-white' : 'text-white/65 hover:text-white'}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-semibold text-white/65 hover:text-white">{CONTACT_EMAIL}</a>
        </div>
      </footer>
    </div>
  );
}
