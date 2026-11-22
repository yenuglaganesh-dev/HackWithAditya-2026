import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Dedicated Voice Audio Service supporting:
 * 1. Sarvam AI high-fidelity regional base64 audio streaming (when returned by backend)
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
    // Stop HTML Audio element if playing Sarvam
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Stop Browser SpeechSynthesis
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

  const playAudio = useCallback((text, langCode = 'te', audioBase64 = null) => {
    stop();

    // 1. If high-fidelity Sarvam audio payload is provided:
    if (audioBase64) {
      try {
        const audioSrc = `data:audio/wav;base64,${audioBase64}`;
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
        audio.onerror = (e) => {
          console.warn('Sarvam audio playback error, falling back to browser TTS:', e);
          playBrowserTTS(text, langCode);
        };

        audio.play();
        return;
      } catch (err) {
        console.warn('Audio tag playback failed:', err);
      }
    }

    // 2. Otherwise use Browser Native SpeechSynthesis
    playBrowserTTS(text, langCode);
  }, [availableVoices, stop]);

  const playBrowserTTS = (text, langCode) => {
    if (!('speechSynthesis' in window) || !text) return;

    // Clean text: strip markdown symbols, asterisks, URLs, brackets
    const cleanText = text
      .replace(/[*#_`~>]/g, '')
      .replace(/https?:\/\/\S+/g, 'official portal')
      .replace(/\[.*?\]/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    currentUtteranceRef.current = utterance;

    // Map short codes to regional locales
    const bcpLang = langCode.startsWith('te') ? 'te-IN' : (langCode.startsWith('hi') ? 'hi-IN' : 'en-IN');
    utterance.lang = bcpLang;

    // Pick best regional matching voice
    const voice = availableVoices.find(v => v.lang === bcpLang || v.lang.startsWith(langCode));
    if (voice) {
      utterance.voice = voice;
      setActiveVoice(voice.name);
    }

    utterance.rate = 0.95; // Slightly slower, clearer pacing for clarity
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
      console.warn('Browser SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

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
