import { useState, useEffect, useCallback, useRef } from 'react';
import { synthesizeSpeechAudio } from '../services/api';

/**
 * Custom React Hook for Voice Output (TTS):
 * 1. Plays server-synthesized WAV audio (from free gemini-3.8-flash-lite-tts / Sarvam)
 * 2. Falls back to browser native SpeechSynthesis when offline or unavailable.
 */
export function useSpeechSynthesis() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const audioRef = useRef(null);
  const wavCacheRef = useRef(new Map());
  const playTokenRef = useRef(0);

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
  }, []);

  const playBrowserSpeech = useCallback(
    (text, langCode = 'te-IN') => {
      if (!('speechSynthesis' in window) || !text) {
        setIsPlaying(false);
        return;
      }
      window.speechSynthesis.cancel();

      const cleanText = text
        .replace(/[*#_`~>\[\]\(\)]/g, '')
        .replace(/https?:\/\/\S+/g, 'link');

      const utterance = new SpeechSynthesisUtterance(cleanText);
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

      const voice = voices.find((v) => v.lang === bcpLang || v.lang.startsWith(short));
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    },
    [voices]
  );

  const speak = useCallback(
    async (text, langCode = 'te-IN', audioBase64 = null) => {
      if (!text) return;
      stop();
      const token = playTokenRef.current;
      const cacheKey = `${langCode}:${text}`;

      const playWavBase64 = (b64) => {
        if (playTokenRef.current !== token) return true;
        try {
          wavCacheRef.current.set(cacheKey, b64);
          const audio = new Audio(`data:audio/wav;base64,${b64}`);
          audioRef.current = audio;
          audio.onplay = () => setIsPlaying(true);
          audio.onended = () => {
            setIsPlaying(false);
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
            // If browser autoplay blocked async playback, keep cached WAV for "Listen Aloud" click instead of falling back to robotic SpeechSynthesis.
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

      // Fetch free server-side human-like neural TTS audio (gemini-3.8-flash-tts / lite)
      const synth = await synthesizeSpeechAudio({ text, language: langCode });
      if (playTokenRef.current !== token) return;
      if (synth?.success && synth.audio_base64 && playWavBase64(synth.audio_base64)) {
        return;
      }

      playBrowserSpeech(text, langCode);
    },
    [stop, playBrowserSpeech]
  );

  return {
    speak,
    stop,
    isPlaying,
    isSupported,
    voices,
  };
}
