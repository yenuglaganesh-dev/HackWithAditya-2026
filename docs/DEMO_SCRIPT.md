# Hackathon Demo Script & Presentation Guide
## BhashaBridge AI – Voice & Language AI for Bharat
### HackWithAditya 2026

---

## 5-Minute Pitch Outline

### Minute 1: The Problem (Bharat's Digital Divide)
- Over 800 million citizens in India rely primarily on regional languages like Telugu and Hindi.
- Government portals and digital citizen services are written in complex formal jargon, mostly in English.
- Rural citizens, elderly people, and farmers struggle with complicated forms and menus.

### Minute 2: Our Solution (BhashaBridge AI)
- A **Voice-First**, truly multilingual AI assistant for Indian citizens.
- Works natively across **Telugu, Hindi, and English**, with built-in code-mixing comprehension (Tenglish and Hinglish).
- **Strictly Free-First**: Built from the ground up to use verified free OpenRouter LLMs and browser-native Web Speech API. Zero required user or developer credits.

### Minute 3: Architecture & Innovation
- **7-Agent AI Engine**:
  1. *Language Agent*: Instant Unicode & dialect script detector.
  2. *Orchestrator Agent*: Session flow & budget-friendly LLM router.
  3. *Knowledge Agent*: Semantic ChromaDB RAG with verified government documents.
  4. *Research Agent*: Real-time verification against official `*.gov.in` portals.
  5. *Response Generation Agent*: Plain-spoken, empathetic regional responses.
  6. *Verification Agent*: Hallucination auditor ensuring accurate eligibility criteria.
  7. *Voice Agent*: Bi-directional voice conversation.
- **Java Spring Boot API Gateway**: Enterprise routing, input validation, and security isolation.

### Minute 4: Live Demo (Telugu & Hindi Citizen Flow)
1. **Telugu Voice Query**: Click the large microphone button and ask:
   > *"రైతు భరోసా పథకం గురించి చెప్పండి"* (Tell me about Rythu Bharosa)
   - Show automatic language detection (`te-IN`), ChromaDB retrieval, and response read aloud in natural Telugu.
2. **Hindi Code-Mixed Query**:
   > *"PM Kisan me aavedan kaise karna hoga?"*
   - Show Hinglish detection, verification badge, and source attribution (`pmkisan.gov.in`).
3. **Follow-up Memory**:
   > *"Who is eligible for this?"*
   - Show conversational memory retaining the context of PM Kisan without re-prompting.

### Minute 5: Social Impact & Scalability
- Zero infrastructure lock-in: runs efficiently on commodity hardware.
- Easily extensible to additional 22 scheduled Indian languages (Tamil, Kannada, Marathi, Bengali).
- Ready for deployment via Vercel (Frontend) and Render/Docker (Backends).

---

## Live Demo Test Phrases

| Language | Query | Expected Outcome |
|---|---|---|
| **Telugu (తెలుగు)** | *"ఆయుష్మాన్ భారత్ ద్వారా ఎంత చికిత్స లభిస్తుంది?"* | Explains ₹5 Lakh medical coverage under PM-JAY with source citation. |
| **Hindi (हिन्दी)** | *"पीएम किसान योजना क्या है और कितने पैसे मिलते हैं?"* | Explains ₹6,000 yearly in 3 installments under PM-KISAN. |
| **Tenglish (Code-mixed)** | *"ee pathakam ela apply cheyali cheppandi"* | Recognizes Telugu intent, provides application steps. |
| **English (Indian)** | *"What documents do I need to register for DigiLocker?"* | Explains Aadhaar & mobile number requirements from official guidelines. |
