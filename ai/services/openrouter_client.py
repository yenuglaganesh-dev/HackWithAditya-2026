import httpx
from typing import List, Dict, Any, Optional
import logging
from ai.config.settings import settings
from ai.services.free_model_registry import free_model_registry

logger = logging.getLogger(__name__)

class OpenRouterClient:
    """
    OpenRouter Client with Strict Free-First enforcement and resilience.
    Sends live HTTP completions and returns meaningful error states if the external API fails.
    """
    def __init__(self):
        self.registry = free_model_registry
        self.last_status = "idle"
        self.last_error = None
        self.last_model_used = None

    def get_api_key(self) -> str:
        # Dynamically pull key from settings or environment
        return settings.OPENROUTER_API_KEY.strip()

    def get_status_summary(self) -> Dict[str, Any]:
        key = self.get_api_key()
        has_key = bool(key and len(key) > 10 and not key.startswith("your_"))
        return {
            "provider": "OpenRouter",
            "configured_model": settings.OPENROUTER_MODEL,
            "api_key_configured": has_key,
            "base_url": settings.OPENROUTER_BASE_URL,
            "last_status": self.last_status,
            "last_error": self.last_error,
            "last_model_used": self.last_model_used,
            "strict_free_mode": True
        }

    async def generate_completion(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.3,
        max_tokens: int = 1000
    ) -> Dict[str, Any]:
        api_key = self.get_api_key()

        if not api_key or api_key.startswith("your_") or len(api_key) < 10:
            self.last_status = "error_missing_key"
            self.last_error = "Missing valid OPENROUTER_API_KEY in ai/.env"
            return {
                "content": "Configuration Error: Please configure a valid OPENROUTER_API_KEY in ai/.env to enable live AI responses.",
                "model_used": "error-unconfigured-key",
                "free_verified": True,
                "error": "Missing OPENROUTER_API_KEY"
            }

        target_model = self.registry.validate_or_fallback(model or settings.OPENROUTER_MODEL)
        
        # Free-tier fallback candidates (strictly :free or openrouter/free)
        candidate_models = list(dict.fromkeys([
            target_model,
            "openrouter/free",
            "meta-llama/llama-3.3-70b-instruct:free",
            "google/gemini-2.0-flash-exp:free",
            "mistralai/mistral-7b-instruct:free",
            "qwen/qwen-2.5-coder-32b-instruct:free"
        ]))

        headers = {
            "Authorization": f"Bearer {api_key}",
            "HTTP-Referer": "https://github.com/yenuglaganesh-dev/HackWithAditya-2026",
            "X-Title": "BhashaBridge AI - Voice & Language AI for Bharat",
            "Content-Type": "application/json"
        }

        last_err_msg = ""
        for current_model in candidate_models:
            if not self.registry.is_model_free(current_model):
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
                        f"{settings.OPENROUTER_BASE_URL}/chat/completions",
                        json=payload,
                        headers=headers
                    )

                    if response.status_code == 200:
                        data = response.json()
                        choices = data.get("choices", [])
                        if choices:
                            content = choices[0].get("message", {}).get("content", "")
                            self.last_status = "operational"
                            self.last_error = None
                            self.last_model_used = current_model
                            return {
                                "content": content.strip(),
                                "model_used": current_model,
                                "free_verified": True
                            }
                    elif response.status_code == 429:
                        last_err_msg = f"Rate limited on {current_model} (HTTP 429). Trying fallback free model..."
                        logger.warning(last_err_msg)
                        continue
                    elif response.status_code == 401:
                        self.last_status = "error_auth"
                        self.last_error = "OpenRouter returned HTTP 401 Unauthorized"
                        return {
                            "content": "Authentication Error: The configured OpenRouter API key was rejected (HTTP 401). Please verify your key.",
                            "model_used": "error-auth",
                            "free_verified": True,
                            "error": "HTTP 401 Unauthorized"
                        }
                    elif response.status_code == 503:
                        last_err_msg = f"Service unavailable on {current_model} (HTTP 503)"
                        continue
                    else:
                        last_err_msg = f"HTTP {response.status_code}: {response.text[:200]}"
                        continue
            except httpx.TimeoutException:
                last_err_msg = f"Request timed out on {current_model}"
                continue
            except Exception as e:
                last_err_msg = str(e)
                continue

        # If all candidate free models failed
        self.last_status = "error_exhausted"
        self.last_error = last_err_msg
        return {
            "content": f"Kshaminchandi / Sorry, all OpenRouter free model endpoints are momentarily at capacity or unreachable ({last_err_msg}). Please retry in a moment.",
            "model_used": "error-all-free-models-failed",
            "free_verified": True,
            "error": last_err_msg
        }

openrouter_client = OpenRouterClient()
