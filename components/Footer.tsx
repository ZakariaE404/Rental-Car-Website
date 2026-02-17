import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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

  const footerLinks: { name: string; page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact' }[] = [
    { name: t('nav.home'), page: 'home' },
    { name: t('nav.vehicles'), page: 'vehicles' },
    { name: t('nav.about'), page: 'about' },
    { name: t('nav.blog'), page: 'blog' },
    { name: t('nav.contact'), page: 'contact' }
  ];

  const socialIcons: { name: string; href: string; icon: React.ReactNode }[] = [
    {
      name: 'Facebook',
      href: '#facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
      )
    },
    {
      name: 'Instagram',
      href: '#instagram',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
      )
    },
    {
      name: 'Twitter',
      href: '#twitter',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#linkedin',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
      )
    }
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
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1">{t('nav.rentCar')}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t('footer.partner')}
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
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
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-2 text-sm group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors"></span>
                    {link.name}
                  </button>
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