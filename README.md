# 🇮🇳 BhashaBridge AI – Voice & Language AI Assistant for Bharat
### HackWithAditya 2026 Project Implementation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![Java 17+](https://img.shields.io/badge/Java-17+-orange.svg)](https://www.oracle.com/java/)
[![React 18](https://img.shields.io/badge/React-18-cyan.svg)](https://reactjs.org/)
[![Free-First](https://img.shields.io/badge/Model-Strictly%20Free--First-brightgreen.svg)](#free-model-enforcement)

> **BhashaBridge AI** is an intelligent, voice-first multilingual assistant enabling Indian citizens to access critical government welfare, agricultural, healthcare, and citizen services in **Telugu (తెలుగు)**, **Hindi (हिन्दी)**, and **English**, including mixed scripts (Tenglish & Hinglish).

---

## 🌟 Key Features

- 🎙️ **Voice-First Multilingual Interaction**: Integrated with browser-native Web Speech API for real-time speech-to-text and speech-synthesis (TTS) at zero cost.
- 🤖 **7-Agent Autonomous Architecture**:
  1. **Orchestrator Agent**: Manages multi-agent execution pipeline.
  2. **Language Agent**: Real-time Telugu/Hindi/English and dialect code-mixing detection.
  3. **Knowledge Agent (RAG)**: Persistent ChromaDB retrieval for government schemes.
  4. **Research Agent**: Live fact-grounding via official government portals (`*.gov.in`).
  5. **Response Generation Agent**: Empathetic, citizen-friendly explanations in regional languages.
  6. **Verification Agent**: Anti-hallucination auditor validating claims against retrieved citations.
  7. **Voice Agent**: Bi-directional speech orchestration with text fallback.
- 🆓 **Strictly Free-First**: Operates on verified zero-cost OpenRouter models (`openrouter/free`, `meta-llama/llama-3.3-70b-instruct:free`) with zero paid fallbacks.
- 🛡️ **Enterprise Gateway Architecture**: Java Spring Boot 3 gateway for validation, session handling, and security isolation.
- 🎨 **Bharat-Inspired UI**: Premium dark navy and saffron design crafted with Tailwind CSS and Lucide icons.

---

## 🏗️ System Architecture

```
React UI (Port 5173) 
      |
      v
Java Spring Boot 3 Gateway (Port 8080)
      |
      v
Python FastAPI AI Engine (Port 8000)
      |
      +---> Orchestrator Agent
               +---> Language Agent (Unicode & Dialect Detector)
               +---> Knowledge Agent (ChromaDB Vector Store)
               +---> Research Agent (Official Gov Sources)
               +---> Response Generation Agent (OpenRouter Free LLM)
               +---> Verification Agent (Citation & Fact Auditor)
               +---> Voice Agent (Browser Web Speech API)
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Python 3.11+**
- **Node.js 18+** & npm
- **Java 17+** (Optional if running direct AI connection mode)

### 2. Configure Environment Variables
Copy example files:
```bash
cp ai/.env.example ai/.env
cp frontend/.env.example frontend/.env
```
Edit `ai/.env`:
```env
OPENROUTER_API_KEY=your_free_openrouter_api_key
OPENROUTER_MODEL=openrouter/free
```
*(Note: If no API key is provided, the application runs in self-contained resilient demonstration mode).*

### 3. Start the Python AI Engine
```bash
# In project root:
uv pip install -r ai/requirements.txt
# Or: pip install -r ai/requirements.txt

# Start FastAPI server on port 8000
python -m uvicorn ai.main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in Chrome, Edge, or any modern browser.

### 5. Run the Test Suite
```bash
python -m pytest ai/tests/test_ai_engine.py -v
```

---

## 📚 Documentation
- [Architecture & Multi-Agent Specification](docs/ARCHITECTURE.md)
- [API Reference](docs/API_DOCUMENTATION.md)
- [Hackathon Demo Script & Presentation Guide](docs/DEMO_SCRIPT.md)

---

## 👥 HackWithAditya 2026 Team
Built with passion for **AI for Bharat** 🇮🇳
