import httpx
import base64
import logging
from typing import Dict, Any, Optional
from ai.config.settings import settings

logger = logging.getLogger(__name__)

class SpeechService:
    """
    Dedicated Speech Service with verified Sarvam AI integration and Browser fallback.
    - TTS: High-fidelity regional Indian voices using Sarvam Bulbul v3 ('kavya', 'aditya', 'ritu', 'priya').
    - Fallback: Browser native SpeechSynthesis.
    """
    def __init__(self):
        pass

    def is_sarvam_tts_active(self) -> bool:
        return settings.ENABLE_SARVAM_TTS and bool(settings.SARVAM_API_KEY and len(settings.SARVAM_API_KEY.strip()) > 10)

    def get_speech_capabilities(self) -> Dict[str, Any]:
        return {
            "browser_web_speech_api": {
                "supported": True,
                "status": "primary_free_client_native",
                "stt_languages": ["te-IN", "hi-IN", "en-IN"],
                "tts_languages": ["te-IN", "hi-IN", "en-IN"]
            },
            "sarvam_tts_api": {
                "active": self.is_sarvam_tts_active(),
                "model": "bulbul:v3",
                "status": "ready" if self.is_sarvam_tts_active() else "disabled_by_default"
            }
        }

    async def synthesize_speech(self, text: str, language: str = "te") -> Dict[str, Any]:
        """
        Synthesizes text into natural regional speech using Sarvam Bulbul v3 if enabled,
        or returns clean instructions for Browser SpeechSynthesis.
        """
        if not self.is_sarvam_tts_active() or not text:
            return {
                "success": False,
                "audio_base64": None,
                "provider": "browser-speech-synthesis",
                "message": "Using browser client native speech synthesis."
            }

        # Map language code to Sarvam format
        lang_map = {
            "te": "te-IN", "te-IN": "te-IN",
            "hi": "hi-IN", "hi-IN": "hi-IN",
            "en": "en-IN", "en-IN": "en-IN"
        }
        target_lang = lang_map.get(language, "te-IN")

        # Select natural speaker for Bulbul:v3
        speaker = "kavya" if target_lang == "te-IN" else ("priya" if target_lang == "hi-IN" else "aditya")

        # Clean markdown symbols from voice reading
        clean_text = text.replace("*", "").replace("#", "").replace("`", "").replace(">", "").strip()
        # Truncate to first 450 characters for rapid low-latency synthesis
        if len(clean_text) > 450:
            clean_text = clean_text[:450] + "..."

        headers = {
            "api-subscription-key": settings.SARVAM_API_KEY.strip(),
            "Content-Type": "application/json"
        }
        payload = {
            "inputs": [clean_text],
            "target_language_code": target_lang,
            "speaker": speaker,
            "pitch": 0,
            "pace": 1.0,
            "loudness": 1.5,
            "speech_sample_rate": 8000,
            "enable_preprocessing": True,
            "model": "bulbul:v3"
        }

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                resp = await client.post(
                    "https://api.sarvam.ai/text-to-speech",
                    json=payload,
                    headers=headers
                )
                if resp.status_code == 200:
                    data = resp.json()
                    audios = data.get("audios", [])
                    if audios and len(audios) > 0:
                        return {
                            "success": True,
                            "audio_base64": audios[0],
                            "content_type": "audio/wav",
                            "provider": "sarvam-bulbul-v3",
                            "speaker": speaker,
                            "language": target_lang
                        }
                logger.warning(f"Sarvam TTS failed with HTTP {resp.status_code}: {resp.text}")
        except Exception as e:
            logger.error(f"Sarvam TTS exception: {str(e)}")

        return {
            "success": False,
            "audio_base64": None,
            "provider": "browser-speech-synthesis-fallback",
            "message": "Sarvam unavailable, falling back to browser SpeechSynthesis."
        }

speech_service = SpeechService()
