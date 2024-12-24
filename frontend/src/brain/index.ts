// src/brain/index.ts
import { Alert, ProcessFrameResponse } from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const brain = {
  get_alerts: async (): Promise<Alert[]> => {
    const response = await fetch(`${API_URL}/api/alerts`);
    if (!response.ok) {
      throw new Error('Failed to fetch alerts');
    }
    const data = await response.json();
    return data as Alert[];
  },

  resolve_alert: async (alert_id: string): Promise<Alert> => {
    const response = await fetch(`${API_URL}/api/alerts/${alert_id}/resolve`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to resolve alert');
    }
    const data = await response.json();
    return data as Alert;
  },

  process_frame: async (frameData: string): Promise<ProcessFrameResponse> => {
    const response = await fetch(`${API_URL}/api/process-frame`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ frame_data: frameData }), // Match the backend expected format
    });
    if (!response.ok) {
      throw new Error('Failed to process frame');
    }
    const data = await response.json();
    return data as ProcessFrameResponse;
  },
};

export default brain;