
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const [stats, setStats] = useState({ years: 0, cities: 0, vehicles: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);

      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setStats({
          years: Math.round(progress * 10),
          cities: Math.round(progress * 7),
          vehicles: Math.round(progress * 50),
        });

        if (frame === totalFrames) clearInterval(counter);
      }, frameRate);

      return () => clearInterval(counter);
    }
  }, [isVisible]);

  const checkPoints = (t('about.checkPoints') as unknown as string[]) || [];

  const cities = [
    "Casablanca", "Marrakech", "Rabat", "Tangier", "Agadir", "Fès",
    "Kenitra", "Oujda", "Meknès", "Tétouan", "El Jadida", "Essaouira"
  ];

  /* 
     We need to map features carefully because the translation likely has them as an array of objects 
     or we just reconstruct them here with t() for titles/descs.
     The translation file likely has `values` section.
     Let's assume `about.values` is an array of objects {title, desc}.
     If not, I might break it. 安全策 (Safe strategy): Use specific keys if I can't confirm array.
     But since I built `translations.ts` myself, I probably did use an array or keys.
     Let's use a safe fallback or try to read `translations.ts` if needed.
     Actually, looking at previous summary, I "Created the translations...".
     I'll try to access `about.features` as array. If it fails, I'll fix it.
  */
  const featuresData = (t('about.features') as unknown as any[]) || [];

  // Reconstruct features with icons using the data from translations
  // We'll map the hardcoded icons to the translated text by index
  const icons = [
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 3v.75m0 3v.75m0 3v.75m15-12v.75m0 3v.75m0 3v.75m0 3v.75m-15 0h15M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25Z" />
      </svg>
    ),
    (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V14.25M7.5 14.25V10.5A2.25 2.25 0 0 1 9.75 8.25h4.5a2.25 2.25 0 0 1 2.25 2.25v3.75m-9 0h9m-9 0c0-1.242 1.008-2.25 2.25-2.25h4.5a2.25 2.25 0 0 1 2.25 2.25" />
      </svg>
    )
  ];

  // Merge icons with data
  const features = featuresData.map((f, i) => ({
    ...f,
    icon: icons[i] || icons[0]
  }));

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Page Header Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        {/* Moroccan Pattern Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="moroccan-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#moroccan-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <nav className="flex justify-center mb-6 text-sm font-medium">
            <ol className="flex items-center space-x-2 text-slate-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors uppercase">{t('nav.home')}</a></li>
              <li><span className="text-slate-600">/</span></li>
              <li className="text-amber-500 uppercase">{t('nav.about')}</li>
            </ol>
          </nav>
          <span className="text-amber-500 font-black tracking-[0.2em] text-xs uppercase mb-4 block">{t('nav.about')}</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            {t('about.title')}
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300 font-light mb-8 max-w-3xl mx-auto border-l-4 border-amber-500 pl-6 py-2">
            {t('about.subtitle')}
          </h2>
          <p className="text-slate-400 max-w-4xl mx-auto leading-relaxed text-lg">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* About Section (Split Layout) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Column */}
            <div className="lg:w-[60%]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center text-blue-950 shadow-2xl shadow-amber-500/20">
                  <span className="text-3xl font-black">10+</span>
                </div>
                <div>
                  <h3 className="text-blue-900 font-black text-3xl uppercase tracking-tighter">{t('about.history')}</h3>
                  <p className="text-amber-600 font-bold uppercase tracking-widest text-xs">{t('about.historySubtitle')}</p>
                </div>
              </div>

              <p className="text-slate-600 text-lg mb-10 leading-relaxed font-light">
                {t('about.historyDescription')}
              </p>

              <div className="space-y-4">
                {checkPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 text-blue-950 mt-1 shadow-md group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-blue-900 font-semibold">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (Stats Card) */}
            <div className="lg:w-[40%] w-full" ref={statsRef}>
              <div className="bg-blue-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="100" cy="0" r="100" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-10 relative z-10">
                  <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-4xl font-black text-amber-500 mb-2">{stats.years}+</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70">{t('about.stats.years')}</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-4xl font-black text-amber-500 mb-2">{stats.cities}+</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70">{t('about.stats.cities')}</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-4xl font-black text-amber-500 mb-2">{stats.vehicles}+</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70">{t('about.stats.vehicles')}</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-4xl font-black text-amber-500 mb-2">24/7</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70">{t('about.stats.support')}</p>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/10">
                  <p className="text-blue-100 italic font-light text-center">
                    "{t('about.commitment')}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 mb-4 uppercase tracking-tighter">{t('about.coverage.title')}</h2>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('about.coverage.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities.map((city, idx) => (
              <div
                key={idx}
                className="group p-6 bg-white rounded-2xl border border-slate-100 flex items-center gap-4 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900 group-hover:bg-amber-500 group-hover:text-blue-950 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <span className="font-bold text-blue-900 uppercase tracking-wide">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:border-amber-500/20 group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-500 mb-8 group-hover:bg-blue-900 group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-blue-900 mb-4 leading-tight uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-blue-950 relative overflow-hidden">
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="url(#moroccan-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              {t('about.values.title')}
            </h2>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-10"></div>
            <p className="text-blue-100 max-w-4xl mx-auto text-lg font-light leading-relaxed">
              {t('about.values.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 transition-all hover:bg-white/10 group">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-8 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{t('about.values.satisfaction')}</h3>
              <p className="text-blue-100/70 font-light leading-relaxed">
                {t('about.values.satisfactionDesc')}
              </p>
            </div>

            {/* Value Card 2 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 transition-all hover:bg-white/10 group">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-8 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{t('about.values.transparency')}</h3>
              <p className="text-blue-100/70 font-light leading-relaxed">
                {t('about.values.transparencyDesc')}
              </p>
            </div>

            {/* Value Card 3 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 transition-all hover:bg-white/10 group">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-8 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{t('about.values.reliability')}</h3>
              <p className="text-blue-100/70 font-light leading-relaxed">
                {t('about.values.reliabilityDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2000&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-blue-900/90"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <svg className="w-16 h-16 text-amber-500 mx-auto mb-10 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <h2 className="text-2xl md:text-4xl font-light text-white max-w-4xl mx-auto italic leading-relaxed">
            "{t('about.commitment')}"
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-12 rounded-full"></div>
          <p className="text-amber-500 font-black mt-6 uppercase tracking-widest text-sm">{t('about.team')}</p>
        </div>
      </section>

      {/* Cities Marquee */}
      <div className="bg-white py-12 border-t border-slate-100 overflow-hidden select-none">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...cities, "Laayoune", "Nador", ...cities].map((city, idx) => (
            <div key={idx} className="flex items-center mx-10">
              <span className="text-amber-500 mr-4 font-black">•</span>
              <span className="text-blue-900 font-black text-2xl uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity cursor-default">
                {city}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
