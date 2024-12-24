// src/brain/types.ts
export interface Alert {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status: string;
  location?: string;
  confidence?: number;
}

export interface ProcessFrameRequest {
  frame_data: string;
}

export interface ProcessFrameResponse {
  detected_fall: boolean;
  confidence: number;
  timestamp: string;
}