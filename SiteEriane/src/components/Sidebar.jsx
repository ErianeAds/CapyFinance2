import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const navItems = [
    { name: t('nav.dashboard'), icon: 'dashboard', path: '/dashboard' },
    { name: t('nav.education'), icon: 'school', path: '/education' },
    { name: t('nav.valuation'), icon: 'analytics', path: '/valuation' },
    { name: t('nav.market'), icon: 'trending_up', path: '/market' },
  ];

  return (
    <aside className="flex flex-col h-screen w-64 p-6 bg-[#fff8f2] dark:bg-stone-950 font-headline tracking-tight border-r-0 hidden md:flex shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined">water_drop</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#154212] dark:text-emerald-400">CapyFinance</h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">Wealth Management</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path
                ? 'text-[#154212] dark:text-emerald-400 font-bold border-r-4 border-[#154212] dark:border-emerald-500 bg-[#ede1cf]/50 dark:bg-stone-800'
                : 'text-stone-500 dark:text-stone-400 hover:bg-[#ede1cf]/50 dark:hover:bg-stone-800'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto space-y-4">
        <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add</span>
          {t('nav.newAnalysis')}
        </button>
        
        <div className="pt-6 space-y-2 border-t border-outline-variant/20">
          <Link to="/settings" className="flex items-center gap-4 px-4 py-2 text-stone-500 dark:text-stone-400 hover:bg-[#ede1cf]/50 transition-colors duration-300">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">{t('nav.settings')}</span>
          </Link>
          <Link to="/support" className="flex items-center gap-4 px-4 py-2 text-stone-500 dark:text-stone-400 hover:bg-[#ede1cf]/50 transition-colors duration-300">
            <span className="material-symbols-outlined">help_center</span>
            <span className="text-sm">{t('nav.support')}</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
