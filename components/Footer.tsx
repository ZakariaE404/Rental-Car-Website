import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.vehicles'), href: '#' },
    { name: t('nav.about'), href: '#' },
    { name: t('nav.blog'), href: '#' },
    { name: t('nav.contact'), href: '#' }
  ];

  /* 
     Ideally, mainCities should also be dynamic or fetched from a source.
     For now we use the static list but ideally it should follow the same pattern as CityNetwork.
     Since footer.cities corresponds to "Villes", we can just list the names.
  */
  const mainCities = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès", "Kénitra"];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 group cursor-pointer">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white tracking-tight">DigitalZ <span className="text-amber-500">Location</span></h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1">{t('nav.rentCar') || "Location de voitures"}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t('footer.partner')}
            </p>
            <div className="flex items-center gap-4">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all duration-300"
                  aria-label={social}
                >
                  <span className="capitalize text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-8 relative inline-block">
              {t('footer.quickLinks')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2 text-sm group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-8 relative inline-block">
              {t('footer.ourCities')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {mainCities.map((city) => (
                <li key={city}>
                  <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-amber-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-8 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></span>
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-all"
              />
              <button className="bg-amber-500 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20">
                {t('footer.subscribeButton')}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2024 DigitalZ Location. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-amber-500 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-amber-500 transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-amber-500 text-white p-3 rounded-full shadow-2xl hover:bg-amber-600 transition-all duration-300 z-50 group ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:-translate-y-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;