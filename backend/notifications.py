from fastapi import APIRouter
import databutton as db
from typing import List
import re

router = APIRouter()

def sanitize_key(key: str) -> str:
    """Sanitize storage key to only allow alphanumeric and ._- symbols"""
    return re.sub(r'[^a-zA-Z0-9._-]', '', key)

def send_alert_email(to: List[str], alert_type: str, description: str) -> None:
    """Send alert notification via email"""
    subject = f"ElderCareAssist Alert: {alert_type}"
    content_html = f"""
    <h1>Alert: {alert_type}</h1>
    <p>{description}</p>
    <p>Please check the ElderCareAssist dashboard for more details.</p>
    """
    
    content_text = f"""
    Alert: {alert_type}
    
    {description}
    
    Please check the ElderCareAssist dashboard for more details.
    """
    
    try:
        db.notify.email(
            to=to,
            subject=subject,
            content_html=content_html,
            content_text=content_text
        )
    except Exception as e:
        print(f"Failed to send alert email: {str(e)}")

def store_alert(alert_data: dict) -> None:
    """Store alert in the database"""
    try:
        alerts = db.storage.json.get(sanitize_key("alerts"), default=[])
        alerts.append(alert_data)
        db.storage.json.put(sanitize_key("alerts"), alerts)
    except Exception as e:
        print(f"Failed to store alert: {str(e)}")