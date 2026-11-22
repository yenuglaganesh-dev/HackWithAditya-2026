from typing import List, Dict, Any
from ai.schemas.api_models import ChatRequest, ChatResponse, LanguageCode, SourceCitation
from ai.agents.language_agent import language_agent
from ai.agents.knowledge_agent import knowledge_agent
from ai.agents.research_agent import research_agent
from ai.agents.response_agent import response_agent
from ai.agents.verification_agent import verification_agent
from ai.agents.voice_agent import voice_agent
from ai.services.memory_service import memory_service
import logging

logger = logging.getLogger(__name__)

class OrchestratorAgent:
    """
    AGENT 1: MAIN ORCHESTRATOR AGENT
    Coordinates multi-agent flow:
    1. Language Intelligence: Detect language and check code-mixing (Tenglish/Hinglish).
    2. Intent Understanding: Determine if RAG retrieval or public research is needed.
    3. Knowledge Retrieval: Retrieve semantic documents from ChromaDB if needed.
    4. Research: Gather official links if public research requested.
    5. Response Generation: Generate multilingual answer respecting user tone & language.
    6. Verification: Audit claims against retrieved documents.
    7. Memory Update: Persist user and assistant turns.
    """
    def __init__(self):
        self.lang_agent = language_agent
        self.knowledge_agent = knowledge_agent
        self.research_agent = research_agent
        self.response_agent = response_agent
        self.verify_agent = verification_agent
        self.voice_agent = voice_agent
        self.memory = memory_service

    async def process_chat(self, request: ChatRequest) -> ChatResponse:
        agent_trace: List[str] = ["Orchestrator: Received request"]

        # Step 1: Language Intelligence
        detected_info = self.lang_agent.detect_language(request.message)
        agent_trace.append(f"LanguageAgent: Detected {detected_info['language_name']} ({detected_info['language']})")

        # Determine target language: User explicit preference overrides auto-detect
        if request.language != LanguageCode.AUTO:
            target_lang = request.language.value
        else:
            target_lang = detected_info["language"]

        # Step 2: Knowledge Retrieval (RAG)
        citations: List[SourceCitation] = []
        if request.enable_rag:
            agent_trace.append("KnowledgeAgent: Querying ChromaDB vector store")
            citations = await self.knowledge_agent.retrieve_knowledge(query=request.message, top_k=3)
            if citations:
                agent_trace.append(f"KnowledgeAgent: Found {len(citations)} relevant sources")

        # Step 3: Public Research (if requested)
        if request.enable_research:
            agent_trace.append("ResearchAgent: Querying official government domains")
            research_sources = await self.research_agent.search_public_sources(query=request.message)
            citations.extend(research_sources)
            if research_sources:
                agent_trace.append(f"ResearchAgent: Added {len(research_sources)} verified public sources")

        # Step 4: Retrieve Conversation Memory Context
        history = self.memory.get_context_for_prompt(request.session_id)
        if history:
            agent_trace.append(f"MemoryService: Loaded {len(history)} previous turns")

        # Step 5: Response Generation via Free OpenRouter LLM
        agent_trace.append("ResponseAgent: Generating response with Free LLM")
        gen_result = await self.response_agent.generate_response(
            user_message=request.message,
            target_language=target_lang,
            context_history=history,
            sources=citations
        )
        response_text = gen_result.get("content", "")
        model_used = gen_result.get("model_used", "openrouter/free")

        # Step 6: Verification
        verification = self.verify_agent.verify(response_text, citations)
        agent_trace.append(f"VerificationAgent: Status={'Verified' if verification['verified'] else 'Unverified'}")

        # Step 7: Update Conversation History
        self.memory.add_message(request.session_id, "user", request.message)
        self.memory.add_message(request.session_id, "assistant", response_text)

        return ChatResponse(
            session_id=request.session_id,
            response=response_text,
            language=target_lang,
            detected_language=detected_info["language"],
            model_used=model_used,
            agent_trace=agent_trace,
            sources=citations,
            verified=verification["verified"],
            verification_notes=verification.get("notes"),
            audio_available=True
        )

orchestrator_agent = OrchestratorAgent()
