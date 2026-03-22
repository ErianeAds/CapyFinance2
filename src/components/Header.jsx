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
    // Handle RTL
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <header className="bg-[#fff8f2]/70 dark:bg-stone-950/70 backdrop-blur-md w-full sticky top-0 z-50 shadow-sm dark:shadow-none transition-all ease-in-out duration-300">
      <div className="flex justify-between items-center px-12 py-4 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-lg font-black text-[#154212] dark:text-emerald-400 font-headline">CapyFinance</Link>
          <nav className="hidden lg:flex items-center gap-8 font-headline font-medium">
            <Link className="text-stone-600 dark:text-stone-400 hover:text-[#2d5a27] dark:hover:text-emerald-300 transition-colors" to="/portfolio">{t('nav.portfolio')}</Link>
            <Link className="text-stone-600 dark:text-stone-400 hover:text-[#2d5a27] dark:hover:text-emerald-300 transition-colors" to="/insights">{t('nav.insights')}</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-sm font-medium"
            >
              <span>{currentLang.flag}</span>
              <span className="uppercase">{currentLang.code}</span>
              <span className={`material-symbols-outlined text-xs transition-transform ${isLangOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-outline-variant/10 py-2 z-[60] max-h-64 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container-low transition-colors flex items-center justify-between ${i18n.language === lang.code ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
                  >
                    <span>{lang.flag} {lang.name}</span>
                    {i18n.language === lang.code && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <input 
              className="bg-surface-container-high border-none rounded-full px-6 py-2 w-64 text-sm focus:ring-2 focus:ring-secondary/20 transition-all font-body" 
              placeholder="Search..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          </div>
          
          <div className="flex items-center gap-4 text-[#154212] dark:text-emerald-500">
            <button className="hover:text-[#2d5a27] transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary/10">
              <img 
                className="w-full h-full object-cover" 
                alt="Profile avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4tKAkoRSNoHCMIPIEmJBJ6aXD0Okp24-lo0EMS4CVM5ttIWEGvR3S9l1MYWBWosC41nNFnokAp7_8-kzM21bK9LbTD9dYBNtjOetOzwYnJi8OKvqriuy1qOCXCH4dJCoUqReJXIpTG8izd5OGde4Z22J1MeCHu6z_wOaqeHvW_Xh67wEC8ifVETug80_fv2jmrurCpVkiRo7qNovV31zMeBXT6BRor-eHVEgTOSruOe9CDLVzdvVGoLkwjAuao_pBs-c0Yc85xUD3"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
