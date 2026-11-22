from typing import List, Dict, Any, Optional
from ai.schemas.api_models import SourceCitation
from ai.services.openrouter_client import openrouter_client

class ResponseAgent:
    """
    AGENT 5: RESPONSE GENERATION AGENT
    Responsibilities:
    - Prepare understandable, compassionate, citizen-centric answers.
    - Support Telugu, Hindi and English fluently.
    - Explain complex government or technical procedures simply.
    - Clearly cite sources and preserve language preference.
    """
    def __init__(self):
        self.llm = openrouter_client

    async def generate_response(
        self,
        user_message: str,
        target_language: str,
        context_history: List[Dict[str, str]],
        sources: List[SourceCitation]
    ) -> Dict[str, Any]:
        
        # Build prompt guidelines based on target language
        lang_instruction = ""
        if target_language == "te-IN":
            lang_instruction = "Respond warmly and accurately in TELUGU (తెలుగు). If technical terms are used, you can provide English in brackets."
        elif target_language == "hi-IN":
            lang_instruction = "Respond warmly and accurately in HINDI (हिन्दी). Explain the steps simply and respectfully."
        else:
            lang_instruction = "Respond clearly and accurately in ENGLISH (Indian context), using simple step-by-step guidance."

        sources_text = ""
        if sources:
            sources_text = "VERIFIED SOURCES AND CITATIONS:\n" + "\n".join(
                [f"- {s.title} ({s.source}): {s.snippet}" for s in sources]
            )
        else:
            sources_text = "No direct verified document found in local store. Provide general helpful guidance and advise verifying with local government centers."

        system_prompt = f"""You are BhashaBridge AI, a helpful, respectful multilingual voice & language assistant for Indian citizens (Bharat).
{lang_instruction}

{sources_text}

Rules:
1. Always be polite, respectful, and clear.
2. Directly answer the citizen's question.
3. If giving government scheme or eligibility details, only state verified facts. Do NOT invent subsidy percentages or eligibility criteria.
4. Keep the response concise and suitable for voice read-aloud (SpeechSynthesis).
"""

        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(context_history)
        messages.append({"role": "user", "content": user_message})

        result = await self.llm.generate_completion(messages=messages, temperature=0.3)
        return result

response_agent = ResponseAgent()
