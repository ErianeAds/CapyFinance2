import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ onNavigate, mobile = false }) => {
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
    navigate('/');
    if (onNavigate) onNavigate();
  };

  return (
    <aside className={`${mobile ? 'w-72' : 'w-72'} h-full border-r border-outline/20 bg-surface p-4`}>
      <div className="mb-6">
        <h1 className="text-xl font-bold">CapyFinance</h1>
        <p className="text-sm opacity-70">Wealth Management</p>
      </div>

      <nav className="space-y-2">
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
                  : 'bg-transparent hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="mt-8 rounded-2xl bg-surface-container-high p-4">
          <div className="mb-3">
            <p className="text-sm opacity-70">Eai,</p>
            <p className="font-semibold">{user.email.split('@')[0]}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl px-4 py-3 bg-red-500 text-white font-medium"
          >
            Sair
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;