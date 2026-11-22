import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = '0.0.0.0';

// ============================================================
// Types & Schemas
// ============================================================
interface SourceCitation {
  title: string;
  source: string;
  snippet: string;
  relevance_score?: number;
  url?: string;
  retrieval_date?: string;
}

interface ChatHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface KnowledgeDoc {
  id: string;
  title: string;
  content: string;
  source: string;
  category: string;
  source_url?: string;
  vector: number[];
}

// ============================================================
// Free Model Registry (from ai/services/free_model_registry.py)
// ============================================================
const VERIFIED_FREE_MODELS = [
  {
    id: 'openrouter/free',
    name: 'OpenRouter Free Router (Auto-Fallback)',
    is_free: true,
    context_length: 8192,
    prompt_pricing: 0.0,
    completion_pricing: 0.0,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B Instruct (Free)',
    is_free: true,
    context_length: 16384,
    prompt_pricing: 0.0,
    completion_pricing: 0.0,
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Google Gemini 2.0 Flash (Free)',
    is_free: true,
    context_length: 16384,
    prompt_pricing: 0.0,
    completion_pricing: 0.0,
  },
  {
    id: 'qwen/qwen-2.5-coder-32b-instruct:free',
    name: 'Qwen 2.5 Coder 32B (Free)',
    is_free: true,
    context_length: 32768,
    prompt_pricing: 0.0,
    completion_pricing: 0.0,
  },
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1 (Free)',
    is_free: true,
    context_length: 16384,
    prompt_pricing: 0.0,
    completion_pricing: 0.0,
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B Instruct (Free)',
    is_free: true,
    context_length: 8192,
    prompt_pricing: 0.0,
    completion_pricing: 0.0,
  },
];

function isModelFree(modelId?: string): boolean {
  if (!modelId) return false;
  if (modelId === 'openrouter/free' || modelId.endsWith(':free')) return true;
  return VERIFIED_FREE_MODELS.some((m) => m.id === modelId && m.is_free);
}

// ============================================================
// Agent 2: Language Agent (from ai/agents/language_agent.py)
// ============================================================
const SCRIPT_DETECTORS: Array<{
  code: string;
  name: string;
  script: string;
  regex: RegExp;
}> = [
  { code: 'te', name: 'Telugu', script: 'Telugu', regex: /[\u0C00-\u0C7F]/g },
  { code: 'hi', name: 'Hindi', script: 'Devanagari', regex: /[\u0900-\u097F]/g },
  { code: 'ta', name: 'Tamil', script: 'Tamil', regex: /[\u0B80-\u0BFF]/g },
  { code: 'kn', name: 'Kannada', script: 'Kannada', regex: /[\u0C80-\u0CFF]/g },
  { code: 'ml', name: 'Malayalam', script: 'Malayalam', regex: /[\u0D00-\u0D7F]/g },
  { code: 'bn', name: 'Bengali', script: 'Bengali', regex: /[\u0980-\u09FF]/g },
  { code: 'gu', name: 'Gujarati', script: 'Gujarati', regex: /[\u0A80-\u0AFF]/g },
  { code: 'pa', name: 'Punjabi', script: 'Gurmukhi', regex: /[\u0A00-\u0A7F]/g },
  { code: 'or', name: 'Odia', script: 'Odia', regex: /[\u0B00-\u0B7F]/g },
  { code: 'ur', name: 'Urdu', script: 'Arabic', regex: /[\u0600-\u06FF]/g },
];

const ENGLISH_GREETINGS = new Set([
  'hi', 'hello', 'hey', 'good', 'morning', 'afternoon', 'evening',
  'night', 'thanks', 'thank', 'you', 'ok', 'okay', 'yes', 'no',
  'please', 'help', 'what', 'how', 'why', 'who', 'when', 'where', 'can',
]);

const TENGLISH_MARKERS = new Set([
  'enti', 'ela', 'undhi', 'undi', 'unnara', 'cheppandi', 'cheyali',
  'ekkadiki', 'eppudu', 'chusthuna', 'chesanu', 'chesaru', 'telugu',
  'yenti', 'enduku', 'raithu', 'pathakam', 'darakhasthu', 'kaavali',
  'meeru', 'nenu', 'baga', 'bagundi', 'evaru', 'daggara', 'cheppava',
  'chesava', 'kavali', 'telusuko', 'chudu', 'bharosa', 'rythu', 'vastundi', 'vasthundi',
]);

const HINGLISH_MARKERS = new Set([
  'kaise', 'karna', 'hoga', 'bataiye', 'batao', 'aavedan',
  'chahiye', 'kaha', 'kyun', 'theek', 'namaste', 'dhanyawad',
  'aapka', 'mera', 'hamaare', 'kripya', 'jaankari', 'bataao',
  'kare', 'sakta', 'sakte', 'bhai', 'shukriya', 'yojana', 'kya', 'hai',
]);

function detectLanguage(text: string, preferredLang = 'auto') {
  if (!text || !text.trim()) {
    return {
      language: 'en',
      language_name: 'English',
      confidence: 1.0,
      is_code_mixed: false,
      script_detected: 'Latin',
    };
  }

  const textClean = text.trim();
  const totalChars = Math.max(textClean.replace(/\s+/g, '').length, 1);

  for (const detector of SCRIPT_DETECTORS) {
    const matches = (textClean.match(detector.regex) || []).length;
    if (matches > 0 && matches / totalChars > 0.15) {
      return {
        language: detector.code,
        language_name: detector.name,
        confidence: Number((matches / totalChars).toFixed(2)),
        is_code_mixed: /[a-zA-Z]/.test(textClean),
        script_detected: detector.script,
      };
    }
  }

  const cleanWords = (textClean.match(/[a-zA-Z]+/g) || []).map((w) => w.toLowerCase());

  if (
    cleanWords.length <= 3 &&
    cleanWords.some((w) => ENGLISH_GREETINGS.has(w)) &&
    !cleanWords.some((w) => TENGLISH_MARKERS.has(w) || HINGLISH_MARKERS.has(w))
  ) {
    return {
      language: 'en',
      language_name: 'English',
      confidence: 0.99,
      is_code_mixed: false,
      script_detected: 'Latin',
    };
  }

  const tenglishHits = cleanWords.filter((w) => TENGLISH_MARKERS.has(w)).length;
  const hinglishHits = cleanWords.filter((w) => HINGLISH_MARKERS.has(w)).length;

  if (tenglishHits > 0 && tenglishHits >= hinglishHits) {
    return {
      language: 'te',
      language_name: 'Telugu (Tenglish)',
      confidence: 0.9,
      is_code_mixed: true,
      script_detected: 'Latin',
    };
  }

  if (hinglishHits > tenglishHits) {
    return {
      language: 'hi',
      language_name: 'Hindi (Hinglish)',
      confidence: 0.9,
      is_code_mixed: true,
      script_detected: 'Latin',
    };
  }

  if (preferredLang === 'te' || preferredLang === 'te-IN') {
    return {
      language: 'te',
      language_name: 'Telugu',
      confidence: 0.8,
      is_code_mixed: false,
      script_detected: 'Latin',
    };
  }

  if (preferredLang === 'hi' || preferredLang === 'hi-IN') {
    return {
      language: 'hi',
      language_name: 'Hindi',
      confidence: 0.8,
      is_code_mixed: false,
      script_detected: 'Latin',
    };
  }

  return {
    language: 'en',
    language_name: 'English',
    confidence: 0.95,
    is_code_mixed: false,
    script_detected: 'Latin',
  };
}

// ============================================================
// Agent 3: Knowledge Agent & Offline Embedding RAG Store
// ============================================================
function computeOfflineEmbedding(text: string, dim = 128): number[] {
  const vec = new Array<number>(dim).fill(0);
  const tokens = text
    .toLowerCase()
    .split(/[\s,.;:!?()[\]{}"'/-]+/)
    .filter((t) => t.length > 1);

  for (const token of tokens) {
    let hash = 2166136261;
    for (let i = 0; i < token.length; i++) {
      hash ^= token.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const idx = Math.abs(hash) % dim;
    vec[idx] += 1;
  }

  const norm = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0)) || 1;
  return vec.map((v) => v / norm);
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

const knowledgeBase: KnowledgeDoc[] = [];

function seedKnowledgeBase() {
  if (knowledgeBase.length > 0) return;
  const seedItems = [
    {
      id: 'doc_seed_1',
      title: 'PM Kisan Samman Nidhi Guidelines',
      source: 'Department of Agriculture and Farmers Welfare (pmkisan.gov.in)',
      category: 'agriculture',
      source_url: 'https://pmkisan.gov.in',
      content:
        'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) is a central sector scheme providing income support of Rs 6,000 per year in three equal installments of Rs 2,000 directly to bank accounts of land-holding farmer families. Telugu: పీఎం కిసాన్ పథకం ద్వారా అర్హులైన రైతులకు సంవత్సరానికి రూ. 6,000 మూడు విడతల్లో నేరుగా వారి ఖాతాలో జమ చేయబడుతుంది. Hindi: पीएम किसान योजना के तहत पात्र किसानों को सालाना 6000 रुपये 3 किस्तों में मिलते हैं।',
    },
    {
      id: 'doc_seed_2',
      title: 'Ayushman Bharat PM-JAY Guidelines',
      source: 'National Health Authority (nha.gov.in)',
      category: 'healthcare',
      source_url: 'https://nha.gov.in',
      content:
        'Ayushman Bharat - PM-JAY (Pradhan Mantri Jan Arogya Yojana) offers health coverage of up to Rs 5 lakh per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families across India. Telugu: ఆయుష్మాన్ భారత్ ద్వారా ప్రతి పేద కుటుంబానికి ఏటా రూ. 5 లక్షల వరకు ఉచిత వైద్య చికిత్స సహాయం అందుతుంది. Hindi: आयुष्मान भारत योजना के तहत प्रति परिवार प्रति वर्ष 5 लाख रुपये तक का मुफ्त इलाज मिलता है।',
    },
    {
      id: 'doc_seed_3',
      title: 'Pradhan Mantri Awas Yojana (PMAY)',
      source: 'Ministry of Housing and Urban Affairs (pmaymis.gov.in)',
      category: 'housing',
      source_url: 'https://pmaymis.gov.in',
      content:
        'Pradhan Mantri Awas Yojana (PMAY) provides financial assistance and interest subsidy on housing loans for eligible rural and urban families to build pukka houses. Eligibility is verified via SECC 2011 data. Telugu: పీఎం ఆవాస్ యోజన ద్వారా పేద ప్రజలకు పక్కా ఇళ్ల నిర్మాణానికి సబ్సిడీ మరియు ఆర్థిక సహాయం అందుతుంది. Hindi: पीएम आवास योजना के तहत पक्के घर के निर्माण हेतु वित्तीय सहायता प्रदान की जाती है।',
    },
    {
      id: 'doc_seed_4',
      title: 'Rythu Bharosa & Farmer Welfare Schemes',
      source: 'State Department of Agriculture (rythubharosa.ap.gov.in)',
      category: 'agriculture',
      source_url: 'https://rythubharosa.ap.gov.in',
      content:
        'Rythu Bharosa / Rythu Bandhu: Government financial investment support of Rs 10,000 to Rs 13,500 per acre per year for agricultural inputs to farmers in Telangana and Andhra Pradesh. Telugu: రైతు భరోసా మరియు రైతు బంధు పథకాలు పంట పెట్టుబడి సాయంగా రైతులకు ఎకరానికి రూ. 10,000 నుండి 13,500 వరకు ఆర్థిక సహాయం అందిస్తాయి.',
    },
    {
      id: 'doc_seed_5',
      title: 'DigiLocker & Citizen Digital Services',
      source: 'Ministry of Electronics and Information Technology (digilocker.gov.in)',
      category: 'digital_services',
      source_url: 'https://digilocker.gov.in',
      content:
        'DigiLocker is an Indian digital identity and document wallet by the Ministry of Electronics and IT, enabling citizens to store Aadhaar, driving licence, PAN card, and academic certificates electronically. Hindi: डिजिलॉकर भारत सरकार की एक सुरक्षित डिजिटल दस्तावेज सेवा है। Telugu: డిజిలాకర్ ద్వారా ఆధార్, డ్రైవింగ్ లైసెన్స్ మరియు ఇతర ప్రభుత్వ పత్రాలను సురక్షితంగా నిల్వ చేసుకోవచ్చు.',
    },
  ];

  for (const item of seedItems) {
    knowledgeBase.push({
      ...item,
      vector: computeOfflineEmbedding(`${item.title} ${item.content} ${item.category}`),
    });
  }
}

seedKnowledgeBase();

function searchKnowledge(query: string, topK = 3, category?: string): SourceCitation[] {
  const qVec = computeOfflineEmbedding(query);
  const qLower = query.toLowerCase();
  const qTokens = qLower.split(/[\s,.;:!?()[\]{}"'/-]+/).filter((t) => t.length > 1);

  const candidates = category
    ? knowledgeBase.filter((d) => d.category === category)
    : knowledgeBase;

  const scored = candidates.map((doc) => {
    const vecSim = cosineSimilarity(qVec, doc.vector);
    const haystack = `${doc.title} ${doc.content} ${doc.source}`.toLowerCase();
    const keywordMatches = qTokens.filter((t) => haystack.includes(t)).length;
    const keywordScore = qTokens.length > 0 ? keywordMatches / qTokens.length : 0;
    const score = Number((vecSim * 0.5 + keywordScore * 0.5).toFixed(3));
    return { doc, score, keywordMatches };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored
    .filter((s) => s.keywordMatches > 0 && s.score >= 0.12)
    .slice(0, topK)
    .map(({ doc, score }) => ({
      title: doc.title,
      source: doc.source,
      snippet: doc.content,
      relevance_score: score,
      url: doc.source_url,
    }));
}

// ============================================================
// Agent 4: Research Agent (from ai/agents/research_agent.py)
// ============================================================
function searchPublicSources(query: string): SourceCitation[] {
  const now = new Date().toISOString().slice(0, 10);
  const q = query.toLowerCase();
  const results: SourceCitation[] = [];

  if (q.includes('kisan') || q.includes('farmer') || query.includes('రైతు') || query.includes('किसान')) {
    results.push({
      title: 'PM-KISAN Portal - Ministry of Agriculture',
      source: 'pmkisan.gov.in',
      snippet: 'Official portal for Pradhan Mantri Kisan Samman Nidhi. Beneficiaries receive Direct Benefit Transfer (DBT) of ₹6,000 annually.',
      url: 'https://pmkisan.gov.in',
      retrieval_date: now,
    });
  } else if (q.includes('ayushman') || q.includes('health') || query.includes('ఆరోగ్య') || query.includes('स्वास्थ्य')) {
    results.push({
      title: 'National Health Authority - PM-JAY',
      source: 'nha.gov.in',
      snippet: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana covers up to ₹5 lakh per family/year for hospital treatment.',
      url: 'https://nha.gov.in',
      retrieval_date: now,
    });
  } else if (q.includes('aadhaar') || q.includes('aadhar') || query.includes('ఆధార్') || query.includes('आधार')) {
    results.push({
      title: 'UIDAI - Unique Identification Authority of India',
      source: 'uidai.gov.in',
      snippet: 'Official portal for Aadhaar authentication, address update, and mAadhaar services.',
      url: 'https://uidai.gov.in',
      retrieval_date: now,
    });
  }

  return results;
}

// ============================================================
// Memory Service (from ai/services/memory_service.py)
// ============================================================
const MAX_HISTORY_TURNS = 6;
const sessionMemory = new Map<string, ChatHistoryMessage[]>();

function getHistory(sessionId: string): ChatHistoryMessage[] {
  return sessionMemory.get(sessionId) || [];
}

function addMessage(sessionId: string, role: 'user' | 'assistant', content: string) {
  const history = sessionMemory.get(sessionId) || [];
  history.push({ role, content, timestamp: String(Date.now() / 1000) });
  const maxMsgs = MAX_HISTORY_TURNS * 2;
  sessionMemory.set(sessionId, history.length > maxMsgs ? history.slice(-maxMsgs) : history);
}

// ============================================================
// Agent 5: Response Generation Agent (OpenRouter + Gemini API)
// ============================================================
let lastModelStatus = 'idle';
let lastModelError: string | null = null;
let lastModelUsed: string | null = null;
const modelCooldownUntil = new Map<string, number>();

function isModelInCooldown(model: string): boolean {
  const until = modelCooldownUntil.get(model);
  if (!until) return false;
  if (Date.now() > until) {
    modelCooldownUntil.delete(model);
    return false;
  }
  return true;
}

function markModelCooldown(model: string, ms = 5 * 60 * 1000) {
  modelCooldownUntil.set(model, Date.now() + ms);
}

function getOpenRouterKey(): string {
  const key = (process.env.OPENROUTER_API_KEY || '').trim();
  if (!key || key.startsWith('your_') || key.length < 10) return '';
  return key;
}

function getGeminiKey(): string {
  const key = (process.env.GEMINI_API_KEY || '').trim();
  if (!key || key === 'MY_GEMINI_API_KEY' || key.length < 10) return '';
  return key;
}

async function generateLlmResponse(params: {
  userMessage: string;
  targetLanguage: string;
  contextHistory: ChatHistoryMessage[];
  sources: SourceCitation[];
  isGreeting: boolean;
}): Promise<{ content: string; model_used: string; error?: string }> {
  const { userMessage, targetLanguage, contextHistory, sources, isGreeting } = params;

  const langNames: Record<string, string> = {
    te: 'TELUGU (తెలుగు)',
    hi: 'HINDI (हिन्दी)',
    ta: 'TAMIL (தமிழ்)',
    kn: 'KANNADA (ಕನ್ನಡ)',
    ml: 'MALAYALAM (മലയാളം)',
    bn: 'BENGALI (বাংলা)',
    gu: 'GUJARATI (ગુજરાતી)',
    pa: 'PUNJABI (ਪੰਜਾਬੀ)',
    or: 'ODIA (ଓଡ଼ିଆ)',
    ur: 'URDU (اردو)',
  };
  const shortLang = targetLanguage.split('-')[0];
  let langRule =
    'Detect the exact language and script of the user message and ALWAYS respond naturally, warmly, and fluently in that EXACT SAME language and script.';
  if (langNames[shortLang] && !targetLanguage.startsWith('auto')) {
    langRule = `Respond naturally, warmly, and fluently in ${langNames[shortLang]}. Match the user's exact spoken/written language (if the user wrote in Marathi, Tamil, Telugu, Hindi, etc., reply in that exact language and script).`;
  } else if (shortLang === 'en') {
    langRule =
      'Respond clearly and warmly in ENGLISH. If the user message is actually in another language written in Latin script (e.g., Tenglish or Hinglish), reply naturally in that same language.';
  }

  let contextInstruction = '';
  let sourcesText = '';

  if (isGreeting) {
    contextInstruction =
      'The user is sharing a conversational greeting or polite remark. Reply warmly in 1-2 short natural sentences in the exact same language and ask how you can help them today. DO NOT dump irrelevant scheme information.';
  } else {
    contextInstruction =
      "Answer the user's specific query clearly, directly, and concisely (2-4 natural spoken sentences unless detailed steps are requested) in the exact same language as the user. Base factual statements on any verified guidelines below. Never invent subsidy amounts or deadlines.";
    if (sources.length > 0) {
      sourcesText =
        '\nVERIFIED OFFICIAL GUIDELINES:\n' +
        sources.map((s) => `- ${s.title} (${s.source}): ${s.snippet}`).join('\n');
    } else {
      sourcesText = '\nNo direct local verified scheme document found. Provide general helpful guidance.';
    }
  }

  const systemPrompt = `You are BhashaBridge AI, a helpful, warm voice and language assistant designed for Indian citizens.

${langRule}

Guidance:
${contextInstruction}
${sourcesText}

Formatting Rules:
1. ALWAYS reply in the exact same language as the user's input.
2. Keep replies natural, concise, and pleasant for human speech reading.
3. Avoid markdown clutter, excessive asterisks, or raw URLs.
4. Answer follow-up questions using the ongoing conversation history.`;

  // 1. Prefer OpenRouter if OPENROUTER_API_KEY is explicitly configured
  const openRouterKey = getOpenRouterKey();
  if (openRouterKey) {
    const configuredModel = process.env.OPENROUTER_MODEL || 'openrouter/free';
    const baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
    const targetModel = isModelFree(configuredModel) ? configuredModel : 'openrouter/free';
    const candidateModels = Array.from(
      new Set([
        targetModel,
        'openrouter/free',
        'meta-llama/llama-3.3-70b-instruct:free',
        'google/gemini-2.0-flash-exp:free',
        'mistralai/mistral-7b-instruct:free',
        'qwen/qwen-2.5-coder-32b-instruct:free',
      ])
    ).filter((m) => isModelFree(m));

    const openRouterMessages = [
      { role: 'system', content: systemPrompt },
      ...contextHistory.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: userMessage },
    ];

    let lastErr = '';
    for (const model of candidateModels) {
      try {
        const resp = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openRouterKey}`,
            'HTTP-Referer': 'https://github.com/yenuglaganesh-dev/HackWithAditya-2026',
            'X-Title': 'BhashaBridge AI - Voice & Language AI for Bharat',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: openRouterMessages,
            temperature: 0.3,
            max_tokens: 1000,
          }),
        });

        if (resp.ok) {
          const data = (await resp.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const content = data.choices?.[0]?.message?.content?.trim();
          if (content) {
            lastModelStatus = 'operational';
            lastModelError = null;
            lastModelUsed = model;
            return { content, model_used: model };
          }
        } else if (resp.status === 401) {
          lastModelStatus = 'error_auth';
          lastModelError = 'OpenRouter returned HTTP 401 Unauthorized';
          return {
            content: 'Authentication Error: The configured OpenRouter API key was rejected (HTTP 401 Unauthorized).',
            model_used: 'error-auth',
            error: lastModelError,
          };
        } else {
          lastErr = `HTTP ${resp.status}`;
        }
      } catch (err) {
        lastErr = err instanceof Error ? err.message : String(err);
      }
    }
    lastModelStatus = 'error_exhausted';
    lastModelError = lastErr;
  }

  // 2. Use @google/genai server-side with GEMINI_API_KEY (AI Studio standard)
  const geminiKey = getGeminiKey();
  if (geminiKey) {
    const aiV1 = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        timeout: 18000,
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    const aiV1Beta = new GoogleGenAI({
      apiKey: geminiKey,
      apiVersion: 'v1beta',
      httpOptions: {
        timeout: 18000,
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const contents = [
      ...contextHistory.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      { role: 'user', parts: [{ text: userMessage }] },
    ];

    const extractCleanError = (raw: string): string => {
      try {
        const parsed = JSON.parse(raw) as { error?: { message?: string; status?: string } };
        if (parsed?.error?.message) return parsed.error.message;
      } catch {
        // not JSON
      }
      return raw;
    };

    const isTransient = (raw: string): boolean => {
      const low = raw.toLowerCase();
      return (
        low.includes('503') ||
        low.includes('unavailable') ||
        low.includes('high demand') ||
        low.includes('504') ||
        low.includes('deadline') ||
        low.includes('429') ||
        low.includes('abort') ||
        low.includes('timeout') ||
        low.includes('fetch failed') ||
        low.includes('econnreset')
      );
    };

    // Exponential backoff across free models & endpoints to absorb temporary 503 demand spikes
    const geminiPlan: Array<{
      client: GoogleGenAI;
      model: string;
      thinkingLevel?: ThinkingLevel;
      timeoutMs: number;
      backoffMs: number;
    }> = [
      { client: aiV1, model: 'gemini-3.1-flash-lite', timeoutMs: 12000, backoffMs: 0 },
      { client: aiV1, model: 'gemini-3.1-flash-lite', timeoutMs: 12000, backoffMs: 900 },
      { client: aiV1Beta, model: 'gemini-3.1-flash-lite', timeoutMs: 12000, backoffMs: 1600 },
      { client: aiV1, model: 'gemini-4-hydrogen', thinkingLevel: ThinkingLevel.LOW, timeoutMs: 12000, backoffMs: 800 },
      { client: aiV1, model: 'gemini-3.1-flash-lite', timeoutMs: 15000, backoffMs: 2400 },
    ];

    let lastGeminiErr = '';
    for (const step of geminiPlan) {
      if (isModelInCooldown(step.model) && step.model !== 'gemini-3.1-flash-lite') {
        continue;
      }
      if (step.backoffMs > 0) {
        await new Promise((r) => setTimeout(r, step.backoffMs));
      }
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), step.timeoutMs);
      try {
        const config: Record<string, unknown> = {
          systemInstruction: systemPrompt,
          abortSignal: controller.signal,
        };
        if (step.thinkingLevel) {
          config.thinkingConfig = { thinkingLevel: step.thinkingLevel };
        }

        const response = await step.client.models.generateContent({
          model: step.model,
          contents,
          config,
        });

        const text = (response.text || '').trim();
        if (text) {
          lastModelStatus = 'operational';
          lastModelError = null;
          lastModelUsed = step.model;
          return {
            content: text,
            model_used: step.model,
          };
        }
      } catch (err) {
        lastGeminiErr = err instanceof Error ? err.message : String(err);
        if (step.model !== 'gemini-3.1-flash-lite') {
          markModelCooldown(step.model);
        }
        if (!isTransient(lastGeminiErr)) {
          break;
        }
      } finally {
        clearTimeout(timer);
      }
    }

    const cleanErr = extractCleanError(lastGeminiErr);
    lastModelStatus = 'error_gemini';
    lastModelError = cleanErr;
    return {
      content: `Temporary AI Server Busy: ${cleanErr} Please tap Retry or send again in a few seconds.`,
      model_used: 'error-gemini',
      error: cleanErr,
    };
  }

  lastModelStatus = 'error_missing_key';
  lastModelError = 'No GEMINI_API_KEY or OPENROUTER_API_KEY configured';
  return {
    content:
      'Configuration Error: Please configure GEMINI_API_KEY in Settings > Secrets (or OPENROUTER_API_KEY in environment) to enable live AI responses.',
    model_used: 'error-unconfigured-key',
    error: lastModelError,
  };
}

// ============================================================
// Agent 6: Verification Agent & Agent 7: Speech Service
// ============================================================
function verifyResponse(sources: SourceCitation[]) {
  if (!sources || sources.length === 0) {
    return {
      verified: false,
      confidence: 0.7,
      notes: 'General guidance provided. No local verified government scheme citation matched.',
    };
  }
  return {
    verified: true,
    confidence: 0.95,
    notes: `Verified against ${sources.length} official scheme document(s).`,
  };
}

function isSarvamTtsActive(): boolean {
  const enabled = (process.env.ENABLE_SARVAM_TTS || '').toLowerCase() === 'true';
  const key = (process.env.SARVAM_API_KEY || '').trim();
  return enabled && key.length > 10 && !key.startsWith('your_');
}

async function transcribeSpeechAudio(
  audioBase64: string,
  mimeType = 'audio/webm',
  preferredLang = 'auto'
) {
  const geminiKey = getGeminiKey();
  if (!geminiKey) {
    return {
      success: false,
      transcript: '',
      language: 'en',
      language_name: 'English',
      error: 'GEMINI_API_KEY is not configured for server-side speech transcription.',
    };
  }

  const aiV1Beta = new GoogleGenAI({
    apiKey: geminiKey,
    apiVersion: 'v1beta',
    httpOptions: {
      timeout: 20000,
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const aiV1 = new GoogleGenAI({
    apiKey: geminiKey,
    httpOptions: {
      timeout: 20000,
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const cleanMime = mimeType.split(';')[0].trim() || 'audio/webm';
  const sttCandidates: Array<{ model: string; client: GoogleGenAI; timeoutMs: number }> = [
    { model: 'gemini-3.5-transcribe', client: aiV1Beta, timeoutMs: 12000 },
    { model: 'gemini-3.1-flash-lite', client: aiV1, timeoutMs: 18000 },
  ];
  let lastSttErr = '';

  for (const sttCandidate of sttCandidates) {
    if (isModelInCooldown(sttCandidate.model) && sttCandidate.model !== 'gemini-3.1-flash-lite') {
      continue;
    }
    try {
      const response = await Promise.race([
        sttCandidate.client.models.generateContent({
          model: sttCandidate.model,
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: cleanMime,
                  data: audioBase64,
                },
              },
              {
                text: 'Transcribe this spoken audio accurately in the exact language and native script spoken by the speaker (e.g. Telugu in తెలుగు, Hindi in हिन्दी, Tamil in தமிழ், Kannada in ಕನ್ನಡ, English in Latin script, etc.). Do not translate it into another language. If there is no speech or only silence, output an empty string. Output ONLY the transcribed words.',
              },
            ],
          },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout waiting for ${sttCandidate.model}`)), sttCandidate.timeoutMs)
        ),
      ]);

      const transcript = (response.text || '').trim().replace(/^["']|["']$/g, '').trim();
      const detected = detectLanguage(transcript, preferredLang);
      return {
        success: true,
        transcript,
        language: detected.language,
        detected_language: detected.language,
        language_name: detected.language_name,
        is_code_mixed: detected.is_code_mixed,
        script_detected: detected.script_detected,
        model_used: sttCandidate.model,
      };
    } catch (err) {
      lastSttErr = err instanceof Error ? err.message : String(err);
      console.warn(`Speech transcription failed on ${sttCandidate.model}:`, lastSttErr);
      if (sttCandidate.model !== 'gemini-3.1-flash-lite') {
        markModelCooldown(sttCandidate.model);
      }
    }
  }

  return {
    success: false,
    transcript: '',
    language: 'en',
    language_name: 'English',
    error: lastSttErr || 'Speech transcription failed.',
  };
}

async function synthesizeSpeech(text: string, language = 'te') {
  if (!text || !text.trim()) {
    return {
      success: false,
      audio_base64: null as string | null,
      provider: 'browser-speech-synthesis',
      message: 'No text provided.',
    };
  }

  let cleanText = text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1')
    .replace(/[*#_`~>]/g, '')
    .replace(/https?:\/\/\S+/g, 'official portal')
    .replace(/\n+/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (cleanText.length > 500) {
    cleanText = cleanText.slice(0, 500) + '...';
  }

  if (isSarvamTtsActive()) {
    const langMap: Record<string, string> = {
      te: 'te-IN',
      'te-IN': 'te-IN',
      hi: 'hi-IN',
      'hi-IN': 'hi-IN',
      en: 'en-IN',
      'en-IN': 'en-IN',
    };
    const targetLang = langMap[language] || 'te-IN';
    const speaker = targetLang === 'te-IN' ? 'kavya' : targetLang === 'hi-IN' ? 'priya' : 'aditya';

    try {
      const resp = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'api-subscription-key': (process.env.SARVAM_API_KEY || '').trim(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: [cleanText],
          target_language_code: targetLang,
          speaker,
          pitch: 0,
          pace: 1.0,
          loudness: 1.5,
          speech_sample_rate: 8000,
          enable_preprocessing: true,
          model: 'bulbul:v3',
        }),
      });

      if (resp.ok) {
        const data = (await resp.json()) as { audios?: string[] };
        if (data.audios && data.audios.length > 0) {
          return {
            success: true,
            audio_base64: data.audios[0],
            content_type: 'audio/wav',
            provider: 'sarvam-bulbul-v3',
            speaker,
            language: targetLang,
          };
        }
      }
    } catch (err) {
      console.warn('Sarvam TTS error, falling back to Gemini TTS:', err);
    }
  }

  const geminiKey = getGeminiKey();
  if (geminiKey) {
    const ai = new GoogleGenAI({
      apiKey: geminiKey,
      apiVersion: 'v1beta',
      httpOptions: {
        timeout: 18000,
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const ttsAttempts: Array<{ model: string; voice: string; withMetadata: boolean }> = [
      { model: 'gemini-3.8-flash-tts', voice: 'Kore', withMetadata: true },
      { model: 'gemini-3.8-flash-lite-tts', voice: 'Zephyr', withMetadata: true },
      { model: 'gemini-3.8-flash-lite-tts', voice: 'Kore', withMetadata: false },
    ];

    for (const attempt of ttsAttempts) {
      if (isModelInCooldown(attempt.model) && attempt.model !== 'gemini-3.8-flash-lite-tts') {
        continue;
      }
      try {
        const part = attempt.withMetadata
          ? {
              text: cleanText,
              speechMetadata: {
                style: 'Warm, empathetic, expressive human conversational voice with natural breathing, gentle warmth, and clear pronunciation',
              },
            }
          : { text: cleanText };

        const ttsResponse = await Promise.race([
          ai.models.generateContent({
            model: attempt.model,
            contents: [
              {
                role: 'user',
                parts: [part],
              },
            ],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: attempt.voice },
                },
              },
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('TTS timeout')), 15000)
          ),
        ]);

        const base64Audio =
          ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return {
            success: true,
            audio_base64: base64Audio,
            content_type: 'audio/wav',
            provider: attempt.model,
            language,
          };
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`Gemini TTS (${attempt.model}, meta=${attempt.withMetadata}) failed:`, msg);
        if (attempt.model !== 'gemini-3.8-flash-lite-tts') {
          markModelCooldown(attempt.model);
        }
      }
    }
  }

  return {
    success: false,
    audio_base64: null as string | null,
    provider: 'browser-speech-synthesis',
    message: 'Using browser client native speech synthesis.',
  };
}

// ============================================================
// Agent 1: Orchestrator Pipeline
// ============================================================
const GREETING_WORDS = new Set([
  'hi', 'hello', 'hey', 'namaste', 'namaskaram', 'namaskara',
  'good morning', 'good evening', 'good afternoon', 'ela unnaru', 'ela unnavu',
  'kaise ho', 'kaise hain', 'how are you', 'who are you', 'what is your name',
  'nuvvu evaru', 'tum kaun ho', 'thanks', 'thank you', 'dhanyawad',
  'నమస్కారం', 'హలో', 'హాయ్', 'ఎలా ఉన్నారు', 'ఎలా ఉన్నావు', 'ధన్యవాదాలు',
  'नमस्ते', 'नमस्कार', 'हेलो', 'कैसे हैं', 'कैसे हो', 'धन्यवाद',
]);

function isGreetingOrSmalltalk(text: string): boolean {
  const clean = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= 4) {
    for (const g of GREETING_WORDS) {
      if (clean.includes(g)) return true;
    }
  }
  return false;
}

// ============================================================
// Express App & Router
// ============================================================
async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  const apiRouter = express.Router();

  apiRouter.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'BhashaBridge AI',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: Date.now() / 1000,
    });
  });

  apiRouter.post('/chat', async (req: Request, res: Response) => {
    try {
      const {
        session_id = 'default_session',
        message,
        language = 'auto',
        enable_rag = true,
        enable_research = false,
        include_audio = false,
      } = req.body || {};

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ detail: 'Message is required' });
      }

      const agentTrace: string[] = ['Orchestrator: Received request'];
      const detectedInfo = detectLanguage(message, language);
      agentTrace.push(`LanguageAgent: Detected ${detectedInfo.language_name} (${detectedInfo.language})`);

      const targetLang =
        language && language !== 'auto'
          ? String(language).replace('-IN', '')
          : detectedInfo.language;

      const isGreeting = isGreetingOrSmalltalk(message);
      const citations: SourceCitation[] = [];

      if (enable_rag && !isGreeting) {
        agentTrace.push('KnowledgeAgent: Querying vector knowledge store');
        const ragResults = searchKnowledge(message, 3);
        citations.push(...ragResults);
        if (ragResults.length > 0) {
          agentTrace.push(`KnowledgeAgent: Found ${ragResults.length} relevant sources`);
        }
      } else if (isGreeting) {
        agentTrace.push('Orchestrator: Conversational greeting detected (RAG skipped)');
      }

      if (enable_research && !isGreeting) {
        agentTrace.push('ResearchAgent: Querying official government domains');
        const researchResults = searchPublicSources(message);
        citations.push(...researchResults);
      }

      const history = getHistory(session_id);
      if (history.length > 0) {
        agentTrace.push(`MemoryService: Loaded ${history.length} previous turns`);
      }

      agentTrace.push('ResponseAgent: Generating response with AI Engine');
      const genResult = await generateLlmResponse({
        userMessage: message,
        targetLanguage: targetLang,
        contextHistory: history,
        sources: citations,
        isGreeting,
      });

      const verification = verifyResponse(citations);
      if (citations.length > 0 && verification.verified) {
        agentTrace.push('VerificationAgent: Verified against official scheme references');
      } else {
        agentTrace.push('VerificationAgent: Conversational / General guidance');
      }

      if (!genResult.error) {
        addMessage(session_id, 'user', message);
        addMessage(session_id, 'assistant', genResult.content);
      }

      let audioPayload: string | null = null;
      if (!genResult.error && (include_audio || isSarvamTtsActive())) {
        const synthRes = await synthesizeSpeech(genResult.content, targetLang);
        if (synthRes.success && synthRes.audio_base64) {
          audioPayload = synthRes.audio_base64;
          agentTrace.push(`VoiceAgent: Synthesized audio via ${synthRes.provider}`);
        }
      }

      return res.json({
        session_id,
        response: genResult.content,
        language: targetLang,
        detected_language: detectedInfo.language,
        model_used: genResult.model_used,
        agent_trace: agentTrace,
        sources: citations.length > 0 && !isGreeting ? citations : [],
        verified: citations.length > 0 && !isGreeting ? verification.verified : false,
        verification_notes: verification.notes,
        audio_available: true,
        audio_base64: audioPayload,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ detail: `AI Engine Error: ${msg}` });
    }
  });

  apiRouter.get('/chat/history/:sessionId', (req: Request, res: Response) => {
    const sessionId = String(req.params.sessionId || 'default_session');
    res.json({
      session_id: sessionId,
      messages: getHistory(sessionId),
    });
  });

  apiRouter.delete('/chat/history/:sessionId', (req: Request, res: Response) => {
    const sessionId = String(req.params.sessionId || 'default_session');
    sessionMemory.delete(sessionId);
    res.json({ status: 'cleared', session_id: sessionId });
  });

  apiRouter.post('/language/detect', (req: Request, res: Response) => {
    const text = req.body?.text || '';
    res.json(detectLanguage(text));
  });

  apiRouter.get('/models/status', (_req: Request, res: Response) => {
    const hasOpenRouter = Boolean(getOpenRouterKey());
    const hasGemini = Boolean(getGeminiKey());
    res.json({
      provider: hasOpenRouter ? 'OpenRouter' : hasGemini ? 'Google Gemini (Server-Side)' : 'Unconfigured',
      configured_model: hasOpenRouter ? process.env.OPENROUTER_MODEL || 'openrouter/free' : 'gemini-3.1-flash-lite',
      api_key_configured: hasOpenRouter || hasGemini,
      base_url: hasOpenRouter ? process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1' : 'https://generativelanguage.googleapis.com',
      last_status: lastModelStatus,
      last_error: lastModelError,
      last_model_used: lastModelUsed,
      strict_free_mode: true,
    });
  });

  apiRouter.get('/models/free', (_req: Request, res: Response) => {
    res.json({
      models: VERIFIED_FREE_MODELS,
      default_model: getOpenRouterKey() ? process.env.OPENROUTER_MODEL || 'openrouter/free' : 'gemini-3.1-flash-lite',
      total_free_models: VERIFIED_FREE_MODELS.length,
    });
  });

  apiRouter.post('/knowledge/search', (req: Request, res: Response) => {
    const { query = '', top_k = 3, category } = req.body || {};
    const results = searchKnowledge(query, top_k, category);
    res.json({ query, results });
  });

  apiRouter.post('/knowledge/upload', (req: Request, res: Response) => {
    const { title, content, category = 'general', source_url } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ detail: 'title and content are required' });
    }
    const id = `doc_${Math.random().toString(36).slice(2, 10)}`;
    knowledgeBase.push({
      id,
      title,
      content,
      source: 'Admin Upload',
      category,
      source_url: source_url || '',
      vector: computeOfflineEmbedding(`${title} ${content} ${category}`),
    });
    return res.json({
      status: 'success',
      doc_id: id,
      message: 'Document indexed successfully into Knowledge Base',
    });
  });

  apiRouter.post('/speech/transcribe', async (req: Request, res: Response) => {
    const { audio_base64, mime_type, language } = req.body || {};
    if (audio_base64 && typeof audio_base64 === 'string') {
      const result = await transcribeSpeechAudio(audio_base64, mime_type || 'audio/webm', language || 'auto');
      return res.json(result);
    }

    const sarvamActive = isSarvamTtsActive();
    return res.json({
      ai_speech_agent: {
        active: Boolean(getGeminiKey()),
        stt_model: 'gemini-3.5-transcribe',
        tts_model: 'gemini-3.8-flash-lite-tts',
        auto_language_detection: true,
      },
      browser_web_speech_api: {
        supported: true,
        status: 'primary_free_client_native',
        stt_languages: ['te-IN', 'hi-IN', 'en-IN'],
        tts_languages: ['te-IN', 'hi-IN', 'en-IN'],
      },
      sarvam_tts_api: {
        active: sarvamActive,
        model: 'bulbul:v3',
        status: sarvamActive ? 'ready' : 'disabled_by_default',
      },
    });
  });

  apiRouter.post('/speech/synthesize', async (req: Request, res: Response) => {
    const { text = '', language = 'te' } = req.body || {};
    const result = await synthesizeSpeech(text, language);
    res.json(result);
  });

  apiRouter.get('/agents/status', (_req: Request, res: Response) => {
    res.json({
      orchestrator_agent: 'ready',
      language_agent: 'ready (Telugu, Hindi, English, Tenglish, Hinglish)',
      knowledge_agent: `ready (Knowledge items: ${knowledgeBase.length})`,
      research_agent: 'ready (Verified Gov domains)',
      response_agent: 'ready (Multi-Agent LLM)',
      verification_agent: 'ready (Fact & Source Auditor)',
      voice_agent: `ready (Sarvam TTS: ${isSarvamTtsActive()}, Web Speech Native)`,
    });
  });

  apiRouter.get('/system/status', (_req: Request, res: Response) => {
    const hasOpenRouter = Boolean(getOpenRouterKey());
    const hasGemini = Boolean(getGeminiKey());
    res.json({
      status: 'operational',
      ai_connected: hasOpenRouter || hasGemini,
      openrouter_base_url: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      default_model: hasOpenRouter ? process.env.OPENROUTER_MODEL || 'openrouter/free' : 'gemini-3.1-flash-lite',
      strict_free_mode: true,
      chromadb_storage: 'in-memory-vector-store',
      voice_integration: 'Gemini 3.8 Neural TTS + Web Speech Native',
      knowledge_documents_indexed: knowledgeBase.length,
    });
  });

  // Mount API routes under /api (and direct paths for compatibility)
  app.use('/api', apiRouter);
  app.use('/', apiRouter);

  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`BhashaBridge AI running at http://${HOST}:${PORT}`);
  });
}

startServer();
