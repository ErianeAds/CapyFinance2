import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
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

  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-outline/20">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container-high"
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <Link to="/dashboard" className="font-bold text-lg">
            CapyFinance
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-sm font-medium"
            >
              {currentLang.flag} {currentLang.code}
              <span className="material-symbols-outlined">expand_more</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-surface shadow-lg border border-outline/20 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container-low flex items-center justify-between"
                  >
                    <span>{lang.flag} {lang.name}</span>
                    {i18n.language === lang.code && (
                      <span className="material-symbols-outlined">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high">
            <span className="material-symbols-outlined">search</span>
          </button>

          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;