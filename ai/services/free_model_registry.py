from typing import List, Dict, Any, Optional
import httpx
from ai.schemas.api_models import ModelInfo

class FreeModelRegistry:
    """
    Enforces strict free-first models.
    Guarantees no paid models are ever silently selected.
    Pricing must be zero.
    """
    # Curated verified free OpenRouter models
    VERIFIED_FREE_MODELS: List[Dict[str, Any]] = [
        {
            "id": "openrouter/free",
            "name": "OpenRouter Free Router (Auto-Fallback)",
            "is_free": True,
            "context_length": 8192,
            "prompt_pricing": 0.0,
            "completion_pricing": 0.0
        },
        {
            "id": "meta-llama/llama-3.3-70b-instruct:free",
            "name": "Llama 3.3 70B Instruct (Free)",
            "is_free": True,
            "context_length": 16384,
            "prompt_pricing": 0.0,
            "completion_pricing": 0.0
        },
        {
            "id": "google/gemini-2.0-flash-exp:free",
            "name": "Google Gemini 2.0 Flash (Free)",
            "is_free": True,
            "context_length": 16384,
            "prompt_pricing": 0.0,
            "completion_pricing": 0.0
        },
        {
            "id": "qwen/qwen-2.5-coder-32b-instruct:free",
            "name": "Qwen 2.5 Coder 32B (Free)",
            "is_free": True,
            "context_length": 32768,
            "prompt_pricing": 0.0,
            "completion_pricing": 0.0
        },
        {
            "id": "deepseek/deepseek-r1:free",
            "name": "DeepSeek R1 (Free)",
            "is_free": True,
            "context_length": 16384,
            "prompt_pricing": 0.0,
            "completion_pricing": 0.0
        },
        {
            "id": "mistralai/mistral-7b-instruct:free",
            "name": "Mistral 7B Instruct (Free)",
            "is_free": True,
            "context_length": 8192,
            "prompt_pricing": 0.0,
            "completion_pricing": 0.0
        }
    ]

    def __init__(self):
        self.daily_usage_counter = 0

    def get_free_models(self) -> List[ModelInfo]:
        return [ModelInfo(**m) for m in self.VERIFIED_FREE_MODELS]

    def is_model_free(self, model_id: str) -> bool:
        if not model_id:
            return False
        if model_id == "openrouter/free":
            return True
        if model_id.endswith(":free"):
            return True
        # Check against curated registry
        for m in self.VERIFIED_FREE_MODELS:
            if m["id"] == model_id and m["is_free"]:
                return True
        return False

    def validate_or_fallback(self, requested_model: Optional[str]) -> str:
        """
        Validates the requested model is free.
        If invalid or paid, strictly fallbacks to a verified free model.
        NEVER allows a paid model.
        """
        if requested_model and self.is_model_free(requested_model):
            return requested_model
        return "openrouter/free"

free_model_registry = FreeModelRegistry()
