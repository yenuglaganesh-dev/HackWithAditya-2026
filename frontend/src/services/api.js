const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api';
const DIRECT_AI_URL = import.meta.env.VITE_DIRECT_AI_URL || 'http://localhost:8000';

export async function sendChatMessage({
  sessionId,
  message,
  language = 'auto',
  enableRag = true,
  enableResearch = false,
}) {
  const payload = {
    session_id: sessionId,
    message,
    language,
    enable_rag: enableRag,
    enable_research: enableResearch,
  };

  try {
    // Try Java Spring Boot Gateway first
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Gateway returned HTTP ${res.status}`);
  } catch (err) {
    console.warn('Gateway route unreached, falling back directly to AI Engine:', err);
    // Direct Fallback to FastAPI AI engine
    const directRes = await fetch(`${DIRECT_AI_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!directRes.ok) {
      throw new Error(`AI Engine error: HTTP ${directRes.status}`);
    }
    return await directRes.json();
  }
}

export async function fetchSystemStatus() {
  try {
    const res = await fetch(`${DIRECT_AI_URL}/system/status`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Failed to get system status', e);
  }
  return { status: 'offline' };
}

export async function fetchFreeModels() {
  try {
    const res = await fetch(`${DIRECT_AI_URL}/models/free`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Failed to fetch free models', e);
  }
  return { models: [], total_free_models: 0 };
}
