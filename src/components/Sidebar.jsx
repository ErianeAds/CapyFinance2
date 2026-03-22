import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Premium Capy Icon SVG
const CapyIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M85 65C85 75 75 80 60 80C45 80 40 75 35 70C25 70 15 65 15 50C15 35 25 30 35 30C40 25 50 15 65 15C80 15 85 25 85 40C85 45 80 50 75 50C80 55 85 60 85 65ZM45 45C45 42 42 40 40 40C38 40 35 42 35 45C35 48 38 50 40 50C42 50 45 48 45 45Z" />
    <circle cx="68" cy="35" r="3" fill="white" />
    <path d="M50 78C60 78 70 75 75 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
  </svg>
);

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('capy_user'));

  const navItems = [
    { name: t('nav.dashboard'), icon: 'dashboard', path: '/dashboard' },
    { name: t('nav.education'), icon: 'school', path: '/education' },
    { name: t('nav.valuation'), icon: 'analytics', path: '/valuation' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('capy_user');
    navigate('/dashboard');
  };

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
      
      <div className="mt-auto space-y-6">
        {/* Friendly User Profile Section */}
        {user ? (
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-primary/5 shadow-xl shadow-primary/5 relative overflow-hidden group transition-all hover:border-primary/20">
            {/* Real Capybara Icon Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1">
               <CapyIcon className="w-12 h-12 text-primary" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-primary font-black text-2xl border-4 border-white shadow-sm transition-transform group-hover:scale-105 overflow-hidden">
                  <span className="relative z-10">{user.email.charAt(0).toUpperCase()}</span>
                  <CapyIcon className="absolute inset-0 opacity-10 p-2" />
                </div>
                <div>
                  <p className="text-xs font-black text-on-surface-variant opacity-60 uppercase tracking-widest leading-none mb-1">Eai,</p>
                  <p className="text-base font-black text-primary truncate leading-tight uppercase tracking-tight">{user.email.split('@')[0]}</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-primary/5">
                {user.role === 'user' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                       <span>No Fluxo de Estudo</span>
                       <span className="text-primary">45%</span>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-3xl border border-primary/5 hover:bg-white transition-all cursor-pointer group/item shadow-sm" onClick={() => navigate('/education')}>
                      <p className="text-[10px] font-black text-primary leading-tight line-clamp-2 uppercase mb-2">Guia da Renda Fixa</p>
                      <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[45%] rounded-full transition-all duration-1000"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-surface-container-high text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] hover:bg-error hover:text-white transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">waving_hand</span>
                  Pausar Edição
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-on-primary rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
             <CapyIcon className="w-5 h-5" />
            Minha Conta
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
