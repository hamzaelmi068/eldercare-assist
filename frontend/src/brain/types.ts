
// src/types.ts 
export interface Alert {

id: string;
type: string;
description: string;
timestamp: string;
status: 'active' | 'resolved';
location?: string;
confidence?: number;
}
export interface ProcessFrameResponse {
    
detected_fall: boolean;
confidence: number;
timestamp: string;
}
export interface UserLogin {
username: string;
password: string;
}

export interface LoginResponse {
access_token: string;
token_type: string;
}