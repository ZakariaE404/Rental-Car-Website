
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter">Case Studies</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">Real world solutions for complex businesses</p>
          </div>
          <a href="https://github.com/zakariaE404" target="_blank" className="px-8 py-4 border-2 border-primary-600 text-primary-500 font-black uppercase tracking-widest text-xs hover:bg-primary-600 hover:text-white transition-all">
            Github Repository
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border-2 border-slate-800 group hover:border-primary-600 transition-all duration-300"
            >
              <div className="h-80 bg-slate-800 relative overflow-hidden">
                <img
                  src={`${project.cover}`}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20">
                    {project.role.split('(')[0]}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-tight">{project.title}</h3>
                <p className="text-slate-400 mb-10 font-medium leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4 mb-10">
                  {project.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-4 text-slate-300 text-sm font-bold uppercase tracking-widest">
                      <span className="w-4 h-1 bg-primary-600"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-800">
                  {project.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-primary-500 font-black uppercase tracking-[0.2em]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
