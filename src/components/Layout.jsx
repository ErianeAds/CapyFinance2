import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-on-surface flex">
      {/* Sidebar desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 h-full bg-surface shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} mobile />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="p-4 sm:p-6">
          {children}
        </main>

        <footer className="px-4 sm:px-6 py-6 text-sm text-center text-on-surface-variant">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Financial Disclosures</span>
            <span>Sustainability Report</span>
          </div>
          <p>© 2024 CapyFinance Financial. Inspired by the Pantanal.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

