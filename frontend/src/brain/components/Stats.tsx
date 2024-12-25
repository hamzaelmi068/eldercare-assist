import { useStore } from '../Pages/utils/store';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export function Stats() {
  const alerts = useStore((state) => state.alerts);
  
  // Calculate statistics
  const activeAlerts = alerts.filter(alert => alert.status === 'active').length;
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved').length;
  const totalIncidents = alerts.length;
  
  return (
    <div className="card">
      <h2 className="mb-4 flex items-center gap-2">
        <Activity className="w-8 h-8 text-primary-500" />
        Monitoring Statistics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-yellow-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold">Active Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{activeAlerts}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold">Resolved</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{resolvedAlerts}</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold">Total Incidents</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalIncidents}</p>
        </div>
      </div>
    </div>
  );
}