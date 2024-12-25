import React, { useEffect } from 'react';
import { useStore } from '../Pages/utils/store';
import { Bell, CheckCircle } from 'lucide-react';
import brain from 'brain';
import { toast } from 'sonner';

export function AlertList() {
  const { alerts, resolveAlert } = useStore();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await brain.get_alerts();
        const serverAlerts = response; // Directly use the response as it is already an array
        // Update local state with server alerts
        serverAlerts.forEach((alert: any) => {
          if (alert.status === 'active') {
            resolveAlert(alert.id);
          }
        });
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, [resolveAlert]);

  const handleResolve = async (alertId: string) => {
    try {
      const response = await brain.resolve_alert(alertId);
      //await response.json(); // Correctly parse the JSON response
      resolveAlert(alertId);
      toast.success('Alert resolved');
    } catch (error) {
      console.error('Error resolving alert:', error);
      toast.error('Failed to resolve alert');
    }
  };

  return (
    <div className="card mt-6">
      <h2 className="mb-4 flex items-center gap-2">
        <Bell className="w-8 h-8 text-primary-500" />
        Alerts
      </h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-center justify-between p-2 border-b">
            <div>
              <p>{alert.description}</p>
              <p className="text-sm text-gray-500">{alert.timestamp}</p>
            </div>
            <button
              className="flex items-center gap-2 text-green-600"
              onClick={() => handleResolve(alert.id)}
            >
              <CheckCircle className="w-5 h-5" />
              Resolve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}