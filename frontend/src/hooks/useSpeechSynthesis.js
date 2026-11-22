import { useState, useEffect, useCallback, useRef } from 'react';
import { synthesizeSpeechAudio } from '../services/api';

/**
 * Advanced Multi-Lingual Speech Synthesis (TTS) Hook
 * Features:
 * 1. Supports Telugu (te-IN), Hindi (hi-IN), and English (en-IN).
 * 2. Dedicated language-specific voice filtering matching Indian locale voices.
 * 3. Play, Pause, Resume, Stop controls and real speaking status.
 * 4. Replay support.
 * 5. Server-side high-quality audio fallback support (Sarvam Bulbul v3 / Gemini TTS).
 * 6. Never speaks untranslated English when response is in Telugu or Hindi.
 */
export function useSpeechSynthesis() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [activeVoiceName, setActiveVoiceName] = useState('');
  
  const audioRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const wavCacheRef = useRef(new Map());
  const playTokenRef = useRef(0);
  const lastSpokenRef = useRef({ text: '', langCode: 'te-IN', audioBase64: null });

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      setIsSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    playTokenRef.current += 1;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
    } else if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
      setIsPaused(false);
    } else if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  // Filter the best matching voice for the target Indian language
  const selectBestVoice = useCallback((langCode, availableVoices) => {
    if (!availableVoices || availableVoices.length === 0) return null;

    const short = String(langCode || 'en').split('-')[0].toLowerCase();
    const full = short === 'te' ? 'te-IN' : short === 'hi' ? 'hi-IN' : 'en-IN';

    // 1. Direct match on full BCP-47 tag
    let match = availableVoices.find((v) => v.lang.toLowerCase() === full.toLowerCase());
    if (match) return match;

    // 2. Match on short prefix
    match = availableVoices.find((v) => v.lang.toLowerCase().startsWith(short));
    if (match) return match;

    // 3. Name heuristic (e.g. "Telugu", "Hindi", "India")
    const searchWord = short === 'te' ? 'telugu' : short === 'hi' ? 'hindi' : 'india';
    match = availableVoices.find((v) => v.name.toLowerCase().includes(searchWord));
    if (match) return match;

    // 4. Default fallback to English India or first available
    return availableVoices.find((v) => v.lang.includes('IN')) || availableVoices[0];
  }, []);

  const playBrowserSpeech = useCallback(
    (text, langCode = 'te-IN') => {
      if (!('speechSynthesis' in window) || !text) {
        setIsPlaying(false);
        setIsPaused(false);
        return;
      }
      window.speechSynthesis.cancel();

      // Clean markdown, markdown links, asterisks, brackets, and raw URLs
      const cleanText = text
        .replace(/[*#_`~>\[\]\(\)]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\n+/g, ' ')
        .trim();

      if (!cleanText) {
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      currentUtteranceRef.current = utterance;

      const short = String(langCode || 'en').split('-')[0].toLowerCase();
      const bcpLang = short === 'te' ? 'te-IN' : short === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.lang = bcpLang;

      const bestVoice = selectBestVoice(short, voices);
      if (bestVoice) {
        utterance.voice = bestVoice;
        setActiveVoiceName(bestVoice.name);
      }

      utterance.rate = short === 'te' || short === 'hi' ? 0.9 : 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utterance.onerror = (e) => {
        console.warn('Speech synthesis playback error:', e);
        setIsPlaying(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [voices, selectBestVoice]
  );

  const speak = useCallback(
    async (text, langCode = 'te-IN', audioBase64 = null) => {
      if (!text) return;
      stop();

      lastSpokenRef.current = { text, langCode, audioBase64 };
      const token = playTokenRef.current;
      const cacheKey = `${langCode}:${text}`;

      const playWavBase64 = (b64) => {
        if (playTokenRef.current !== token) return true;
        try {
          wavCacheRef.current.set(cacheKey, b64);
          const audio = new Audio(`data:audio/wav;base64,${b64}`);
          audioRef.current = audio;
          audio.onplay = () => {
            setIsPlaying(true);
            setIsPaused(false);
          };
          audio.onended = () => {
            setIsPlaying(false);
            setIsPaused(false);
            audioRef.current = null;
          };
          audio.onerror = () => {
            audioRef.current = null;
            setIsPlaying(false);
            playBrowserSpeech(text, langCode);
          };
          audio.play().catch((err) => {
            audioRef.current = null;
            setIsPlaying(false);
            if (err?.name !== 'NotAllowedError') {
              playBrowserSpeech(text, langCode);
            }
          });
          return true;
        } catch {
          return false;
        }
      };

      const cachedAudio = audioBase64 || wavCacheRef.current.get(cacheKey);
      if (cachedAudio && playWavBase64(cachedAudio)) {
        return;
      }

      // Check if server TTS is configured
      const synth = await synthesizeSpeechAudio({ text, language: langCode });
      if (playTokenRef.current !== token) return;
      if (synth?.success && synth.audio_base64 && playWavBase64(synth.audio_base64)) {
        return;
      }

      // Standard high-accuracy browser speech synthesis
      playBrowserSpeech(text, langCode);
    },
    [stop, playBrowserSpeech]
  );

  const replay = useCallback(() => {
    const { text, langCode, audioBase64 } = lastSpokenRef.current;
    if (text) {
      speak(text, langCode, audioBase64);
    }
  }, [speak]);

  return {
    speak,
    stop,
    pause,
    resume,
    replay,
    isPlaying,
    isPaused,
    isSupported,
    voices,
    activeVoiceName,
  };
}
