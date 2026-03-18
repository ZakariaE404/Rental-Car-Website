
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BenefitsProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
}

const Benefits: React.FC<BenefitsProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const rawList = t<any>('benefits.list');
  const benefitsList = Array.isArray(rawList) ? rawList : [];

  const icons = [
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6.75 6.75M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5-6.75-6.75M3.75 20.25h4.5m-4.5 0v-4.5m0 4.5 6.75-6.75M3.75 3.75v4.5m0-4.5h4.5m-4.5 0 6.75 6.75" /></svg>
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h4 className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6">{t('benefits.title')}</h4>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[0.95]">
            {t('benefits.mainTitle')} <span className="text-amber-500">{t('benefits.mainTitleHighlight')}</span>
          </h2>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-500 font-medium">
            {t('benefits.description')}
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible hide-scrollbar pt-4">
          {benefitsList.slice(0, 4).map((benefit, index) => (
            <div key={index} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center group p-8 md:p-10 rounded-lg bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white shadow-sm hover:shadow-lg hover:border-slate-200">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center text-amber-500 shadow-sm border border-slate-100 mb-6 md:mb-8 transition-transform transform group-hover:-translate-y-1">
                {icons[index]}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 group-hover:text-amber-500 transition-colors tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-slate-500 text-[14px] leading-relaxed font-medium">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 bg-slate-900 rounded-lg p-12 md:p-20 text-center relative overflow-hidden shadow-lg border border-slate-800">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">{t('benefits.ctaTitle')}</h3>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
              {t('benefits.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-12 py-5 bg-amber-500 hover:bg-white text-slate-950 font-black text-sm rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest border border-amber-400/50"
              >
                {t('benefits.contactBtn')}
              </button>
              <button
                onClick={() => onNavigate('vehicles')}
                className="w-full sm:w-auto px-12 py-5 bg-transparent border border-white/20 hover:bg-white/5 text-white font-black text-sm rounded-lg transition-all active:scale-[0.98] uppercase tracking-widest"
              >
                {t('benefits.ratesBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Benefits;
