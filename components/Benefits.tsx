
import React from 'react';

import { useLanguage } from '../context/LanguageContext';

const Benefits: React.FC = () => {
  const { t } = useLanguage();
  const rawList = t<any>('benefits.list');
  const benefitsList = Array.isArray(rawList) ? rawList : [];

  const icons = [
    // 0: National Presence
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    // 1: Insurance
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    // 2: Delivery
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
    // 3: Support 24/7
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6.75 6.75M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5-6.75-6.75M3.75 20.25h4.5m-4.5 0v-4.5m0 4.5 6.75-6.75M3.75 3.75v4.5m0-4.5h4.5m-4.5 0 6.75 6.75" />
      </svg>
    ),
    // 4: Low Prices
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 3v.75m0 3v.75m0 3v.75m15-12v.75m0 3v.75m0 3v.75m0 3v.75m-15 0h15M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25Z" />
      </svg>
    ),
    // 5: Recent Fleet
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V14.25M7.5 14.25V10.5A2.25 2.25 0 0 1 9.75 8.25h4.5a2.25 2.25 0 0 1 2.25 2.25v3.75m-9 0h9m-9 0c0-1.242 1.008-2.25 2.25-2.25h4.5a2.25 2.25 0 0 1 2.25 2.25" />
      </svg>
    )
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4">{t('benefits.title')}</h4>
          <h2 className="text-2xl md:text-5xl font-extrabold text-blue-900 mb-6">
            {t('benefits.mainTitle')} <span className="text-amber-500">{t('benefits.mainTitleHighlight')}</span>
          </h2>
          <div className="w-16 md:w-24 h-1 md:h-1.5 bg-amber-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {t('benefits.description')}
          </p>
        </div>

        {/* Responsive Grid: 2 columns mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {benefitsList.map((benefit, index) => (
            <div
              key={index}
              className="group p-4 md:p-8 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500 shadow-sm mb-4 md:mb-6 group-hover:bg-blue-900 transition-colors duration-300">
                {icons[index]}
              </div>
              <h3 className="text-sm md:text-xl font-bold text-blue-900 mb-2 group-hover:text-amber-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-slate-500 text-[10px] md:text-base leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 bg-blue-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-800 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-4xl font-bold text-white mb-4 md:mb-6">{t('benefits.ctaTitle')}</h3>
            <p className="text-blue-100 text-sm md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
              Réservez votre véhicule dès aujourd'hui partout au Maroc.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <button className="px-6 py-3 md:px-10 md:py-4 bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold text-sm md:text-lg rounded-xl md:rounded-2xl shadow-xl transition-all active:scale-95">
                Contactez-nous
              </button>
              <button className="px-6 py-3 md:px-10 md:py-4 bg-transparent border-2 border-white/20 hover:bg-white/10 text-white font-bold text-sm md:text-lg rounded-xl md:rounded-2xl transition-all">
                Nos tarifs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
