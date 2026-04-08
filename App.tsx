
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeVehicles from './components/HomeVehicles';
import VehicleShowcase from './components/VehicleShowcase';
import Benefits from './components/Benefits';
import CityNetwork from './components/CityNetwork';
import TrustSection from './components/TrustSection';
import BookingCTA from './components/BookingCTA';
import Footer from './components/Footer';
import ProfessionalServices from './components/ProfessionalServices';
import FAQ from './components/FAQ';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import ReservationWidget from './components/ReservationWidget';
import Marquee from './components/Marquee';
import LocationSection from './components/LocationSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingPage from './components/BookingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { Vehicle } from './data/vehicles';
import { useLanguage, LanguageProvider } from './context/LanguageContext';
import { SettingsProvider } from './context/SettingsContext';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<'home' | 'vehicles' | 'about' | 'blog' | 'contact' | 'booking' | 'privacy' | 'terms'>('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showLoader, setShowLoader] = useState(true);

  const handleNavigate = (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact' | 'booking' | 'privacy' | 'terms', vehicle: Vehicle | null = null) => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    setCurrentPage(page as any);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <SettingsProvider>
      {showLoader && <LoadingScreen onComplete={() => setShowLoader(false)} />}
      <div className="min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-900 bg-slate-50 relative">
        {/* Global Grain/Noise Overlay for premium feel */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Floating Global Buttons */}
        <FloatingWhatsApp />

        <Navbar onNavigate={(page) => handleNavigate(page as any)} currentPage={currentPage as any} />
        <main className="flex-grow">
          {currentPage === 'home' && (
            <div className="space-y-0">
              <Hero onNavigate={(page) => handleNavigate(page as any)} />

              {/* Top Moving Logos (Marquee) - New Position using the restored component */}
              <div className="relative z-40 -mt-12 md:-mt-16">
                <Marquee />
              </div>

              {/* Booking Form Section - Streamlined for professional feel and mobile-friendliness */}
              <div className="relative z-30 bg-white md:bg-transparent -mt-2 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                  <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden transform hover:scale-[1.005] md:hover:scale-[1.01] transition-transform duration-500">
                      <div className="bg-slate-900 px-6 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between border-b border-white/5">
                        <div className="text-center md:text-left">
                          <h3 className="text-white font-black text-lg md:text-xl uppercase tracking-tighter">{t('booking.title')}</h3>
                          <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">{t('booking.subtitle')}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-amber-500">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                          <span className="text-[10px] font-black uppercase tracking-widest">{t('booking.status')}</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-8 bg-white">
                        <ReservationWidget />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative px-0">
                <HomeVehicles onNavigate={(page) => handleNavigate(page as any)} onSelectVehicle={(v) => handleNavigate('booking', v)} />
                <ProfessionalServices />
                <Benefits onNavigate={(page) => handleNavigate(page as any)} />
                <LocationSection />
                <div className="bg-slate-900 text-white">
                  <CityNetwork onNavigate={(page) => handleNavigate(page as any)} />
                  <TrustSection onNavigate={(page) => handleNavigate(page as any)} />
                </div>
                <FAQ />
              </div>
            </div>
          )}
          {currentPage === 'vehicles' && (
            <div className="flex flex-col">
              <VehicleShowcase onSelectVehicle={(v) => handleNavigate('booking', v)} />
              <ProfessionalServices />
              <FAQ />
            </div>
          )}
          {currentPage === 'about' && (
            <About />
          )}
          {currentPage === 'blog' && (
            <Blog />
          )}
          {currentPage === 'contact' && (
            <Contact />
          )}
          {currentPage === 'booking' && (
            <BookingPage selectedVehicle={selectedVehicle} />
          )}
          {currentPage === 'privacy' && (
            <PrivacyPolicy />
          )}
          {currentPage === 'terms' && (
            <TermsOfService />
          )}
        </main>
        <Footer onNavigate={(page) => handleNavigate(page as any)} />
      </div>
    </SettingsProvider>
  );
};

export default App;
