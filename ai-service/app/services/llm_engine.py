import os
import json
import httpx
from typing import Dict, Any, Optional

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

async def call_gemini(prompt: str, system_prompt: str = "") -> Optional[str]:
    """Call Google Gemini API if API key is present."""
    if not GEMINI_API_KEY:
        return None
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [
                {"role": "user", "parts": [{"text": f"{system_prompt}\n\n{prompt}" if system_prompt else prompt}]}
            ],
            "generationConfig": {
                "temperature": 0.3,
                "response_mime_type": "application/json"
            }
        }
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print(f"[LLM Engine] Gemini API error: {e}")
    return None
