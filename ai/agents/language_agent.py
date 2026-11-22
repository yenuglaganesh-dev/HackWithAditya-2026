import re
from typing import Dict, Any

class LanguageAgent:
    """
    AGENT 2: LANGUAGE INTELLIGENCE AGENT
    Responsibilities:
    - Accurate, robust detection for Telugu (te), Hindi (hi), and English (en).
    - Preserves short conversational greetings ("hi", "hello", "hey") as English instead of misidentifying as Hindi.
    - Handles Telugu-English (Tenglish) and Hindi-English (Hinglish) code-mixed sentences.
    - Preserves user target language without unnecessary translation.
    - Standardizes on clean language codes: 'te', 'hi', 'en'.
    """
    def __init__(self):
        # Telugu Unicode Range: \u0C00 - \u0C7F
        self.telugu_pattern = re.compile(r'[\u0C00-\u0C7F]')
        # Devanagari (Hindi) Unicode Range: \u0900 - \u097F
        self.hindi_pattern = re.compile(r'[\u0900-\u097F]')
        
        # English greetings / common words that must NOT be mistaken for Hindi/Telugu
        self.english_greetings = {
            "hi", "hello", "hey", "good", "morning", "afternoon", "evening",
            "night", "thanks", "thank", "you", "ok", "okay", "yes", "no",
            "please", "help", "what", "how", "why", "who", "when", "where", "can"
        }

        # Distinctive Tenglish markers (Latin script Telugu words)
        self.tenglish_markers = {
            "enti", "ela", "undhi", "undi", "unnara", "cheppandi", "cheyali",
            "ekkadiki", "eppudu", "chusthuna", "chesanu", "chesaru", "telugu",
            "yenti", "enduku", "raithu", "pathakam", "darakhasthu", "kaavali",
            "meeru", "nenu", "baga", "bagundi", "evaru", "daggara", "cheppava",
            "chesava", "kavali", "telusuko", "chudu"
        }
        
        # Distinctive Hinglish markers (Latin script Hindi words - avoiding single-letter ambiguity)
        self.hinglish_markers = {
            "kaise", "karna", "hoga", "bataiye", "batao", "aavedan",
            "chahiye", "kaha", "kyun", "theek", "namaste", "dhanyawad",
            "aapka", "mera", "hamaare", "kripya", "jaankari", "bataao",
            "kare", "sakta", "sakte", "bhai", "shukriya"
        }

    def detect_language(self, text: str, preferred_lang: str = "auto") -> Dict[str, Any]:
        if not text or not text.strip():
            return {
                "language": "en",
                "language_name": "English",
                "confidence": 1.0,
                "is_code_mixed": False,
                "script_detected": "Latin"
            }

        text_clean = text.strip()
        telugu_chars = len(self.telugu_pattern.findall(text_clean))
        hindi_chars = len(self.hindi_pattern.findall(text_clean))
        total_chars = len(text_clean.replace(" ", ""))

        # Check native Telugu script
        if telugu_chars > 0 and (telugu_chars / max(total_chars, 1)) > 0.15:
            is_mixed = bool(re.search(r'[a-zA-Z]', text_clean))
            return {
                "language": "te",
                "language_name": "Telugu",
                "confidence": round(telugu_chars / max(total_chars, 1), 2),
                "is_code_mixed": is_mixed,
                "script_detected": "Telugu"
            }

        # Check native Devanagari (Hindi) script
        if hindi_chars > 0 and (hindi_chars / max(total_chars, 1)) > 0.15:
            is_mixed = bool(re.search(r'[a-zA-Z]', text_clean))
            return {
                "language": "hi",
                "language_name": "Hindi",
                "confidence": round(hindi_chars / max(total_chars, 1), 2),
                "is_code_mixed": is_mixed,
                "script_detected": "Devanagari"
            }

        # Tokenize Latin words
        clean_words = [w.lower() for w in re.findall(r'[a-zA-Z]+', text_clean)]
        
        # CRITICAL FIX: If single word or short text matches English greetings ("hi", "hello", "hey"), it is English!
        if len(clean_words) <= 3 and any(w in self.english_greetings for w in clean_words):
            if not any(w in self.tenglish_markers or w in self.hinglish_markers for w in clean_words):
                return {
                    "language": "en",
                    "language_name": "English",
                    "confidence": 0.99,
                    "is_code_mixed": False,
                    "script_detected": "Latin"
                }

        # Check for Latin-script Code-mixed (Tenglish / Hinglish)
        tenglish_hits = sum(1 for w in clean_words if w in self.tenglish_markers)
        hinglish_hits = sum(1 for w in clean_words if w in self.hinglish_markers)

        if tenglish_hits > 0 and tenglish_hits >= hinglish_hits:
            return {
                "language": "te",
                "language_name": "Telugu (Tenglish)",
                "confidence": 0.90,
                "is_code_mixed": True,
                "script_detected": "Latin"
            }

        if hinglish_hits > 0 and hinglish_hits > tenglish_hits:
            return {
                "language": "hi",
                "language_name": "Hindi (Hinglish)",
                "confidence": 0.90,
                "is_code_mixed": True,
                "script_detected": "Latin"
            }

        # If user explicitly preferred a language and text is ambiguous, honor it
        if preferred_lang in ["te", "te-IN"]:
            return {
                "language": "te",
                "language_name": "Telugu",
                "confidence": 0.80,
                "is_code_mixed": False,
                "script_detected": "Latin"
            }
        if preferred_lang in ["hi", "hi-IN"]:
            return {
                "language": "hi",
                "language_name": "Hindi",
                "confidence": 0.80,
                "is_code_mixed": False,
                "script_detected": "Latin"
            }

        # Default to English
        return {
            "language": "en",
            "language_name": "English",
            "confidence": 0.95,
            "is_code_mixed": False,
            "script_detected": "Latin"
        }

language_agent = LanguageAgent()
