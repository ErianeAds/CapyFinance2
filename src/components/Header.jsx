import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  };

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  let user = null;
  const userString = localStorage.getItem('capy_user');
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch(e) {}
  }

  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-outline/20 px-4 py-3">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-high text-primary"
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <Link to="/dashboard" className="font-headline font-black text-xl text-primary tracking-tighter">
            CapyFinance
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-high text-xs font-bold uppercase tracking-wider transition-colors hover:bg-surface-container-highest"
            >
              {currentLang.flag} {currentLang.code}
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-surface shadow-2xl border border-outline/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full text-left px-5 py-3 text-sm hover:bg-black/5 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium tracking-tight">{lang.flag} {lang.name}</span>
                    {i18n.language === lang.code && (
                      <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high transition-colors hover:bg-surface-container-highest">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high transition-colors hover:bg-surface-container-highest">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
          </div>

          {/* New Profile Button */}
          <button 
            onClick={onMenuClick}
            className="md:hidden w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'User')}&background=154212&color=fff&bold=true`} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;