from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="allow")

    PROJECT_NAME: str = "BhashaBridge AI"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    
    # OpenRouter API (Strict Free-First)
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = "openrouter/free"
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    
    # Sarvam AI Optional Voice Integration (Default Disabled)
    SARVAM_API_KEY: str = ""
    ENABLE_SARVAM_STT: bool = False
    ENABLE_SARVAM_TTS: bool = False
    
    # RAG Vector Store
    CHROMA_PERSIST_DIRECTORY: str = "./chroma_data"
    
    # Allowed CORS Origins
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080"
    ]
    
    # Backend URL
    JAVA_BACKEND_URL: str = "http://localhost:8080"
    
    # Request limits
    DAILY_FREE_REQUEST_LIMIT: int = 500
    REQUEST_TIMEOUT_SECONDS: float = 30.0

settings = Settings()
