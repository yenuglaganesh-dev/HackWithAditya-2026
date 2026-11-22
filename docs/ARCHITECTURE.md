# Architecture & Multi-Agent Specification
## BhashaBridge AI – Voice & Language AI for Bharat

### 1. High-Level Architecture Flow

```
+-------------------------------------------------------------------------------+
|                             React + Vite Frontend                             |
|  - Web Speech API (Free Client STT)                                           |
|  - SpeechSynthesis (Free Client TTS)                                          |
|  - Multilingual Switcher (Telugu / Hindi / English)                           |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
|                      Java Spring Boot 3 Gateway (Port 8080)                   |
|  - Request Validation & Session DTO                                           |
|  - Reactive WebClient forwarding to Python AI Service                         |
|  - CORS & Security Boundary                                                   |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
|                         Python FastAPI Engine (Port 8000)                     |
|  +-------------------------------------------------------------------------+  |
|  |                     Agent 1: Orchestrator Agent                         |  |
|  +-------------------------------------------------------------------------+  |
|             |                     |                    |           |          |
|             v                     v                    v           v          |
|     [Language Agent]     [Knowledge Agent]     [Research Agent] [Voice Agent] |
|     Unicode + Dialect      ChromaDB RAG           Gov Domains    Browser Native|
|             \                     /                    |                      |
|              +-------------------+---------------------+                      |
|                                    |                                          |
|                                    v                                          |
|                       [Response Generation Agent]                             |
|                             OpenRouter Free                                   |
|                                    |                                          |
|                                    v                                          |
|                         [Verification Agent]                                  |
|                        Fact check against citations                           |
+-------------------------------------------------------------------------------+
```

### 2. Multi-Agent System Roles

1. **Main Orchestrator Agent (`ai/agents/orchestrator.py`)**:
   - Manages end-to-end user request pipeline.
   - Detects intent, skips unnecessary LLM calls, routes context between specialized agents.

2. **Language Intelligence Agent (`ai/agents/language_agent.py`)**:
   - Fast deterministic Unicode analysis for Telugu (`\u0C00-\u0C7F`) and Devanagari (`\u0900-\u097F`).
   - Resolves Latin-script code mixing: Tenglish (*"ela apply cheyali"*) and Hinglish (*"kaise aavedan kare"*).

3. **Knowledge Agent (`ai/agents/knowledge_agent.py`)**:
   - Semantic retrieval with persistent ChromaDB.
   - 100% offline hashing embeddings for zero-cost semantic matching.

4. **Research Agent (`ai/agents/research_agent.py`)**:
   - Real-time fact grounding against official government domains (*pmkisan.gov.in, nha.gov.in, uidai.gov.in*).

5. **Response Generation Agent (`ai/agents/response_agent.py`)**:
   - Produces culturally resonant, plain-language guidance in Telugu, Hindi, or English.

6. **Verification Agent (`ai/agents/verification_agent.py`)**:
   - Prevents hallucinations by auditing claims against retrieved scheme snippets.

7. **Voice Agent (`ai/agents/voice_agent.py`)**:
   - Coordinates client-side Web Speech STT and SpeechSynthesis TTS with text fallbacks.

### 3. Strict Free-First Model Policy
- Default Router: `openrouter/free`
- Allowed models: IDs ending with `:free` (e.g. `meta-llama/llama-3.3-70b-instruct:free`, `google/gemini-2.0-flash-exp:free`, `mistralai/mistral-7b-instruct:free`).
- Zero paid fallback. Zero credit purchase required.
