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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Core Capabilities & Features</span>
        </div>
        
        <div className="py-2">
          <PixelText text="KEY FEATURES" className="w-full max-w-md mx-auto text-white" />
        </div>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Engineered for Bharat: Voice-first sovereign AI combining client-side speech processing, 7-agent swarm routing, and local ChromaDB RAG.
        </p>
      </div>

      {/* Features Grid with Mosaic Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresList.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="p-8 rounded-3xl mosaic-glass-card flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-sky-300 shadow-md group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-sky-400 group-hover:to-cyan-300 group-hover:text-[#06233a] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-lg text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {f.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {f.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">
                  Verified Feature
                </span>
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="mt-16 mosaic-glass p-8 sm:p-12 rounded-3xl text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">Experience BhashaBridge in Action</h3>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Test real voice inquiries in Telugu, Hindi, or English directly through the sovereign AI assistant.
        </p>
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 text-[#06233a] font-bold text-sm shadow-lg shadow-sky-400/20 hover:brightness-110 transition"
        >
          <span>Launch Voice Assistant</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
