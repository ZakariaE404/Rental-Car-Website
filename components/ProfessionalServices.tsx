import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ProfessionalServices: React.FC = () => {
  const { t } = useLanguage();
  const rawLeft = t<any>('services.listLeft');
  const rawRight = t<any>('services.listRight');
  const leftServicesList = Array.isArray(rawLeft) ? rawLeft : [];
  const rightServicesList = Array.isArray(rawRight) ? rawRight : [];

  const icons = [
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
  ];

  const allServices = [...leftServicesList, ...rightServicesList];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">

          {/* Left Side: Text & Grid */}
          <div className="w-full lg:w-3/5">
            <div className="mb-16">
              <h4 className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6">SERVICES D'EXCELLENCE</h4>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[0.95]">
                {t('services.title')}
              </h2>
              <div className="w-20 h-1.5 bg-amber-500 rounded-full mb-8"></div>
              <p className="text-slate-500 font-medium max-w-2xl">
                Découvrez une gamme de services exclusifs conçus pour transcender vos attentes en matière de mobilité de luxe au Maroc.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              {allServices.map((service, idx) => (
                <div key={idx} className="group flex gap-6 p-2">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm border border-slate-100 group-hover:bg-amber-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                    {icons[idx]}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{service.title}</h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed font-medium opacity-80 line-clamp-2">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Cinematic Image */}
          <div className="w-full lg:w-2/5 relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-500/10 rounded-[3rem] blur-3xl opacity-50"></div>
              <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2400&auto=format&fit=crop"
                  alt="Luxe Service"
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-amber-500 font-black text-[10px] tracking-[0.2em] mb-2 uppercase">VOTRE SATISFACTION</p>
                  <p className="text-white font-black text-xl uppercase tracking-tighter">NOTRE PRIORITÉ ABSOLUE</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfessionalServices;
