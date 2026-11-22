import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, GraduationCap, Building2, HeartPulse, ArrowRight } from 'lucide-react';

export default function UseCases() {
  const cases = [
    {
      icon: Sprout,
      color: 'text-emerald-700',
      title: 'Agriculture & Farmer Welfare',
      desc: 'Farmers can speak in Telugu or Hindi to enquire about PM-Kisan installment dates, Rythu Bharosa subsidies, minimum support price guidelines, and drought assistance.',
      example: '"నాకు రైతు భరోసా ఎలా వస్తుంది? (How do I receive Rythu Bharosa?)"'
    },
    {
      icon: HeartPulse,
      color: 'text-rose-700',
      title: 'Public Healthcare & Insurance',
      desc: 'Underprivileged families can enquire about eligible hospitals, ₹5 Lakh coverage under Ayushman Bharat PM-JAY, and how to verify their family ration card.',
      example: '"आयुष्मान भारत में 5 लाख का इलाज किन अस्पतालों में मिलता है?"'
    },
    {
      icon: Building2,
      color: 'text-teal-700',
      title: 'Government Citizen Services',
      desc: 'Access verified guidelines for Pradhan Mantri Awas Yojana (PMAY housing loans), Aadhaar address updating, and DigiLocker electronic certificates without visiting brokers.',
      example: '"How can I link my Aadhaar to DigiLocker for driving licence storage?"'
    },
    {
      icon: GraduationCap,
      color: 'text-emerald-800',
      title: 'Education & Student Support',
      desc: 'First-generation rural students can enquire about state scholarship deadlines, national entrance examination guidelines, and fee reimbursement schemes in their mother tongue.',
      example: '"పోస్ట్ మెట్రిక్ స్కాలర్షిప్ దరఖాస్తుకు ఏ సర్టిఫికెట్లు కావాలి?"'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          Bharat In Action
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Transforming Daily Lives Across India
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Real-world applications where voice and language AI bridge the digital divide for 800M+ regional speakers.
        </p>
      </div>

      {/* Grid of Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {cases.map((c, i) => (
          <div key={i} className="bg-white border border-emerald-100 p-8 rounded-3xl space-y-4 shadow-soft hover:shadow-elevated hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <c.icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{c.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{c.desc}</p>
            <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-2xl text-xs text-emerald-950 font-medium italic">
              Citizen query: {c.example}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition"
        >
          <span>Ask a Question in Live Assistant</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
