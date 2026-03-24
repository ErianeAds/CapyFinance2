import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ onNavigate, mobile = false }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('capy_user'));
  } catch {
    user = null;
  }

  const navItems = [
    { name: t('nav.dashboard'), icon: 'dashboard', path: '/dashboard' },
    { name: t('nav.education'), icon: 'school', path: '/education' },
    { name: t('nav.valuation'), icon: 'analytics', path: '/valuation' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('capy_user');
    navigate('/');
    if (onNavigate) onNavigate();
  };

  return (
    <aside
      className={`${
        mobile ? 'w-72' : 'w-64'
      } h-full md:h-screen p-4 sm:p-6 bg-[#fff8f2] dark:bg-stone-950 font-headline tracking-tight border-r-0 flex flex-col shrink-0`}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined">water_drop</span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-[#154212] dark:text-emerald-400">
            CapyFinance
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70">
            Wealth Management
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? 'bg-primary text-white'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">
        {user ? (
          <div className="rounded-2xl bg-black/5 dark:bg-white/5 p-4">
            <div className="mb-3">
              <p className="text-sm opacity-70">Eai,</p>
              <p className="font-semibold break-all">
                {user.email?.split('@')[0] || 'Usuário'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-xl px-4 py-3 bg-red-500 text-white font-medium"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-black/5 dark:bg-white/5 p-4 text-sm">
            Minha Conta
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

  