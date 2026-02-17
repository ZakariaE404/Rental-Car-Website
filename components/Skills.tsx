
import React from 'react';
import { SKILL_GROUPS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter text-center">Core Toolkit</h2>
          <div className="w-20 h-2 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-800">
          {SKILL_GROUPS.map((group, idx) => (
            <div 
              key={idx}
              className="p-10 border border-slate-800 group hover:bg-primary-600 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center mb-10 group-hover:bg-white group-hover:border-white transition-colors">
                <i className={`${group.icon} text-xl text-primary-500 group-hover:text-primary-600`}></i>
              </div>
              <h3 className="text-xl font-display font-black text-white mb-8 uppercase tracking-widest group-hover:text-white">{group.category}</h3>
              <div className="flex flex-col gap-4">
                {group.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="text-slate-500 font-bold text-sm uppercase tracking-widest group-hover:text-white/80 transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-primary-600 group-hover:bg-white"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
