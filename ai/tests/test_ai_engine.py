import pytest
from unittest.mock import patch, AsyncMock
from ai.schemas.api_models import ChatRequest, LanguageCode
from ai.agents.language_agent import language_agent
from ai.services.free_model_registry import free_model_registry
from ai.services.memory_service import memory_service
from ai.services.rag_service import rag_service
from ai.agents.orchestrator import orchestrator_agent

def test_language_agent_detection():
    # Telugu
    res_te = language_agent.detect_language("రైతు భరోసా పథకం గురించి చెప్పండి")
    assert res_te["language"] == "te-IN"
    
    # Hindi
    res_hi = language_agent.detect_language("प्रधानमंत्री किसान सम्मान निधि योजना क्या है?")
    assert res_hi["language"] == "hi-IN"
    
    # English
    res_en = language_agent.detect_language("How do I apply for Ayushman Bharat card?")
    assert res_en["language"] == "en-IN"
    
    # Tenglish (Telugu in English script)
    res_tenglish = language_agent.detect_language("ee pathakam ela apply cheyali cheppandi")
    assert res_tenglish["language"] == "te-IN"
    assert res_tenglish["is_code_mixed"] is True

def test_free_model_registry_enforcement():
    # Paid models must NEVER be accepted
    assert free_model_registry.is_model_free("openai/gpt-4o") is False
    assert free_model_registry.is_model_free("anthropic/claude-3.5-sonnet") is False
    
    # Free models must pass
    assert free_model_registry.is_model_free("openrouter/free") is True
    assert free_model_registry.is_model_free("meta-llama/llama-3.3-70b-instruct:free") is True
    
    # Fallback must be safe
    fallback = free_model_registry.validate_or_fallback("expensive-paid-model")
    assert fallback == "openrouter/free"

def test_memory_service():
    session = "test_sess_01"
    memory_service.add_message(session, "user", "Explain PM-Kisan")
    memory_service.add_message(session, "assistant", "PM-Kisan provides Rs 6,000 annually.")
    
    history = memory_service.get_history(session)
    assert len(history) == 2
    assert history[0].content == "Explain PM-Kisan"
    
    memory_service.clear_session(session)
    assert len(memory_service.get_history(session)) == 0

def test_rag_knowledge_search():
    results = rag_service.search("PM-Kisan farmer 6000", top_k=2)
    assert len(results) > 0

@pytest.mark.asyncio
async def test_orchestrator_flow():
    # In automated tests, mock OpenRouter call to strictly conserve free quotas
    mock_llm_return = {
        "content": "రైతు భరోసా పథకం ద్వారా రైతులకు పెట్టుబడి సహాయం లభిస్తుంది.",
        "model_used": "meta-llama/llama-3.3-70b-instruct:free",
        "free_verified": True
    }
    with patch("ai.services.openrouter_client.openrouter_client.generate_completion", new_callable=AsyncMock) as mock_gen:
        mock_gen.return_value = mock_llm_return
        req = ChatRequest(
            session_id="unit_test_session",
            message="రైతు భరోసా ఎలా పని చేస్తుంది?",
            language=LanguageCode.AUTO,
            enable_rag=True
        )
        resp = await orchestrator_agent.process_chat(req)
        assert resp.session_id == "unit_test_session"
        assert resp.detected_language == "te-IN"
        assert len(resp.agent_trace) > 0
        assert "రైతు భరోసా" in resp.response
