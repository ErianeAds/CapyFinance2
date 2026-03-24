import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-on-surface flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar desktop */}
      <div className="hidden md:block sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Sidebar mobile Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`w-72 h-full bg-surface shadow-2xl transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar onNavigate={() => setMobileMenuOpen(false)} mobile />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1">
          <div className="mx-auto w-full px-4 sm:px-8 py-6 md:py-10 max-w-[1600px]">
            {children}
          </div>
        </main>

        <footer className="px-6 py-10 mt-auto border-t border-outline/10 text-sm text-center text-on-surface-variant bg-surface-container-lowest/50 backdrop-blur-sm">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-4 font-bold tracking-tight uppercase text-[10px]">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Financial Disclosures</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Sustainability Report</span>
          </div>
          <p className="opacity-60">© 2024 CapyFinance Financial. Inspired by the Pantanal.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

