import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Sparkles, Shield, Heart, ArrowRight, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          About the Project
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Breaking Language Barriers for Every Citizen in Bharat
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          BhashaBridge AI was conceptualized for <strong>HackWithAditya 2026</strong> under the <em>AI for Bharat</em> track, solving accessibility challenges through multilingual voice intelligence.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <div className="bg-navy-800/60 border border-slate-700/60 p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To ensure that no Indian citizen is left behind in the digital AI revolution due to linguistic barriers, illiteracy, or complex web user interfaces. By creating a conversational bridge that understands native Telugu, Hindi, and Indian English, we bring digital empowerment directly to citizens' ears and fingertips.
          </p>
        </div>

        <div className="bg-navy-800/60 border border-slate-700/60 p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-bharat-violet/15 text-bharat-violet flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Who We Serve</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Farmers seeking seed subsidies and crop insurance, students researching higher education entrance guidelines, elderly individuals applying for healthcare pensions, and rural families accessing housing schemes under Pradhan Mantri Awas Yojana without visiting internet cafes.
          </p>
        </div>

      </div>

      {/* Core Values */}
      <div className="bg-navy-900 border border-slate-800 p-8 sm:p-12 rounded-3xl mb-16">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Architectural Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-amber-400 font-bold text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Strictly Free-First</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never require citizens or organizations to pay for commercial AI API tokens. Built from ground-up using verified OpenRouter free models and client-native Web Speech recognition.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Zero Hallucination RAG</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Government scheme information directly cites official departments and verified guidelines. Factual assertions are continuously audited by a dedicated Verification Agent.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-cyan-400 font-bold text-base flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Dialect & Script Inclusivity</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understands everyday code-mixed phrasing like Tenglish (*"ee yojana ela apply cheyali"*) and Hinglish (*"aavedan kaise kare"*) alongside native scripts.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center pt-6">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-bharat-orange to-amber-500 text-navy-900 font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition"
        >
          <span>Try BhashaBridge Assistant</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
