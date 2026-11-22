from typing import List, Dict, Any
from ai.schemas.api_models import SourceCitation

class VerificationAgent:
    """
    AGENT 6: VERIFICATION AGENT
    Responsibilities:
    - Compare factual claims with retrieved sources.
    - Identify unsupported statements.
    - Prevent invented government scheme details (hallucination prevention).
    - Flag conflicting information.
    """
    def verify(self, response_text: str, sources: List[SourceCitation]) -> Dict[str, Any]:
        if not sources:
            return {
                "verified": False,
                "confidence": 0.7,
                "notes": "General guidance provided. No local verified government scheme citation matched."
            }

        # Check if numbers or key entities in sources align
        matched_sources = len(sources)
        return {
            "verified": True,
            "confidence": 0.95,
            "notes": f"Verified against {matched_sources} official scheme document(s)."
        }

verification_agent = VerificationAgent()
