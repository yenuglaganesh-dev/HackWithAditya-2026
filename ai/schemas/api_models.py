from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class LanguageCode(str, Enum):
    TELUGU = "te"
    HINDI = "hi"
    ENGLISH = "en"
    AUTO = "auto"

class ChatMessage(BaseModel):
    role: str = Field(..., description="Message sender role: user, assistant, system")
    content: str = Field(..., description="Text content of the message")
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    session_id: str = Field(..., description="Unique conversation session ID")
    message: str = Field(..., min_length=1, description="User prompt or speech transcription")
    language: LanguageCode = Field(default=LanguageCode.AUTO, description="Target or detected language")
    enable_rag: bool = Field(default=True, description="Enable knowledge base retrieval")
    enable_research: bool = Field(default=False, description="Enable public verified source research")

class SourceCitation(BaseModel):
    title: str
    source: str
    snippet: str
    relevance_score: Optional[float] = None
    url: Optional[str] = None
    retrieval_date: Optional[str] = None

class ChatResponse(BaseModel):
    session_id: str
    response: str
    language: str
    detected_language: str
    model_used: str
    agent_trace: List[str] = Field(default_factory=list)
    sources: List[SourceCitation] = Field(default_factory=list)
    verified: bool = False
    verification_notes: Optional[str] = None
    audio_available: bool = False
    audio_base64: Optional[str] = None

class LanguageDetectRequest(BaseModel):
    text: str

class LanguageDetectResponse(BaseModel):
    language: str
    language_name: str
    confidence: float
    is_code_mixed: bool = False
    script_detected: str

class KnowledgeUploadRequest(BaseModel):
    title: str
    category: str = "general"
    content: str
    source_url: Optional[str] = None

class KnowledgeSearchRequest(BaseModel):
    query: str
    top_k: int = 3
    category: Optional[str] = None

class KnowledgeSearchResponse(BaseModel):
    query: str
    results: List[SourceCitation]

class ModelInfo(BaseModel):
    id: str
    name: str
    is_free: bool
    context_length: int
    prompt_pricing: float
    completion_pricing: float

class FreeModelListResponse(BaseModel):
    models: List[ModelInfo]
    default_model: str
    total_free_models: int
