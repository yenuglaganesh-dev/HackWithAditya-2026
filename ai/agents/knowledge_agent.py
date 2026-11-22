from typing import List
from ai.schemas.api_models import SourceCitation
from ai.services.rag_service import rag_service

class KnowledgeAgent:
    """
    AGENT 3: KNOWLEDGE AGENT
    Responsibilities:
    - Search internal knowledge base.
    - Retrieve relevant document sections using semantic similarity.
    - Provide source references.
    - Return an uncertainty indication when information is unavailable.
    """
    def __init__(self):
        self.rag = rag_service

    async def retrieve_knowledge(self, query: str, top_k: int = 3) -> List[SourceCitation]:
        return self.rag.search(query=query, top_k=top_k)

knowledge_agent = KnowledgeAgent()
