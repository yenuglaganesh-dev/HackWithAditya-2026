const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || '/api';
const DIRECT_AI_URL = import.meta.env.VITE_DIRECT_AI_URL || '/api';

async function fetchWithTimeout(url, options = {}, timeoutMs = 45000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function sendChatMessage({
  sessionId,
  message,
  language = 'auto',
  enableRag = true,
  enableResearch = false,
  includeAudio = false,
}) {
  const payload = {
    session_id: sessionId,
    message,
    language,
    enable_rag: enableRag,
    enable_research: enableResearch,
    include_audio: includeAudio,
  };

  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Gateway returned HTTP ${res.status}`);
  } catch (err) {
    if (DIRECT_AI_URL === API_BASE_URL) {
      throw err;
    }
    console.warn('Gateway route unreached, falling back directly to AI Engine:', err);
    const directRes = await fetchWithTimeout(`${DIRECT_AI_URL}/chat`, {
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

export async function transcribeSpeechAudio({
  audioBase64,
  mimeType = 'audio/webm',
  language = 'auto',
}) {
  const res = await fetchWithTimeout(
    `${API_BASE_URL}/speech/transcribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audio_base64: audioBase64,
        mime_type: mimeType,
        language,
      }),
    },
    25000
  );
  if (!res.ok) {
    throw new Error(`Speech transcription failed: HTTP ${res.status}`);
  }
  return await res.json();
}

export async function synthesizeSpeechAudio({ text, language = 'te' }) {
  try {
    const res = await fetchWithTimeout(
      `${API_BASE_URL}/speech/synthesize`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language }),
      },
      18000
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Server TTS failed, using browser SpeechSynthesis:', e);
  }
  return { success: false, audio_base64: null };
}

export async function clearServerSession(sessionId) {
  try {
    await fetch(`${API_BASE_URL}/chat/history/${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
    });
  } catch (e) {
    console.warn('Failed to clear session history:', e);
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
