import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

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
          <div className="flex flex-col items-center">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none uppercase">
              DigitalZ <span className="text-amber-500">©</span>
            </h1>
            <p className="text-[8px] uppercase tracking-[0.25em] text-white/80 font-bold mt-1">{t('nav.rentCar') || "Location de voitures"}</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all relative py-2 ${(currentPage === link.page)
                  ? 'text-amber-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-500'
                  : 'text-white hover:text-amber-500'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pl-6 border-l border-white/10">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 top-0 h-screen bg-slate-950 transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full p-6 gap-8">
          <div className="flex flex-col items-center gap-6 w-full">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`text-xl font-black tracking-widest uppercase transition-colors ${link.page === currentPage ? 'text-amber-500' : 'text-white hover:text-amber-500'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="w-16 h-1 bg-white/10 rounded-full"></div>

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
