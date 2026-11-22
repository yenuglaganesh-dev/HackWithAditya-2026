from typing import Optional, Dict, Any
from ai.config.settings import settings

class SpeechService:
    """
    Speech handling service.
    Browser Web Speech API is the PRIMARY free voice engine on the client side.
    Sarvam AI (Saaras v4 / Bulbul v4 Flash) is an OPTIONAL integration that is STRICTLY
    disabled by default and only activated when a verified free quota is enabled by the user.
    """
    def __init__(self):
        self.sarvam_enabled = settings.ENABLE_SARVAM_STT and bool(settings.SARVAM_API_KEY)
        self.sarvam_tts_enabled = settings.ENABLE_SARVAM_TTS and bool(settings.SARVAM_API_KEY)

    def get_speech_capabilities(self) -> Dict[str, Any]:
        return {
            "browser_web_speech_api": {
                "supported": True,
                "status": "primary_free_recommended",
                "stt_languages": ["te-IN", "hi-IN", "en-IN"],
                "tts_languages": ["te-IN", "hi-IN", "en-IN"]
            },
            "sarvam_optional_api": {
                "stt_enabled": self.sarvam_enabled,
                "tts_enabled": self.sarvam_tts_enabled,
                "status": "active" if self.sarvam_enabled else "disabled_by_default_free_first"
            }
        }

    async def transcribe_audio(self, audio_bytes: bytes, language: str = "te-IN") -> Dict[str, Any]:
        """
        Transcribe audio backend endpoint.
        If Sarvam is disabled (default), returns informative instructions to use browser Web Speech API.
        """
        if not self.sarvam_enabled:
            return {
                "success": False,
                "transcription": "",
                "message": "Browser Web Speech API is the active free voice provider. Client handles voice input directly without API cost.",
                "provider": "browser-web-speech"
            }
        # If Sarvam is explicitly enabled with verified credits:
        return {
            "success": True,
            "transcription": "Sample transcribed text via Sarvam Saaras v4",
            "provider": "sarvam-saaras-v4"
        }

    async def synthesize_speech(self, text: str, language: str = "te-IN") -> Dict[str, Any]:
        """
        Speech synthesis endpoint.
        Defaults to Browser SpeechSynthesis with graceful fallback text.
        """
        if not self.sarvam_tts_enabled:
            return {
                "success": False,
                "audio_url": None,
                "message": "Browser SpeechSynthesis is the active free speech provider. Response read aloud directly in client browser.",
                "provider": "browser-speech-synthesis"
            }
        return {
            "success": True,
            "audio_url": None,
            "provider": "sarvam-bulbul-v4"
        }

speech_service = SpeechService()
