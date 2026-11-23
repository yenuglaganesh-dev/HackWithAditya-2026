from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
import time
import uvicorn

from ai.config.settings import settings
from ai.schemas.api_models import (
    ChatRequest, ChatResponse,
    LanguageDetectRequest, LanguageDetectResponse,
    KnowledgeUploadRequest, KnowledgeSearchRequest, KnowledgeSearchResponse,
    FreeModelListResponse
)
from ai.agents.orchestrator import orchestrator_agent
from ai.agents.language_agent import language_agent
from ai.services.rag_service import rag_service
from ai.services.free_model_registry import free_model_registry
from ai.services.speech_service import speech_service
from ai.services.openrouter_client import openrouter_client

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Multilingual Voice & Language AI Assistant for Bharat - Free-First Architecture"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "timestamp": time.time()
    }

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response = await orchestrator_agent.process_chat(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Engine Error: {str(e)}")

@app.post("/language/detect", response_model=LanguageDetectResponse)
async def detect_language_endpoint(request: LanguageDetectRequest):
    result = language_agent.detect_language(request.text)
    return LanguageDetectResponse(**result)

@app.get("/models/status")
async def models_status():
    """
    Returns live model status, provider name, and key status without exposing secrets.
    """
    return openrouter_client.get_status_summary()

@app.get("/models/free", response_model=FreeModelListResponse)
async def list_free_models():
    models = free_model_registry.get_free_models()
    return FreeModelListResponse(
        models=models,
        default_model=settings.OPENROUTER_MODEL,
        total_free_models=len(models)
    )

@app.post("/knowledge/search", response_model=KnowledgeSearchResponse)
async def search_knowledge(request: KnowledgeSearchRequest):
    results = rag_service.search(query=request.query, top_k=request.top_k, category=request.category)
    return KnowledgeSearchResponse(query=request.query, results=results)

@app.post("/knowledge/upload")
async def upload_knowledge(request: KnowledgeUploadRequest):
    doc_id = rag_service.add_document(
        title=request.title,
        content=request.content,
        source="Admin Upload",
        category=request.category,
        source_url=request.source_url
    )
    return {"status": "success", "doc_id": doc_id, "message": "Document indexed successfully into ChromaDB"}

@app.post("/speech/transcribe")
async def transcribe_speech():
    return speech_service.get_speech_capabilities()

@app.post("/speech/synthesize")
async def synthesize_speech(request: Dict[str, Any]):
    text = request.get("text", "")
    language = request.get("language", "te")
    return await speech_service.synthesize_speech(text=text, language=language)

@app.get("/agents/status")
async def agents_status():
    return {
        "orchestrator_agent": "ready",
        "language_agent": "ready (Telugu, Hindi, English, Tenglish, Hinglish)",
        "knowledge_agent": f"ready (ChromaDB items: {rag_service.collection.count()})",
        "research_agent": "ready (Verified Gov domains)",
        "response_agent": "ready (OpenRouter Live Free)",
        "verification_agent": "ready (Fact & Source Auditor)",
        "voice_agent": f"ready (Sarvam TTS: {speech_service.is_sarvam_tts_active()}, Web Speech Native)"
    }

@app.get("/system/status")
async def system_status():
    return {
        "status": "operational",
        "ai_connected": True,
        "default_model": "BhashaBridge AI Assistant",
        "voice_integration": "Native Speech Engine",
        "knowledge_documents_indexed": rag_service.collection.count()
    }

if __name__ == "__main__":
    uvicorn.run("ai.main:app", host="0.0.0.0", port=8000, reload=True)
