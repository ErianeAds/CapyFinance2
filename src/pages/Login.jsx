import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const API_URL = 'https://capyfinance2-production.up.railway.app';

const response = await fetch(`${API_URL}/api/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('capy_user', JSON.stringify(data.user));
        // Se o usuário veio de uma tentativa de acesso à educação, redireciona para lá
        navigate('/education');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

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
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-error/10 text-error p-3 rounded-lg text-xs font-bold text-center border border-error/20">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1" htmlFor="email">{t('login.username')}</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60">person</span>
              <input 
                className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-secondary/20 transition-all outline-none" 
                id="email" 
                placeholder="Ex: admin@capyfinance.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className={`mt-4 w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 group text-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="animate-spin material-symbols-outlined">sync</span>
            ) : (
              <>
                <span>{t('login.submit')}</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
            )}
          </button>
        </form>
        
        <div className="flex flex-col items-center gap-6 mt-8">
          <p className="font-body text-xs text-on-surface-variant leading-relaxed text-center opacity-70">
            Ainda não tem uma conta? <Link to="/register" className="text-primary font-bold hover:underline">Cadastre-se agora</Link>
          </p>
          <p className="font-body text-[10px] text-on-surface-variant leading-relaxed text-center opacity-40 max-w-xs">
            Dica: Use <b>admin@capyfinance.com</b> / <b>admin123</b> para modo administrador ou <b>user@capyfinance.com</b> / <b>user123</b> para aluno.
          </p>
        </div>
        
        <div className="absolute -bottom-16 -right-12 opacity-20 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[140px] text-primary">pets</span>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-12 max-w-md hidden lg:block">
        <p className="font-headline text-on-primary/70 text-lg italic leading-relaxed">
          "Wealth, like the CapyFinance tides, requires precision to navigate and wisdom to preserve."
        </p>
      </div>
    </main>
  );
};

export default Login;
