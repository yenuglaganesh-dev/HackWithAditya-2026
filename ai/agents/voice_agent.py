from typing import Dict, Any
from ai.services.speech_service import speech_service

class VoiceAgent:
    """
    AGENT 7: VOICE AGENT
    Responsibilities:
    - Coordinate speech recognition (STT) and speech synthesis (TTS).
    - Provide text fallback for unsupported browser speech engines.
    - Guide client-side Web Speech API and handle regional dialect speech gracefully.
    """
    def __init__(self):
        self.speech_service = speech_service

    def get_voice_status(self, client_has_speech_api: bool = True) -> Dict[str, Any]:
        return {
            "voice_enabled": True,
            "provider": "Web Speech API (Browser Native)",
            "supported_languages": {
                "te-IN": "Telugu (India)",
                "hi-IN": "Hindi (India)",
                "en-IN": "English (India)"
            },
            "client_supported": client_has_speech_api,
            "tts_ready": True
        }

voice_agent = VoiceAgent()
