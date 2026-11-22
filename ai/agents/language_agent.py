import re
from typing import Dict, Any

class LanguageAgent:
    """
    AGENT 2: LANGUAGE INTELLIGENCE AGENT
    Responsibilities:
    - Detect Telugu, Hindi and English.
    - Handle Telugu-English (Tenglish) and Hindi-English (Hinglish) code-mixed sentences.
    - Preserve user intent and target language.
    - Avoid unnecessary translation.
    - Uses deterministic Unicode range checking and phonetic cues for 0-latency, 0-cost detection.
    """
    def __init__(self):
        # Telugu Unicode Range: \u0C00 - \u0C7F
        self.telugu_pattern = re.compile(r'[\u0C00-\u0C7F]')
        # Devanagari (Hindi) Unicode Range: \u0900 - \u097F
        self.hindi_pattern = re.compile(r'[\u0900-\u097F]')
        
        # Distinctive Tenglish markers (Latin script Telugu phrases)
        self.tenglish_markers = {
            "enti", "ela", "undhi", "undi", "unnara", "cheppandi", "cheyali",
            "ekkadiki", "eppudu", "chusthuna", "chesanu", "chesaru", "telugu",
            "yenti", "enduku", "raithu", "pathakam", "darakhasthu", "kaavali",
            "meeru", "nenu", "baga", "bagundi", "evaru", "daggara"
        }
        
        # Distinctive Hinglish markers (Latin script Hindi phrases - avoiding single common words)
        self.hinglish_markers = {
            "kaise", "karna", "hoga", "bataiye", "batao", "aavedan",
            "chahiye", "kaha", "kyun", "theek", "namaste", "dhanyawad",
            "aapka", "mera", "hamaare", "kripya", "jaankari", "batao"
        }

    def detect_language(self, text: str) -> Dict[str, Any]:
        if not text or not text.strip():
            return {
                "language": "en-IN",
                "language_name": "English",
                "confidence": 1.0,
                "is_code_mixed": False,
                "script_detected": "Latin"
            }

        telugu_chars = len(self.telugu_pattern.findall(text))
        hindi_chars = len(self.hindi_pattern.findall(text))
        total_chars = len(text.replace(" ", ""))

        # Check native script first
        if telugu_chars > 0 and (telugu_chars / max(total_chars, 1)) > 0.15:
            is_mixed = bool(re.search(r'[a-zA-Z]', text))
            return {
                "language": "te-IN",
                "language_name": "Telugu",
                "confidence": round(telugu_chars / max(total_chars, 1), 2),
                "is_code_mixed": is_mixed,
                "script_detected": "Telugu"
            }

        if hindi_chars > 0 and (hindi_chars / max(total_chars, 1)) > 0.15:
            is_mixed = bool(re.search(r'[a-zA-Z]', text))
            return {
                "language": "hi-IN",
                "language_name": "Hindi",
                "confidence": round(hindi_chars / max(total_chars, 1), 2),
                "is_code_mixed": is_mixed,
                "script_detected": "Devanagari"
            }

        # Check for Latin-script Code-mixed (Tenglish / Hinglish)
        # Clean punctuation and tokenize words
        clean_words = re.findall(r'[a-zA-Z]+', text.lower())
        tenglish_hits = sum(1 for w in clean_words if w in self.tenglish_markers)
        hinglish_hits = sum(1 for w in clean_words if w in self.hinglish_markers)

        if tenglish_hits > 0 and tenglish_hits >= hinglish_hits:
            return {
                "language": "te-IN",
                "language_name": "Telugu (Tenglish)",
                "confidence": 0.85,
                "is_code_mixed": True,
                "script_detected": "Latin"
            }

        if hinglish_hits > 0 and hinglish_hits > tenglish_hits:
            return {
                "language": "hi-IN",
                "language_name": "Hindi (Hinglish)",
                "confidence": 0.85,
                "is_code_mixed": True,
                "script_detected": "Latin"
            }

        # Default to English
        return {
            "language": "en-IN",
            "language_name": "English",
            "confidence": 0.95,
            "is_code_mixed": False,
            "script_detected": "Latin"
        }

language_agent = LanguageAgent()
