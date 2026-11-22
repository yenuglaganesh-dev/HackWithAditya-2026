import { useState, useEffect, useRef, useCallback } from 'react';
import { transcribeSpeechAudio } from '../services/api';

/**
 * AI Speech Recognition Hook
 * 1. Captures real microphone audio via MediaRecorder with automatic silence detection
 *    and sends it to the server-side free AI Speech Agent (gemini-3.5-transcribe)
 *    for accurate automatic language detection & native-script transcription.
 * 2. Falls back to browser native Web Speech API if MediaRecorder is unavailable.
 */
export function useSpeechRecognition({ language = 'auto', onResult, onFinalTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);

  const onResultRef = useRef(onResult);
  const onFinalRef = useRef(onFinalTranscript);
  const languageRef = useRef(language);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    onFinalRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioCtxRef = useRef(null);
  const vadTimerRef = useRef(null);
  const webSpeechRef = useRef(null);
  const isStoppingRef = useRef(false);

  const cleanupAudioGraph = useCallback(() => {
    if (vadTimerRef.current) {
      clearInterval(vadTimerRef.current);
      vadTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {
        // ignore close errors
      }
      audioCtxRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  useEffect(() => {
    const hasMediaRecorder =
      typeof navigator !== 'undefined' &&
      Boolean(navigator.mediaDevices?.getUserMedia) &&
      typeof MediaRecorder !== 'undefined';
    const hasWebSpeech =
      typeof window !== 'undefined' &&
      Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    setIsSupported(hasMediaRecorder || hasWebSpeech);

    return () => {
      cleanupAudioGraph();
      if (webSpeechRef.current) {
        try {
          webSpeechRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [cleanupAudioGraph]);

  const processAudioBlob = useCallback(async (blob, mimeType) => {
    if (!blob || blob.size < 400) {
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const base64Audio = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = typeof reader.result === 'string' ? reader.result : '';
          const commaIdx = result.indexOf(',');
          resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
        };
        reader.onerror = () => reject(new Error('Failed to read recorded audio'));
        reader.readAsDataURL(blob);
      });

      const res = await transcribeSpeechAudio({
        audioBase64: base64Audio,
        mimeType,
        language: languageRef.current || 'auto',
      });

      if (!res.success) {
        setError(res.error || 'Could not recognize speech.');
        return;
      }

      const recognizedText = (res.transcript || '').trim();
      if (!recognizedText) {
        setError('No clear speech detected. Please speak again.');
        return;
      }

      const detectedLang = res.detected_language || res.language || 'auto';
      setTranscript(recognizedText);
      if (onResultRef.current) {
        onResultRef.current(recognizedText, detectedLang);
      }
      if (onFinalRef.current) {
        onFinalRef.current(recognizedText, detectedLang);
      }
    } catch (err) {
      console.error('AI Speech recognition failed:', err);
      setError(err instanceof Error ? err.message : 'Speech recognition error');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        cleanupAudioGraph();
        setIsListening(false);
      }
    } else if (webSpeechRef.current) {
      try {
        webSpeechRef.current.stop();
      } catch {
        setIsListening(false);
      }
    } else {
      cleanupAudioGraph();
      setIsListening(false);
    }
  }, [cleanupAudioGraph]);

  const startWebSpeechFallback = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Microphone recording is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    const lang = languageRef.current;
    recognition.lang = !lang || lang === 'auto' ? 'te-IN' : lang.includes('-') ? lang : `${lang}-IN`;

    let latestFinal = '';
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      isStoppingRef.current = false;
    };
    recognition.onresult = (event) => {
      let current = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          latestFinal = current.trim();
        }
      }
      setTranscript(current);
      if (onResultRef.current) {
        onResultRef.current(current, languageRef.current);
      }
    };
    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      if (latestFinal && onFinalRef.current) {
        onFinalRef.current(latestFinal, languageRef.current);
      }
    };
    webSpeechRef.current = recognition;
    recognition.start();
  }, []);

  const startListening = useCallback(async () => {
    if (isListening || isProcessing) return;
    setError(null);
    setTranscript('');
    isStoppingRef.current = false;

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      startWebSpeechFallback();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      const candidateTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ];
      const mimeType = candidateTypes.find((t) => MediaRecorder.isTypeSupported(t)) || '';
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

      audioChunksRef.current = [];
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        cleanupAudioGraph();
        setIsListening(false);
        const actualMime = recorder.mimeType || mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: actualMime });
        audioChunksRef.current = [];
        await processAudioBlob(blob, actualMime);
      };

      recorder.onerror = () => {
        cleanupAudioGraph();
        setIsListening(false);
        setError('Microphone recording failed.');
      };

      // Voice activity & silence detection to auto-stop once user finishes speaking
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          const source = ctx.createMediaStreamSource(stream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 1024;
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          let spokeYet = false;
          let silenceStart = 0;
          const startedAt = Date.now();

          vadTimerRef.current = setInterval(() => {
            analyser.getByteTimeDomainData(dataArray);
            let sumSq = 0;
            for (let i = 0; i < dataArray.length; i++) {
              const norm = (dataArray[i] - 128) / 128;
              sumSq += norm * norm;
            }
            const rms = Math.sqrt(sumSq / dataArray.length);
            const now = Date.now();

            if (rms > 0.025) {
              spokeYet = true;
              silenceStart = 0;
            } else if (spokeYet) {
              if (!silenceStart) {
                silenceStart = now;
              } else if (now - silenceStart > 1800) {
                stopListening();
              }
            } else if (now - startedAt > 15000) {
              stopListening();
            }
          }, 150);
        }
      } catch {
        // Silence auto-stop is optional; user can always click mic to stop
      }

      recorder.start(250);
      setIsListening(true);
    } catch (err) {
      cleanupAudioGraph();
      console.warn('getUserMedia error:', err);
      const errName = err instanceof Error ? err.name : '';
      if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
        setError('Microphone permission denied. Please allow mic access to speak.');
      } else {
        startWebSpeechFallback();
      }
    }
  }, [isListening, isProcessing, cleanupAudioGraph, processAudioBlob, startWebSpeechFallback, stopListening]);

  return {
    isListening,
    isProcessing,
    transcript,
    setTranscript,
    isSupported,
    error,
    startListening,
    stopListening,
  };
}
