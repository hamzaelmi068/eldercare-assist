import React, { useEffect } from 'react';
import { useStore } from '../utils/store';
import { Bell, CheckCircle } from 'lucide-react';
import brain from 'brain';
import { toast } from 'sonner';

export function AlertList() {
  const { alerts, resolveAlert } = useStore();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await brain.get_alerts();
        const serverAlerts = await response.json();
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
      await response.json();
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
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl flex items-center justify-between ${alert.status === 'active' ? 'bg-red-50' : 'bg-green-50'}`}
          >
            <div>
              <p className="text-xl font-semibold">{alert.description}</p>
              <p className="text-gray-600">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
            {alert.status === 'active' && (
              <button
                onClick={() => handleResolve(alert.id)}
                className="btn-secondary flex items-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                Resolve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}