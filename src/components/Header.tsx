import React from 'react';
import { Settings } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  title: string;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLangChange, title, onOpenSettings }) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
  ];

  return (
    <header className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSettings}
          className="p-2.5 bg-card border border-edge rounded-xl shadow-sm text-text-muted hover:text-primary transition-colors group"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-text-main tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-text-muted text-[11px] font-bold uppercase tracking-widest mt-1">
            Zone 04 • Sector B
          </p>
        </div>
      </div>

      <div className="flex bg-edge p-1 rounded-xl font-bold text-[11px] shadow-inner">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLangChange(lang.code)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentLang === lang.code
                ? 'bg-card text-text-main shadow-sm'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </header>
  );
};
