import { create } from 'zustand';
import { Alert, MedicationReminder } from './types';

interface State {
  alerts: Alert[];
  medications: MedicationReminder[];
  addAlert: (alert: Alert) => void;
  resolveAlert: (id: string) => void;
  toggleMedication: (id: string) => void;
}

export const useStore = create<State>((set) => ({
  alerts: [
    {
      id: '1',
      type: 'fall',
      timestamp: new Date().toISOString(),
      status: 'active',
      description: 'Possible fall detected in living room',
    },
  ],
  medications: [
    {
      id: '1',
      name: 'Blood Pressure Medication',
      time: '09:00',
      taken: false,
      description: 'Take with breakfast',
    },
    {
      id: '2',
      name: 'Vitamin D',
      time: '13:00',
      taken: false,
      description: 'Take with lunch',
    },
  ],
  addAlert: (alert) =>
    set((state) => ({ alerts: [alert, ...state.alerts] })),
  resolveAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, status: 'resolved' } : alert
      ),
    })),
  toggleMedication: (id) =>
    set((state) => ({
      medications: state.medications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      ),
    })),
}));


