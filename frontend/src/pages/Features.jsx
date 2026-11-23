import React from 'react';
import { Link } from 'react-router-dom';
import {
  Languages, Mic, ShieldCheck, Database,
  Cpu, RotateCcw, CheckCircle2, ArrowRight
} from 'lucide-react';
import { PixelText } from '../components/ui/mosaic-prompt-template';

export default function Features() {
  const featuresList = [
    {
      icon: Languages,
      title: 'Multilingual & Dialect AI',
      desc: 'Seamlessly understands Telugu, Hindi, and English with automatic language detection. Handles everyday code-mixed phrases (Tenglish and Hinglish) with zero translation latency.'
    },
    {
      icon: Mic,
      title: 'Browser-Native Voice Intelligence',
      desc: 'Voice-in via Web Speech API and voice-out via SpeechSynthesis. Fully runs in the client browser at zero cost without relying on paid speech recognition APIs.'
    },
    {
      icon: Cpu,
      title: '7-Agent Autonomous Pipeline',
      desc: 'A modular multi-agent system: Orchestrator, Language Agent, Knowledge Agent, Research Agent, Response Generator, Verification Agent, and Voice Agent collaborate on each turn.'
    },
    {
      icon: Database,
      title: 'RAG Knowledge & Citation Engine',
      desc: 'Retrieves relevant document sections from a persistent ChromaDB vector store. Every answer attributes official government guidelines and scheme documents.'
    },
    {
      icon: ShieldCheck,
      title: 'Strictly Free-First & Anti-Hallucination',
      desc: 'Strictly configured for verified OpenRouter Free models. Claims are cross-checked by the Verification Agent to eliminate fabricated subsidy numbers.'
    },
    {
      icon: RotateCcw,
      title: 'Multi-turn Conversation Memory',
      desc: 'Maintains recent conversational history per session ID. Seamlessly understands contextual follow-ups such as "Who is eligible for this?"'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF3E8] text-[#E96B16] border border-[#FBD3B6] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse" />
          <span>Core Capabilities & Features</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-headline font-bold text-[#202124]">
          Key Platform Features
        </h1>

        <p className="text-[#707070] text-sm sm:text-base leading-relaxed">
          Engineered for Bharat: Voice-first sovereign AI combining client-side speech processing, 7-agent swarm routing, and local ChromaDB RAG.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresList.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-[#E8EAED] shadow-card hover:border-[#FBD3B6] flex flex-col justify-between group transition"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] flex items-center justify-center text-[#F58220] shadow-sm group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#707070]">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-lg text-[#202124] mb-3 group-hover:text-[#F58220] transition-colors">
                  {f.title}
                </h3>

                <p className="text-sm text-[#707070] leading-relaxed font-normal">
                  {f.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EAED] flex items-center justify-between">
                <span className="text-xs text-[#707070] font-mono">
                  Verified Feature
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="mt-16 bg-[#F8F9FA] border border-[#E8EAED] p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-soft">
        <h3 className="text-2xl font-bold text-[#202124]">Experience BhashaBridge in Action</h3>
        <p className="text-sm text-[#707070] max-w-xl mx-auto">
          Test real voice inquiries in Telugu, Hindi, or English directly through the sovereign AI assistant.
        </p>
        <Link
          to="/assistant"
          className="btn-orange inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition"
        >
          <span>Launch Voice Assistant</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
