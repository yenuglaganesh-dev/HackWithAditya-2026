from typing import List, Dict, Any, Optional
from ai.schemas.api_models import SourceCitation
from ai.services.openrouter_client import openrouter_client

class ResponseAgent:
    """
    AGENT 5: RESPONSE GENERATION AGENT
    Responsibilities:
    - Generates conversational, compassionate, culturally natural responses for Bharat.
    - Honors user language: Telugu, Hindi, or English.
    - For simple conversational greetings (e.g. "hi", "namaste"), replies naturally without dumping scheme details.
    - Accurately integrates verified RAG source chunks when relevant.
    """
    def __init__(self):
        self.llm = openrouter_client

    async def generate_response(
        self,
        user_message: str,
        target_language: str,
        context_history: List[Dict[str, str]],
        sources: List[SourceCitation],
        is_greeting: bool = False
    ) -> Dict[str, Any]:
        
        # Language instruction
        if target_language in ["te", "te-IN"]:
            lang_rule = "Respond naturally and fluently in pure TELUGU (తెలుగు). Use clear, respectful language."
        elif target_language in ["hi", "hi-IN"]:
            lang_rule = "Respond naturally and fluently in HINDI (हिन्दी). Use respectful language (आप/नमस्ते)."
        else:
            lang_rule = "Respond clearly and pleasantly in ENGLISH with an Indian conversational tone."

        if is_greeting:
            context_instruction = (
                "The user is sharing a conversational greeting or polite remark. "
                "Reply warmly and ask how you can help them today. "
                "DO NOT dump irrelevant scheme information or eligibility criteria."
            )
            sources_text = ""
        else:
            context_instruction = (
                "You are a general-purpose voice assistant capable of answering any question (science, nature, everyday knowledge, explanations, reasoning, or general curiosity), as well as citizen welfare questions. "
                "Answer the user's specific query clearly, factually, and concisely (2-4 natural spoken sentences unless detailed steps are requested). "
                "If official scheme guidelines are provided below and relevant to the query, base factual statements on them. "
                "Otherwise, answer general knowledge questions accurately from your broad understanding."
            )
            if sources:
                sources_text = "\nVERIFIED OFFICIAL GUIDELINES:\n" + "\n".join(
                    [f"- {s.title} ({s.source}): {s.snippet}" for s in sources]
                )
            else:
                sources_text = ""

        system_prompt = f"""You are BhashaBridge AI, a helpful, intelligent voice and language assistant designed for Indian citizens.
{lang_rule}

Guidance:
{context_instruction}
{sources_text}

Formatting Rules:
1. Be concise, polite, and practical (suitable for voice reading).
2. Avoid markdown clutter, excessive asterisks, or raw URLs.
3. Answer follow-up questions using the ongoing conversation history.
"""

        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(context_history)
        messages.append({"role": "user", "content": user_message})

        result = await self.llm.generate_completion(messages=messages, temperature=0.3)
        return result

response_agent = ResponseAgent()
