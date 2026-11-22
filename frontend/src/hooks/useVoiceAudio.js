import { useState, useEffect, useRef, useCallback } from 'react';
import { synthesizeSpeechAudio } from '../services/api';

/**
 * Dedicated Voice Audio Service supporting:
 * 1. High-fidelity regional base64 audio streaming (Gemini 3.8 Flash Lite TTS / Sarvam)
 * 2. High-quality Browser SpeechSynthesis API fallback with regional voice matching
 * 3. Play, Pause, Resume, Stop controls and real speaking status
 */
export function useVoiceAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeVoice, setActiveVoice] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  
  const audioRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const wavCacheRef = useRef(new Map());
  const playTokenRef = useRef(0);

  // Load browser native voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        setAvailableVoices(v);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
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

  const playBrowserTTS = useCallback((text, langCode) => {
    if (!('speechSynthesis' in window) || !text) return;

    const cleanText = text
      .replace(/[*#_`~>]/g, '')
      .replace(/https?:\/\/\S+/g, 'official portal')
      .replace(/\[.*?\]/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    currentUtteranceRef.current = utterance;

    const localeMap = {
      te: 'te-IN',
      hi: 'hi-IN',
      en: 'en-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      pa: 'pa-IN',
      mr: 'mr-IN',
      ur: 'ur-PK',
    };
    const short = String(langCode || 'en').split('-')[0];
    const bcpLang = String(langCode).includes('-') ? langCode : localeMap[short] || 'en-IN';
    utterance.lang = bcpLang;

    const voice = availableVoices.find(v => v.lang === bcpLang || v.lang.startsWith(short));
    if (voice) {
      utterance.voice = voice;
      setActiveVoice(voice.name);
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [availableVoices]);

  const playAudio = useCallback(async (text, langCode = 'te', audioBase64 = null) => {
    if (!text) return;
    stop();
    const token = playTokenRef.current;
    const cacheKey = `${langCode}:${text}`;

    const playWavBase64 = (b64) => {
      if (playTokenRef.current !== token) return true;
      try {
        wavCacheRef.current.set(cacheKey, b64);
        const audioSrc = `data:audio/wav;base64,${b64}`;
        const audio = new Audio(audioSrc);
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
          playBrowserTTS(text, langCode);
        };

        audio.play().catch((err) => {
          audioRef.current = null;
          setIsPlaying(false);
          if (err?.name !== 'NotAllowedError') {
            playBrowserTTS(text, langCode);
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

    const synth = await synthesizeSpeechAudio({ text, language: langCode });
    if (playTokenRef.current !== token) return;
    if (synth?.success && synth.audio_base64 && playWavBase64(synth.audio_base64)) {
      return;
    }

    playBrowserTTS(text, langCode);
  }, [playBrowserTTS, stop]);

  return {
    playAudio,
    stop,
    pause,
    resume,
    isPlaying,
    isPaused,
    activeVoice,
    availableVoices
  };
}
