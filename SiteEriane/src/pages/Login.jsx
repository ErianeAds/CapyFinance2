import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

  return (
    <main className="relative flex-grow flex items-center justify-center pantanal-bg p-6 lg:p-12 min-h-screen">
      <div className="absolute top-12 left-12 hidden lg:block">
        <div className="flex flex-col gap-1">
          <span className="font-headline font-black text-4xl text-on-primary tracking-tighter">CapyFinance</span>
          <span className="font-label text-xs tracking-[0.2em] uppercase text-surface-bright/80">Wealth Management</span>
        </div>
      </div>
      
      <div className="w-full max-w-lg glass-panel rounded-xl shadow-2xl relative p-8 md:p-12 flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="lg:hidden mb-4">
            <span className="font-headline font-black text-2xl text-primary tracking-tighter">CapyFinance</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight">{t('login.title')}</h1>
          <p className="text-on-surface-variant font-body text-sm max-w-[280px]">{t('login.subtitle')}</p>
        </div>
        
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1" htmlFor="email">{t('login.username')}</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60">person</span>
              <input 
                className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-secondary/20 transition-all outline-none" 
                id="email" 
                placeholder="john.doe@flow.com" 
                type="email"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="password">{t('login.password')}</label>
              <a className="font-label text-[10px] font-bold text-tertiary uppercase tracking-widest hover:text-tertiary-container transition-colors" href="#">{t('login.forgot')}</a>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60">lock</span>
              <input 
                className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-secondary/20 transition-all outline-none" 
                id="password" 
                placeholder="••••••••" 
                type="password"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-2">
            <input 
              className="w-5 h-5 rounded-lg border-none bg-surface-container-high text-primary focus:ring-0" 
              id="remember" 
              type="checkbox"
            />
            <label className="font-body text-sm text-on-surface-variant" htmlFor="remember">{t('login.remember')}</label>
          </div>
          
          <Link 
            to="/dashboard"
            className="mt-4 w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 group text-center"
          >
            <span>{t('login.submit')}</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </form>
        
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30"></div>
          </div>
          <span className="relative bg-transparent px-4 font-label text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.2em]">or</span>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <p className="font-body text-sm text-on-surface-variant">
            {t('login.newToFlow')} 
            <a className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1" href="#">{t('login.requestAccess')}</a>
          </p>
        </div>
        
        <div className="absolute -bottom-16 -right-12 opacity-20 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[140px] text-primary">pets</span>
        </div>
        
        <div className="absolute bottom-4 right-6 flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Guardian</span>
          <span className="material-symbols-outlined text-lg">security</span>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-12 max-w-md hidden lg:block">
        <p className="font-headline text-on-primary/70 text-lg italic leading-relaxed">
          "Wealth, like the CapyFinance tides, requires precision to navigate and wisdom to preserve."
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-px w-12 bg-on-primary/40"></div>
          <span className="font-label text-xs uppercase tracking-[0.3em] text-on-primary/60">Ecosystem Principles</span>
        </div>
      </div>
    </main>
  );
};

export default Login;
