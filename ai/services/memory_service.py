from typing import Dict, List, Optional
from collections import defaultdict
import time
from ai.schemas.api_models import ChatMessage

class ConversationMemoryService:
    """
    Manages in-memory recent conversation history per session ID.
    Enforces context limits and avoids storing sensitive personal details.
    """
    def __init__(self, max_history_turns: int = 6):
        self.max_history_turns = max_history_turns
        self.sessions: Dict[str, List[ChatMessage]] = defaultdict(list)
        self.last_active: Dict[str, float] = {}

    def get_history(self, session_id: str) -> List[ChatMessage]:
        return self.sessions.get(session_id, [])

    def add_message(self, session_id: str, role: str, content: str):
        self.sessions[session_id].append(
            ChatMessage(role=role, content=content, timestamp=str(time.time()))
        )
        self.last_active[session_id] = time.time()
        # Enforce window size (keep last N turns * 2 messages)
        max_messages = self.max_history_turns * 2
        if len(self.sessions[session_id]) > max_messages:
            self.sessions[session_id] = self.sessions[session_id][-max_messages:]

    def clear_session(self, session_id: str):
        if session_id in self.sessions:
            del self.sessions[session_id]
        if session_id in self.last_active:
            del self.last_active[session_id]

    def get_context_for_prompt(self, session_id: str) -> List[Dict[str, str]]:
        history = self.get_history(session_id)
        # Exclude the very last user message if it's already appended
        return [{"role": m.role, "content": m.content} for m in history]

memory_service = ConversationMemoryService()
