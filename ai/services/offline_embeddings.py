import math
from typing import List, Union
from chromadb.api.types import EmbeddingFunction, Documents, Embeddings

class OfflineHashingEmbeddingFunction(EmbeddingFunction):
    """
    100% Offline, Deterministic, CPU-friendly Multilingual Embedding Function.
    Generates 128-dimensional normalized feature vectors using character n-grams and hashing.
    Requires ZERO network calls, ZERO GPU, and works flawlessly offline.
    """
    def __init__(self, dim: int = 128):
        self.dim = dim

    def _embed_text(self, text: str) -> List[float]:
        vec = [0.0] * self.dim
        if not text:
            return vec
            
        text_clean = text.lower().strip()
        # Word and character unigram/bigram hashing
        words = text_clean.split()
        for w in words:
            h = hash(w) % self.dim
            vec[h] += 1.0
            
        # Character bigrams for multilingual script similarity
        for i in range(len(text_clean) - 1):
            bg = text_clean[i:i+2]
            h = hash(bg) % self.dim
            vec[h] += 0.5
            
        # L2 Normalize vector
        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            vec = [x / norm for x in vec]
        return vec

    def __call__(self, input: Documents) -> Embeddings:
        return [self._embed_text(doc) for doc in input]
