import re
from typing import List, Dict, Any
from ai.schemas.api_models import ChatRequest, ChatResponse, LanguageCode, SourceCitation
from ai.agents.language_agent import language_agent
from ai.agents.knowledge_agent import knowledge_agent
from ai.agents.research_agent import research_agent
from ai.agents.response_agent import response_agent
from ai.agents.verification_agent import verification_agent
from ai.agents.voice_agent import voice_agent
from ai.services.memory_service import memory_service
from ai.services.speech_service import speech_service
import logging

logger = logging.getLogger(__name__)

class OrchestratorAgent:
    """
    AGENT 1: MAIN ORCHESTRATOR AGENT
    Coordinates multi-agent execution with precision:
    1. Language Intelligence: Detects Telugu, Hindi, or English (handles greetings and code-mixing).
    2. Intent & RAG Gating: Only triggers ChromaDB RAG when the user asks a real factual/scheme question,
       preventing useless RAG citations for simple greetings ("hi", "hello", "namaste").
    3. Multi-turn Memory: Connects follow-up questions to previous conversation context.
    4. Response Generation: Leverages live OpenRouter Free LLM.
    5. Verification Agent: Audits answers against verified sources.
    6. Speech Synthesis: Attaches high-quality regional voice audio if available.
    """
    def __init__(self):
        self.lang_agent = language_agent
        self.knowledge_agent = knowledge_agent
        self.research_agent = research_agent
        self.response_agent = response_agent
        self.verify_agent = verification_agent
        self.voice_agent = voice_agent
        self.memory = memory_service
        self.speech = speech_service

        # Common greetings that do NOT require RAG search
        self.greeting_words = {
            "hi", "hello", "hey", "namaste", "namaskaram", "namaskara",
            "good morning", "good evening", "good afternoon", "ela unnaru",
            "kaise ho", "how are you", "who are you", "what is your name",
            "nuvvu evaru", "tum kaun ho", "thanks", "thank you", "dhanyawad"
        }

    def _is_greeting_or_smalltalk(self, text: str) -> bool:
        clean = re.sub(r'[^\w\s]', '', text.lower()).strip()
        words = clean.split()
        if len(words) <= 3 and any(g in clean for g in self.greeting_words):
            return True
        return False

    async def process_chat(self, request: ChatRequest) -> ChatResponse:
        agent_trace: List[str] = ["Orchestrator: Received request"]

        # Step 1: Language Detection
        pref_lang = request.language.value if hasattr(request.language, 'value') else str(request.language)
        detected_info = self.lang_agent.detect_language(request.message, preferred_lang=pref_lang)
        agent_trace.append(f"LanguageAgent: Detected {detected_info['language_name']} ({detected_info['language']})")

        # Honor explicit preference unless set to 'auto'
        if pref_lang not in ["auto", "LanguageCode.AUTO"]:
            target_lang = pref_lang.replace("-IN", "")
        else:
            target_lang = detected_info["language"]

        # Step 2: Determine if RAG should be triggered
        is_greeting = self._is_greeting_or_smalltalk(request.message)
        citations: List[SourceCitation] = []

        if request.enable_rag and not is_greeting:
            agent_trace.append("KnowledgeAgent: Querying ChromaDB vector store")
            citations = await self.knowledge_agent.retrieve_knowledge(query=request.message, top_k=3)
            if citations:
                agent_trace.append(f"KnowledgeAgent: Found {len(citations)} relevant sources")
        elif is_greeting:
            agent_trace.append("Orchestrator: Conversational greeting detected (RAG skipped)")

        # Step 3: Public Research (optional)
        if request.enable_research and not is_greeting:
            agent_trace.append("ResearchAgent: Querying official government domains")
            research_sources = await self.research_agent.search_public_sources(query=request.message)
            citations.extend(research_sources)

        # Step 4: Retrieve Session Memory Context
        history = self.memory.get_context_for_prompt(request.session_id)
        if history:
            agent_trace.append(f"MemoryService: Loaded {len(history)} previous turns")

        # Step 5: Live LLM Response Generation
        agent_trace.append("ResponseAgent: Generating response with OpenRouter Free LLM")
        gen_result = await self.response_agent.generate_response(
            user_message=request.message,
            target_language=target_lang,
            context_history=history,
            sources=citations,
            is_greeting=is_greeting
        )
        response_text = gen_result.get("content", "")
        model_used = gen_result.get("model_used", "openrouter/free")

        # Step 6: Verification
        verification = self.verify_agent.verify(response_text, citations)
        if citations and verification["verified"]:
            agent_trace.append("Verified against official scheme references")
        else:
            agent_trace.append("General guidance")

        # Step 7: Update Conversation History
        self.memory.add_message(request.session_id, "user", request.message)
        self.memory.add_message(request.session_id, "assistant", response_text)

        # Step 8: Audio Synthesis (TTS provider abstraction)
        audio_payload = None
        if self.speech.is_sarvam_tts_active():
            synth_res = await self.speech.synthesize_speech(text=response_text, language=target_lang)
            if synth_res.get("success"):
                audio_payload = synth_res.get("audio_base64")
                agent_trace.append("Synthesized audio response")

        return ChatResponse(
            session_id=request.session_id,
            response=response_text,
            language=target_lang,
            detected_language=detected_info["language"],
            model_used="BhashaBridge AI",
            agent_trace=[],
            sources=citations if (citations and not is_greeting) else [],
            verified=verification["verified"] if (citations and not is_greeting) else False,
            verification_notes=verification.get("notes"),
            audio_available=True,
            audio_base64=audio_payload
        )

orchestrator_agent = OrchestratorAgent()
