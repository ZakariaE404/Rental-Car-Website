import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ProfessionalServices: React.FC = () => {
  const { t } = useLanguage();
  const rawLeft = t<any>('services.listLeft');
  const rawRight = t<any>('services.listRight');
  const leftServicesList = Array.isArray(rawLeft) ? rawLeft : [];
  const rightServicesList = Array.isArray(rawRight) ? rawRight : [];

  const leftIcons = [
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )
  ];

  const rightIcons = [
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    )
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">{t('services.label')}</h4>
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="flex-1 space-y-12 order-2 lg:order-1">
            {leftServicesList.map((service, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex-grow text-right">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed font-medium">{service.description}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                  {leftIcons[idx]}
                </div>
              </div>
            ))}
          </div>

          {/* Central Image */}
          <div className="lg:w-1/3 flex justify-center relative order-1 lg:order-2">
            <div className="relative z-10 w-full max-w-[400px]">
              <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                alt="Agent Vinci Location"
                className="w-full h-auto rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-4 border-white"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-12 order-3">
            {rightServicesList.map((service, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                  {rightIcons[idx]}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed font-medium">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServices;
