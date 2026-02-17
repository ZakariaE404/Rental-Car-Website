
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
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'vehicles' | 'about' | 'blog' | 'contact'>('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="flex-grow">
          {currentPage === 'home' && (
            <>
              <Hero onNavigate={setCurrentPage} />
              <ProfessionalServices />
              <HomeVehicles onNavigate={setCurrentPage} />
              <Benefits onNavigate={setCurrentPage} />
              <CityNetwork onNavigate={setCurrentPage} />
              <TrustSection onNavigate={setCurrentPage} />
              <FAQ />
              <BookingCTA />
            </>
          )}
          {currentPage === 'vehicles' && (
            <div className="flex flex-col">
              <VehicleShowcase />
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
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
};

export default App;
