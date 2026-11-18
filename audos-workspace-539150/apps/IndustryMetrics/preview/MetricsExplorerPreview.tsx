// Standalone preview of the Metrics Explorer. Not registered in config.json or the Domain
// Knowledge app; mount it anywhere (or register it temporarily as an app) to review.
// The reviewer toggle is switched on here so pending and rejected metrics can be inspected;
// the Explorer hides them from learners unless allowPendingToggle is set.
import MetricsExplorer from '../components/MetricsExplorer';

export default function MetricsExplorerPreview() {
  return (
    <div style={{ minHeight: '100%', background: '#ffffff' }}>
      <MetricsExplorer initialCurriculumId="banking-commercial" allowPendingToggle />
    </div>
  );
}
