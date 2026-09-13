import Settings from '../../components/Settings';

// Compatibility target for old cached app://your-account links. The standalone
// navigation entry was removed; account and subscription now live in Settings.
export default function YourAccountCompatibilityView() {
  return <Settings spaceId="workspace-539150" />;
}
