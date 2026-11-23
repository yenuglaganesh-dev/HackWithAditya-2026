import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, GraduationCap, Building2, HeartPulse, ArrowRight } from 'lucide-react';

export default function UseCases() {
  const { t } = useTranslation();

  const cases = [
    {
      icon: Sprout,
      color: 'text-[#F58220]',
      title: t('useCasesPage.c1Title', 'Agriculture & Farmer Welfare'),
      desc: t('useCasesPage.c1Desc', 'Farmers can speak in Telugu or Hindi to enquire about PM-Kisan installment dates, Rythu Bharosa subsidies, minimum support price guidelines, and drought assistance.'),
      example: t('useCasesPage.c1Example', '"నాకు రైతు భరోసా ఎలా వస్తుంది? (How do I receive Rythu Bharosa?)"')
    },
    {
      icon: HeartPulse,
      color: 'text-rose-600',
      title: t('useCasesPage.c2Title', 'Public Healthcare & Insurance'),
      desc: t('useCasesPage.c2Desc', 'Underprivileged families can enquire about eligible hospitals, ₹5 Lakh coverage under Ayushman Bharat PM-JAY, and how to verify their family ration card.'),
      example: t('useCasesPage.c2Example', '"आयुष्मान भारत में 5 लाख का इलाज किन अस्पतालों में मिलता है?"')
    },
    {
      icon: Building2,
      color: 'text-[#E96B16]',
      title: t('useCasesPage.c3Title', 'Government Citizen Services'),
      desc: t('useCasesPage.c3Desc', 'Access verified guidelines for Pradhan Mantri Awas Yojana (PMAY housing loans), Aadhaar address updating, and DigiLocker electronic certificates without visiting brokers.'),
      example: t('useCasesPage.c3Example', '"How can I link my Aadhaar to DigiLocker for driving licence storage?"')
    },
    {
      icon: GraduationCap,
      color: 'text-[#F58220]',
      title: t('useCasesPage.c4Title', 'Education & Student Support'),
      desc: t('useCasesPage.c4Desc', 'First-generation rural students can enquire about state scholarship deadlines, national entrance examination guidelines, and fee reimbursement schemes in their mother tongue.'),
      example: t('useCasesPage.c4Example', '"పోస్ట్ మెట్రిక్ స్కాలర్షిప్ దరఖాస్తుకు ఏ సర్టిఫికెట్లు కావాలి?"')
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF3E8] border border-[#FBD3B6] text-[#E96B16] text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse" />
          <span>{t('useCasesPage.badge', 'Bharat In Action')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
          {t('useCasesPage.title', 'Transforming Daily Lives Across India')}
        </h1>
        <p className="text-sm sm:text-base text-[#707070] max-w-2xl mx-auto leading-relaxed">
          {t('useCasesPage.subtitle', 'Real-world applications where voice and language AI bridge the digital divide for 800M+ regional speakers.')}
        </p>
      </div>

      {/* Grid of Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {cases.map((c, i) => (
          <div key={i} className="bg-white border border-[#E8EAED] p-8 rounded-3xl space-y-4 shadow-card hover:border-[#FBD3B6] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] border border-[#FBD3B6] flex items-center justify-center">
              <c.icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <h3 className="text-xl font-bold text-[#202124]">{c.title}</h3>
            <p className="text-xs sm:text-sm text-[#707070] leading-relaxed font-normal">{c.desc}</p>
            <div className="bg-[#FFF8F2] border border-[#FBD3B6] p-3 rounded-2xl text-xs text-[#E96B16] font-medium italic">
              {c.example}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 btn-orange font-bold px-8 py-4 rounded-xl shadow-md shadow-orange-500/20 hover:scale-105 transition"
        >
          <span>{t('useCasesPage.cta', 'Ask a Question in Live Assistant')}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
