import os
import re
import uuid
from typing import List, Dict, Any, Optional
import chromadb
from chromadb.config import Settings as ChromaSettings
from ai.config.settings import settings
from ai.schemas.api_models import SourceCitation
from ai.services.offline_embeddings import OfflineHashingEmbeddingFunction

class RAGService:
    """
    RAG Knowledge System using persistent ChromaDB and offline CPU-friendly embeddings.
    Zero-cost, completely offline-compatible vector storage for Bharat government, agriculture & citizen welfare.
    """
    def __init__(self):
        os.makedirs(settings.CHROMA_PERSIST_DIRECTORY, exist_ok=True)
        self.embedding_fn = OfflineHashingEmbeddingFunction(dim=128)
        self.client = chromadb.PersistentClient(
            path=settings.CHROMA_PERSIST_DIRECTORY,
            settings=ChromaSettings(allow_reset=True, anonymized_telemetry=False)
        )
        # Default collection for government schemes and citizen services
        self.collection = self.client.get_or_create_collection(
            name="bharat_knowledge_base",
            embedding_function=self.embedding_fn,
            metadata={"description": "Multilingual Knowledge Base for Indian Citizen Services"}
        )
        self._seed_default_knowledge()

    def _seed_default_knowledge(self):
        """Seed verified knowledge about prominent public schemes if collection is empty"""
        if self.collection.count() > 0:
            return

        documents = [
            # PM-Kisan
            "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) is a central sector scheme providing income support of Rs 6,000 per year in three equal installments of Rs 2,000 directly to bank accounts of land-holding farmer families. Telugu: పీఎం కిసాన్ పథకం ద్వారా అర్హులైన రైతులకు సంవత్సరానికి రూ. 6,000 మూడు విడతల్లో నేరుగా వారి ఖాతాలో జమ చేయబడుతుంది. Hindi: पीएम किसान योजना के तहत पात्र किसानों को सालाना 6000 रुपये 3 किस्तों में मिलते हैं।",
            
            # Ayushman Bharat
            "Ayushman Bharat - PM-JAY (Pradhan Mantri Jan Arogya Yojana) offers health coverage of up to Rs 5 lakh per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families across India. Telugu: ఆయుష్మాన్ భారత్ ద్వారా ప్రతి పేద కుటుంబానికి ఏటా రూ. 5 లక్షల వరకు ఉచిత వైద్య చికిత్స సహాయం అందుతుంది. Hindi: आयुष्मान भारत योजना के तहत प्रति परिवार प्रति वर्ष 5 लाख रुपये तक का मुफ्त इलाज मिलता है।",
            
            # PM Awas Yojana
            "Pradhan Mantri Awas Yojana (PMAY) provides financial assistance and interest subsidy on housing loans for eligible rural and urban families to build pukka houses. Eligibility is verified via SECC 2011 data. Telugu: పీఎం ఆవాస్ యోజన ద్వారా పేద ప్రజలకు పక్కా ఇళ్ల నిర్మాణానికి సబ్సిడీ మరియు ఆర్థిక సహాయం అందుతుంది. Hindi: पीएम आवास योजना के तहत पक्के घर के निर्माण हेतु वित्तीय सहायता प्रदान की जाती है।",
            
            # Rythu Bharosa (Andhra Pradesh / Telangana)
            "Rythu Bharosa / Rythu Bandhu: Government financial investment support of Rs 10,000 to Rs 13,500 per acre per year for agricultural inputs to farmers in Telangana and Andhra Pradesh. Telugu: రైతు భరోసా మరియు రైతు బంధు పథకాలు పంట పెట్టుబడి సాయంగా రైతులకు ఎకరానికి రూ. 10,000 నుండి 13,500 వరకు ఆర్థిక సహాయం అందిస్తాయి.",

            # Digital India & DigiLocker
            "DigiLocker is an Indian digital identity and document wallet by the Ministry of Electronics and IT, enabling citizens to store Aadhaar, driving licence, PAN card, and academic certificates electronically. Hindi: डिजिलॉकर भारत सरकार की एक सुरक्षित डिजिटल दस्तावेज सेवा है। Telugu: డిజిలాకర్ ద్వారా ఆధార్, డ్రైవింగ్ లైసెన్స్ మరియు ఇతర ప్రభుత్వ పత్రాలను సురక్షితంగా నిల్వ చేసుకోవచ్చు."
        ]

        metadatas = [
            {"title": "PM Kisan Samman Nidhi Guidelines", "source": "Department of Agriculture and Farmers Welfare (pmkisan.gov.in)", "category": "agriculture"},
            {"title": "Ayushman Bharat PM-JAY Guidelines", "source": "National Health Authority (nha.gov.in)", "category": "healthcare"},
            {"title": "Pradhan Mantri Awas Yojana (PMAY)", "source": "Ministry of Housing and Urban Affairs (pmaymis.gov.in)", "category": "housing"},
            {"title": "Rythu Bharosa & Farmer Welfare Schemes", "source": "State Department of Agriculture (rythubharosa.ap.gov.in)", "category": "agriculture"},
            {"title": "DigiLocker & Citizen Digital Services", "source": "Ministry of Electronics and Information Technology (digilocker.gov.in)", "category": "digital_services"}
        ]

        ids = [f"doc_seed_{i+1}" for i in range(len(documents))]
        self.collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

    def search(self, query: str, top_k: int = 3, category: Optional[str] = None) -> List[SourceCitation]:
        """
        Retrieves relevant knowledge citations using semantic vector search.
        """
        where_filter = {"category": category} if category else None
        
        try:
            results = self.collection.query(
                query_texts=[query],
                n_results=top_k,
                where=where_filter
            )
            citations = []
            if results and "documents" in results and results["documents"]:
                docs = results["documents"][0]
                metas = results["metadatas"][0] if "metadatas" in results else [{}] * len(docs)
                dists = results["distances"][0] if "distances" in results else [0.0] * len(docs)
                
                for doc, meta, dist in zip(docs, metas, dists):
                    citations.append(
                        SourceCitation(
                            title=meta.get("title", "Government Knowledge Base"),
                            source=meta.get("source", "Official Verified Information"),
                            snippet=doc,
                            relevance_score=round(max(0.0, 1.0 - (dist if dist else 0.5)), 3),
                            url=meta.get("source_url")
                        )
                    )
            return citations
        except Exception as e:
            return []

    def add_document(self, title: str, content: str, source: str, category: str = "general", source_url: Optional[str] = None) -> str:
        doc_id = f"doc_{uuid.uuid4().hex[:8]}"
        self.collection.add(
            documents=[content],
            metadatas=[{
                "title": title,
                "source": source,
                "category": category,
                "source_url": source_url or ""
            }],
            ids=[doc_id]
        )
        return doc_id

rag_service = RAGService()
