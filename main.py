from fastapi import FastAPI, Request
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

LINGO_API_KEY = os.getenv("LINGO_API_KEY")

app = FastAPI()

class TranslationRequest(BaseModel):
    text: str
    sourceLocale: str | None = None  # Optional; auto-detect if null
    targetLocale: str

@app.post("/translate")
async def translate_text(payload: TranslationRequest):
    headers = {
        "Authorization": f"Bearer {LINGO_API_KEY}",
        "Content-Type": "application/json"
    }

    json_data = {
        "text": payload.text,
        "sourceLocale": payload.sourceLocale,
        "targetLocale": payload.targetLocale
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://api.lingo.dev/v1/localize/text",
                headers=headers,
                json=json_data
            )
            response.raise_for_status()
            return {"translated": response.json()["localizedText"]}
        except httpx.HTTPStatusError as exc:
            return {"error": f"Lingo API error: {exc.response.text}"}
        except Exception as e:
            return {"error": str(e)}
