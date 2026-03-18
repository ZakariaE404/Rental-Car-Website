import React from 'react';

const Marquee: React.FC = () => {
  const cityData = [
    { name: "Casablanca", image: "/assets/casa.jpeg" },
    { name: "Rabat", image: "/assets/rabat.jpg" },
    { name: "Marrakech", image: "/assets/marrakech.jpeg" },
    { name: "Tanger", image: "/assets/tangier.webp" },
    { name: "Agadir", image: "/assets/agadir.jpeg" },
    { name: "Fès", image: "/assets/fes.jpeg" }
  ];

  const content = [...cityData, ...cityData, ...cityData]; // Triple for seamless loop

  return (
    <div className="bg-slate-950/40 backdrop-blur-xl border-y border-white/5 py-4 overflow-hidden select-none relative z-20">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {content.map((city, idx) => (
          <div key={idx} className="flex items-center mx-12 group cursor-default">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/30 group-hover:border-amber-500 transition-all duration-500 transform group-hover:scale-110 shadow-lg mr-6">
              <img src={city.image} alt={city.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <span className="text-white font-black text-xl md:text-2xl uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-all group-hover:text-amber-500">
              {city.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
