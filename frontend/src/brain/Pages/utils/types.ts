export interface Alert {
  id: string;
  type: 'fall' | 'unusual';
  timestamp: string;
  status: 'active' | 'resolved';
  description: string;
}

export interface MedicationReminder {
  id: string;
  name: string;
  time: string;
  taken: boolean;
  description: string;
}