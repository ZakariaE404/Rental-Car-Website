
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
    mobile?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mobile = false }) => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        {
            code: 'fr',
            label: 'FR',
            name: 'Français',
            flag: (
                <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm shadow-sm">
                    <path fill="#fff" d="M0 0h640v480H0z" />
                    <path fill="#0026a8" d="M0 0h213.3v480H0z" />
                    <path fill="#f4ce3c" d="M426.7 0h213.3v480H426.7z" style={{ fill: '#ec1920' }} />
                </svg>
            )
        },
        {
            code: 'en',
            label: 'EN',
            name: 'English',
            flag: (
                <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm shadow-sm">
                    <path fill="#012169" d="M0 0h640v480H0z" />
                    <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
                    <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" />
                    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
                    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
                </svg>
            )
        },
        {
            code: 'es',
            label: 'ES',
            name: 'Español',
            flag: (
                <svg viewBox="0 0 640 480" className="w-6 h-4 rounded-sm shadow-sm">
                    <path fill="#aa151b" d="M0 0h640v480H0z" />
                    <path fill="#f1bf00" d="M0 120h640v240H0z" />
                </svg>
            )
        },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    if (mobile) {
        return (
            <div className="flex gap-4 justify-center py-4">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${language === lang.code
                            ? 'bg-amber-500/10 text-amber-500 ring-1 ring-amber-500'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{lang.label}</span>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                <span className="text-lg">{currentLang.flag}</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">{currentLang.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            <div className={`absolute top-full right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden transition-all transform origin-top-right ${isOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => {
                            setLanguage(lang.code);
                            setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 ${language === lang.code ? 'text-amber-500 bg-amber-500/5' : 'text-slate-300'
                            }`}
                    >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-xs font-bold uppercase tracking-wider">{lang.name}</span>
                        {language === lang.code && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 ml-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
