import brain from 'brain';
import { useStore } from '@/utils/store';

export function YourComponent() {
  const alerts = useStore((state) => state.alerts);
  const setAlerts = useStore((state) => state.setAlerts);

  // Example usage
  React.useEffect(() => {
    async function fetchAlerts() {
      const alerts = await brain.get_alerts();
      setAlerts(alerts);
    }
    fetchAlerts();
  }, [setAlerts]);

  return (
    // Your component JSX
  );
}