import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), page: 'home' as const },
    { name: t('nav.about'), page: 'about' as const },
    { name: t('nav.vehicles'), page: 'vehicles' as const },
    { name: t('nav.blog'), page: 'blog' as const },
    { name: t('nav.contact'), page: 'contact' as const },
  ];

  const handleLinkClick = (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-slate-950/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => handleLinkClick('home')}
        >
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.brandName} className="h-10 md:h-12 w-auto object-contain drop-shadow-lg" />
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none uppercase">
                {settings.brandName} <span style={{ color: settings.brandColor }}>©</span>
              </h1>
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/80 font-bold mt-1">{t('nav.rentCar') || "Location de voitures"}</p>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all relative py-2 ${(currentPage === link.page)
                  ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5'
                  : 'text-white hover:opacity-80'
                  }`}
                style={currentPage === link.page ? { color: settings.brandColor, ['--tw-after-bg' as any]: settings.brandColor } : undefined}
              >
                {link.name}
                {currentPage === link.page && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: settings.brandColor }} />
                )}
              </button>
            ))}
          </div>

          <div className="pl-6 border-l border-white/10 hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden relative z-50 p-2 -mr-2 text-white/90 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          style={isOpen ? { color: settings.brandColor } : undefined}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2.5' : 'w-6'}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay - Premium Glassmorphism */}
      <div
        className={`lg:hidden fixed inset-0 h-[100dvh] w-full bg-slate-950/80 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-40 flex flex-col pt-24 pb-8 px-6 overflow-y-auto ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'
          }`}
      >
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-8 max-w-sm mx-auto">
          {/* Navigation Links */}
          <div className="flex flex-col items-center w-full gap-2">
            {navLinks.map((link, i) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                style={{
                  transitionDelay: isOpen ? `${100 + (i * 50)}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isOpen ? 1 : 0,
                  color: link.page === currentPage ? settings.brandColor : undefined
                }}
                className={`w-full py-4 text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-500 ease-out flex items-center justify-center gap-4 group ${link.page === currentPage
                  ? ''
                  : 'text-white/80 hover:text-white active:scale-95'
                  }`}
              >
                <span
                  className={`h-px transition-all duration-300 ${link.page === currentPage ? 'w-8' : 'w-0 group-hover:w-4'}`}
                  style={{ backgroundColor: `${settings.brandColor}80` }}
                />
                {link.name}
                <span
                  className={`h-px transition-all duration-300 ${link.page === currentPage ? 'w-8' : 'w-0 group-hover:w-4'}`}
                  style={{ backgroundColor: `${settings.brandColor}80` }}
                />
              </button>
            ))}
          </div>

          <div
            style={{
              transitionDelay: isOpen ? '400ms' : '0ms',
              transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
              opacity: isOpen ? 1 : 0
            }}
            className="w-16 h-px bg-white/10 transition-all duration-700"
          ></div>

          {/* Language Switcher container */}
          <div
            style={{
              transitionDelay: isOpen ? '450ms' : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0
            }}
            className="transition-all duration-500 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
