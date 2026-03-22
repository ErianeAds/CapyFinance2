import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-surface">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        
        <footer className="bg-[#ede1cf] dark:bg-stone-900 w-full mt-auto flex flex-col items-center justify-center gap-4 py-12 px-8 border-t border-stone-200/20">
          <div className="flex flex-wrap justify-center gap-8 font-body text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400">
            <a className="hover:text-[#5c2c00] dark:hover:text-orange-300 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-[#5c2c00] dark:hover:text-orange-300 transition-colors underline decoration-[#154212]" href="#">Terms of Service</a>
            <a className="hover:text-[#5c2c00] dark:hover:text-orange-300 transition-colors" href="#">Financial Disclosures</a>
            <a className="hover:text-[#5c2c00] dark:hover:text-orange-300 transition-colors" href="#">Sustainability Report</a>
          </div>
          <p className="text-stone-500 dark:text-stone-400 font-body text-[10px] tracking-widest uppercase mt-4">© 2024 CapyFinance Financial. Inspired by the Pantanal.</p>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
