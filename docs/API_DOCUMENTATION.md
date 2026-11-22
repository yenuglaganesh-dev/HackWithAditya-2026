# BhashaBridge AI - API Reference

## Base URLs
- **Java Spring Boot Gateway**: `http://localhost:8080/api`
- **Python FastAPI Engine**: `http://localhost:8000`

---

## 1. Chat Completion Endpoint
**`POST /chat`** (or `/api/chat` via Gateway)

### Request:
```json
{
  "session_id": "sess_user_123",
  "message": "పీఎం కిసాన్ పథకం ద్వారా ఎంత సహాయం అందుతుంది?",
  "language": "auto",
  "enable_rag": true,
  "enable_research": false
}
```

### Response:
```json
{
  "session_id": "sess_user_123",
  "response": "పీఎం కిసాన్ పథకం ద్వారా అర్హులైన రైతులకు సంవత్సరానికి రూ. 6,000 మూడు విడతల్లో నేరుగా వారి బ్యాంక్ ఖాతాలో జమ చేయబడుతుంది.",
  "language": "te-IN",
  "detected_language": "te-IN",
  "model_used": "meta-llama/llama-3.3-70b-instruct:free",
  "agent_trace": [
    "Orchestrator: Received request",
    "LanguageAgent: Detected Telugu (te-IN)",
    "KnowledgeAgent: Found 2 relevant sources",
    "ResponseAgent: Generating response with Free LLM",
    "VerificationAgent: Status=Verified"
  ],
  "sources": [
    {
      "title": "PM Kisan Samman Nidhi Guidelines",
      "source": "Department of Agriculture and Farmers Welfare (pmkisan.gov.in)",
      "snippet": "PM-KISAN provides income support of Rs 6,000 per year...",
      "relevance_score": 0.82
    }
  ],
  "verified": true,
  "verification_notes": "Verified against 1 official scheme document(s).",
  "audio_available": true
}
```

---

## 2. Language Detection
**`POST /language/detect`**

### Request:
```json
{
  "text": "ee yojana ela apply cheyali cheppandi"
}
```

### Response:
```json
{
  "language": "te-IN",
  "language_name": "Telugu (Tenglish)",
  "confidence": 0.85,
  "is_code_mixed": true,
  "script_detected": "Latin"
}
```

---

## 3. Free Model Verification & Registry
**`GET /models/free`**

Returns curated list of verified zero-cost OpenRouter models with $0.00 prompt and completion pricing.

---

## 4. System & Agent Status
**`GET /agents/status`** and **`GET /system/status`**

Returns live status of all 7 agents, ChromaDB collection count, and runtime configuration.
