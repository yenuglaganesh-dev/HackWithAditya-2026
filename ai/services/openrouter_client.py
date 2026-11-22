import httpx
from typing import List, Dict, Any, Optional
import json
import logging
from ai.config.settings import settings
from ai.services.free_model_registry import free_model_registry

logger = logging.getLogger(__name__)

class OpenRouterClient:
    """
    OpenRouter Client with Strict Free-First enforcement and graceful fallback.
    """
    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        self.api_key = api_key or settings.OPENROUTER_API_KEY
        self.base_url = base_url or settings.OPENROUTER_BASE_URL
        self.registry = free_model_registry

    async def generate_completion(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.3,
        max_tokens: int = 1000
    ) -> Dict[str, Any]:
        """
        Makes a chat completion call to OpenRouter verifying free model status.
        Falls back automatically to alternative verified free models if rate limited.
        """
        target_model = self.registry.validate_or_fallback(model or settings.OPENROUTER_MODEL)
        
        # Free-tier fallback chain
        fallback_models = [
            target_model,
            "openrouter/free",
            "meta-llama/llama-3.3-70b-instruct:free",
            "google/gemini-2.0-flash-exp:free",
            "mistralai/mistral-7b-instruct:free"
        ]
        # Deduplicate while preserving order
        candidate_models = list(dict.fromkeys(fallback_models))

        # If no API key is supplied, provide deterministic mock response
        if not self.api_key or self.api_key.startswith("your_") or len(self.api_key.strip()) < 10:
            last_user_message = next((m["content"] for m in reversed(messages) if m.get("role") == "user"), "")
            return {
                "content": f"[BhashaBridge Free Assistant] Me message labhinchindi: '{last_user_message}'. (Mock/Dev Mode: Enter valid OPENROUTER_API_KEY in ai/.env for live remote LLM inference).",
                "model_used": "mock-free-engine",
                "free_verified": True
            }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": "https://github.com/yenuglaganesh-dev/HackWithAditya-2026",
            "X-Title": "BhashaBridge AI - Voice & Language AI for Bharat",
            "Content-Type": "application/json"
        }

        last_error = None
        for current_model in candidate_models:
            # STRICT FREE CHECK
            if not self.registry.is_model_free(current_model):
                logger.warning(f"Skipping paid or unverified model: {current_model}")
                continue

            payload = {
                "model": current_model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens
            }

            try:
                async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
                    response = await client.post(
                        f"{self.base_url}/chat/completions",
                        json=payload,
                        headers=headers
                    )
                    
                    if response.status_code == 200:
                        data = response.json()
                        choices = data.get("choices", [])
                        if choices:
                            content = choices[0].get("message", {}).get("content", "")
                            return {
                                "content": content,
                                "model_used": current_model,
                                "free_verified": True
                            }
                    elif response.status_code == 429:
                        logger.warning(f"Rate limited (429) on free model {current_model}, trying next free model...")
                        last_error = f"Rate limited on {current_model}"
                        continue
                    elif response.status_code == 401:
                        return {
                            "content": "Authentication error: OpenRouter API Key is invalid or expired. Please check your OPENROUTER_API_KEY configuration.",
                            "model_used": "error-handler",
                            "free_verified": True,
                            "error": "Invalid API Key"
                        }
                    else:
                        last_error = f"HTTP {response.status_code}: {response.text}"
            except Exception as e:
                logger.error(f"Error querying {current_model}: {str(e)}")
                last_error = str(e)
                continue

        # If all free remote models failed or timed out
        return {
            "content": f"Kshaminchandi/Maaf Kijiye. Currently OpenRouter free models are at peak capacity or unreachable ({last_error}). Please try again in a moment.",
            "model_used": "free-resilience-fallback",
            "free_verified": True,
            "error": str(last_error)
        }

openrouter_client = OpenRouterClient()
