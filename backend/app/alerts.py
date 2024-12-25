from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import databutton as db

from models import Alert, AlertCreate
from notifications import store_alert, send_alert_email, sanitize_key

router = APIRouter()

@router.get("/alerts", response_model=List[Alert])
def get_alerts() -> List[Alert]:
    """Get list of alerts"""
    try:
        alerts = db.storage.json.get(sanitize_key("alerts"), default=[])
        return [Alert(**alert) for alert in alerts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/alerts/{alert_id}/resolve")
def resolve_alert(alert_id: str) -> Alert:
    """Resolve an alert"""
    try:
        alerts = db.storage.json.get(sanitize_key("alerts"), default=[])
        
        # Find and update the alert
        for alert in alerts:
            if alert["id"] == alert_id:
                alert["status"] = "resolved"
                alert["resolved_at"] = datetime.now().isoformat()
                db.storage.json.put(sanitize_key("alerts"), alerts)
                return Alert(**alert)
        
        raise HTTPException(status_code=404, detail="Alert not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))