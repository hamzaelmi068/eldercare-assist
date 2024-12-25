from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import List
import numpy as np

from models import Alert, AlertCreate
from ml_utils import decode_frame, preprocess_frame, fall_detection_model
from notifications import store_alert, send_alert_email

router = APIRouter()

@router.post("/process-frame")
def process_frame(frame_data: str) -> dict:
    """Process a video frame for fall detection"""
    try:
        # Decode and preprocess frame
        frame_array = decode_frame(frame_data)
        processed_frame = preprocess_frame(frame_array)
        
        # Run fall detection
        is_fall, confidence = fall_detection_model.predict(processed_frame)
        
        # If fall detected, create alert
        if is_fall:
            alert = AlertCreate(
                type="fall",
                description=f"Possible fall detected (Confidence: {confidence:.2%})",
                confidence=confidence,
                location="Living Room"  # TODO: Add actual location detection
            )
            
            # Store alert
            alert_data = {
                "id": datetime.now().isoformat(),
                **alert.dict(),
                "timestamp": datetime.now().isoformat(),
                "status": "active"
            }
            store_alert(alert_data)
            
            # Send notification
            send_alert_email(
                to=["caregiver@example.com"],  # TODO: Get from configuration
                alert_type="Fall Detection",
                description=alert.description
            )
        
        return {
            "detected_fall": is_fall,
            "confidence": confidence,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))