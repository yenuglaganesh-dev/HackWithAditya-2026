import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
from dotenv import load_dotenv

# Explicitly prioritize ai/.env, fallback to root .env
base_dir = Path(__file__).resolve().parent.parent
env_file_ai = base_dir / ".env"
root_env = base_dir.parent / ".env"

if env_file_ai.exists():
    load_dotenv(dotenv_path=env_file_ai, override=True)
elif root_env.exists():
    load_dotenv(dotenv_path=root_env, override=True)
else:
    load_dotenv(override=True)

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(env_file_ai) if env_file_ai.exists() else ".env",
        extra="allow"
    )

    PROJECT_NAME: str = "BhashaBridge AI"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    
    # OpenRouter API (Strict Free-First)
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = "openrouter/free"
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    
    # Sarvam AI Integration (STRICTLY DISABLED BY DEFAULT until explicitly set to true in .env)
    SARVAM_API_KEY: str = ""
    ENABLE_SARVAM_STT: bool = False
    ENABLE_SARVAM_TTS: bool = False
    
    # RAG Vector Store
    CHROMA_PERSIST_DIRECTORY: str = "./chroma_data"
    
    # Allowed CORS Origins - parsed flexibly from string or list
    ALLOWED_ORIGINS: Union[str, List[str]] = "http://localhost:5173,http://localhost:3000,http://localhost:8080,http://127.0.0.1:5173,http://127.0.0.1:8000"
    
    # Backend URL
    JAVA_BACKEND_URL: str = "http://localhost:8080"
    
    # Request limits
    DAILY_FREE_REQUEST_LIMIT: int = 500
    REQUEST_TIMEOUT_SECONDS: float = 30.0

    def get_cors_origins(self) -> List[str]:
        if isinstance(self.ALLOWED_ORIGINS, list):
            return self.ALLOWED_ORIGINS
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

settings = Settings()
