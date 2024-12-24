from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import numpy as np
from datetime import datetime

router = APIRouter()

class FrameData(BaseModel):
    frame: str
    timestamp: Optional[datetime] = None
    device_id: Optional[str] = None

class FallDetectionResponse(BaseModel):
    fall_detected: bool
    confidence: float
    timestamp: datetime
    device_id: Optional[str] = None
    processing_time_ms: float

@router.post("/detect-fall", response_model=FallDetectionResponse)
async def detect_fall(frame_data: FrameData):
    try:
        start_time = datetime.now()
        
        # Decode and preprocess frame
        frame_array = decode_frame(frame_data.frame)
        processed_frame = preprocess_frame(frame_array)
        
        # Run fall detection
        is_fall, confidence = fall_detection_model.predict(processed_frame)
        
        # Calculate processing time
        processing_time = (datetime.now() - start_time).total_seconds() * 1000
        
        return FallDetectionResponse(
            fall_detected=is_fall,
            confidence=float(confidence),
            timestamp=frame_data.timestamp or datetime.now(),
            device_id=frame_data.device_id,
            processing_time_ms=processing_time
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error processing frame")

# Add logging endpoint
class FallLog(BaseModel):
    device_id: str
    timestamp: datetime
    confidence: float
    action_taken: Optional[str]

@router.post("/log-fall")
async def log_fall(log_data: FallLog):
    try:
        # TODO: Implement fall logging to database
        return {"status": "success", "message": "Fall logged successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to log fall event")