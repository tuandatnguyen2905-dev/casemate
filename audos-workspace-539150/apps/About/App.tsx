import LandingFeaturePages from '../../components/features/LandingFeaturePages';
import { PUBLIC_PAGE_SEO } from '../../lib/publicSeo';

const FONT_STACK = '"Inter", system-ui, -apple-system, sans-serif';

export default function AboutApp() {
  return (
    <LandingFeaturePages
      page="about"
      brandName="Casemate"
      headingFontStack={FONT_STACK}
      bodyFontStack={FONT_STACK}
      onNavigate={(next) => window.location.assign(PUBLIC_PAGE_SEO[next].path)}
      onHome={() => window.location.assign('/')}
      onSignUp={() => window.location.assign('/')}
    />
  );
}
