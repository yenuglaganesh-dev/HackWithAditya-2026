import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Sparkles, Shield, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          About the Project
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Breaking Language Barriers for Every Citizen in Bharat
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          BhashaBridge AI was conceptualized for <strong>HackWithAditya 2026</strong> under the <em>AI for Bharat</em> track, solving accessibility challenges through multilingual voice intelligence.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <div className="bg-white border border-emerald-100 p-8 rounded-3xl space-y-4 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            To ensure that no Indian citizen is left behind in the digital AI revolution due to linguistic barriers, illiteracy, or complex web user interfaces. By creating a conversational bridge that understands native Telugu, Hindi, and Indian English, we bring digital empowerment directly to citizens' ears and fingertips.
          </p>
        </div>

        <div className="bg-white border border-emerald-100 p-8 rounded-3xl space-y-4 shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Who We Serve</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Farmers seeking seed subsidies and crop insurance, students researching higher education entrance guidelines, elderly individuals applying for healthcare pensions, and rural families accessing housing schemes under Pradhan Mantri Awas Yojana without visiting internet cafes.
          </p>
        </div>

      </div>

      {/* Core Architectural Principles */}
      <div className="bg-white border border-emerald-100 p-8 sm:p-12 rounded-3xl mb-16 shadow-soft">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Core Architectural Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-emerald-700 font-bold text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Strictly Free-First</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We never require citizens or organizations to pay for commercial AI API tokens. Built from ground-up using verified OpenRouter free models and client-native Web Speech recognition.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-emerald-700 font-bold text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>Zero Hallucination RAG</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Government scheme information directly cites official departments and verified guidelines. Factual assertions are continuously audited by a dedicated Verification Agent.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-emerald-700 font-bold text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Dialect & Script Inclusivity</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Understands everyday code-mixed phrasing like Tenglish (*"ee yojana ela apply cheyali"*) and Hinglish (*"aavedan kaise kare"*) alongside native scripts.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition"
        >
          <span>Try BhashaBridge Assistant</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
