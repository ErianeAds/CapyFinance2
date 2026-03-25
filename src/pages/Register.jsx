import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, admin_secret: adminSecret }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="w-full max-w-md bg-white/40 backdrop-blur-xl p-12 rounded-[3rem] border border-primary/10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
             <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">person_add</span>
             </div>
             <h2 className="text-3xl font-black font-headline text-primary">Criar Conta</h2>
             <p className="text-stone-500 mt-2 font-medium">Junte-se ao ecossistema CapyFinance</p>
          </div>

          {error && <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl text-xs font-bold mb-6 text-center">{error}</div>}
          {success && <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl text-xs font-bold mb-6 text-center">Conta criada com sucesso! Redirecionando...</div>}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">E-mail Corporativo</label>
              <input 
                type="email" 
                className="w-full bg-surface-container border-none p-5 rounded-2xl font-bold focus:ring-2 ring-primary outline-none transition-all" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Senha Segura</label>
              <input 
                type="password" 
                className="w-full bg-surface-container border-none p-5 rounded-2xl font-bold focus:ring-2 ring-primary outline-none transition-all" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Chave Admin (Opcional)</label>
              <input 
                type="password" 
                className="w-full bg-surface-container border-none p-5 rounded-2xl font-bold focus:ring-2 ring-primary outline-none transition-all" 
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="Ex: CAPY_ADM_XXXX"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-5 bg-primary text-on-primary rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
            >
              Começar minha Jornada
            </button>
          </form>

          <p className="text-center mt-10 text-xs font-bold text-stone-400">
            Já possui uma conta? <Link to="/login" className="text-primary hover:underline">Entre aqui</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
