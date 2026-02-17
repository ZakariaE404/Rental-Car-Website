
import React from 'react';

const Marquee: React.FC = () => {
  const cities = [
    "Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès", "Kénitra", 
    "Oujda", "Tétouan", "Meknès", "Nador", "Laâyoune"
  ];

  const content = [...cities, ...cities]; // Double for seamless loop

  return (
    <div className="bg-blue-900/90 backdrop-blur-sm border-t border-white/10 py-4 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {content.map((city, idx) => (
          <div key={idx} className="flex items-center mx-8">
            <span className="text-amber-500 mr-2 text-xl">•</span>
            <span className="text-white font-bold text-lg uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity cursor-default">
              {city}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
