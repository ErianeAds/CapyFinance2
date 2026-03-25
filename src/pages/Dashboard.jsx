import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('capy_user'));
      const token = storedUser?.token;
      
      const response = await fetch('/api/metrics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      // Garante que metrics seja um array para evitar crash no .map() ou .find()
      if (Array.isArray(data)) {
        setMetrics(data);
      } else {
        console.warn('API de métricas não retornou um array:', data);
        setMetrics([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setMetrics([]); // Fallback para array vazio
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getMetric = (symbol) => metrics.find(m => m.symbol === symbol) || { value: 0, change: 0 };

  return (
    <Layout>
      <div className="space-y-8 md:space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-4xl font-black font-headline text-on-surface tracking-tight leading-tight">
            Ecossistema Financeiro do Brasil
          </h1>
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] md:text-xs bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Live Market Feed
          </div>
        </div>

        {/* Market Ticker Section */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {metrics.map(m => (
            <div key={m.symbol} className="bg-surface-container-low px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl flex flex-col md:flex-row md:items-center gap-2 md:gap-4 transition-all hover:shadow-md border border-outline/5 hover:border-primary/20">
              <div className={`w-2 h-2 rounded-full ${m.symbol === 'Ibovespa' ? 'bg-primary shadow-[0_0_8px_rgba(21,66,18,0.5)]' : m.symbol === 'Selic' ? 'bg-tertiary' : m.symbol === 'IPCA' ? 'bg-secondary' : 'bg-primary-container'}`}></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">
                  {m.symbol}
                </p>
                <p className="font-headline font-bold text-lg">
                  {m.symbol === 'USD/BRL' ? 'R$ ' : ''}
                  {m.value.toLocaleString('pt-BR')} 
                  {m.symbol === 'Ibovespa' ? '' : '%'}
                  <span className={`text-xs ml-2 font-normal font-body ${m.change >= 0 ? (m.symbol === 'IPCA' ? 'text-error' : 'text-primary') : (m.symbol === 'IPCA' ? 'text-primary' : 'text-error')}`}>
                    {m.change >= 0 ? '+' : ''}{m.change}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden ring-1 ring-outline/5">
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h2 className="font-headline text-2xl font-bold">{t('nav.portfolio')} Ecosystem</h2>
                <p className="text-on-surface-variant text-sm">Flow performance over the last 12 months</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full text-xs font-bold bg-surface-container-highest">1Y</button>
                <button className="px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">6M</button>
              </div>
            </div>
            <div className="h-64 flex items-end gap-1 relative z-10">
              {[40, 45, 55, 50, 65, 75, 70, 85, 95].map((h, i) => (
                <div key={i} className={`flex-1 ${i === 8 ? 'bg-gradient-to-br from-primary to-primary-container' : 'bg-primary/10 hover:bg-primary/20'} transition-colors rounded-t-lg`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="absolute bottom-4 right-8 opacity-5 pointer-events-none select-none">
              <span className="material-symbols-outlined text-8xl">pets</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-surface-container-highest rounded-3xl p-6 md:p-8 flex flex-col justify-between ring-1 ring-outline/5">
            <div>
              <h2 className="font-headline text-lg md:text-xl font-bold mb-6">Asset Biomass</h2>
              <div className="space-y-6">
                {[
                  { name: 'Fixed Income', color: 'bg-primary', percentage: '65%' },
                  { name: 'Equities', color: 'bg-secondary', percentage: '20%' },
                  { name: 'Real Estate', color: 'bg-tertiary', percentage: '10%' },
                  { name: 'Liquid Assets', color: 'bg-outline', percentage: '5%' },
                ].map((asset) => (
                  <div key={asset.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                      <span className="text-sm font-medium">{asset.name}</span>
                    </div>
                    <span className="text-sm font-bold">{asset.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-8 py-4 border-2 border-primary/20 rounded-2xl text-primary font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              Full Report
            </button>
          </div>
        </div>

        {/* News Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          <div className="bg-surface-container-low rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Pantanal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC17q31Kp-GX3OJZ25ijxACLoUk8GicbsWFaXfGdc86ofmj8sZVDY8bRvhwKk0o15NwUPQ6hpxOH9jiE3olYu-T0bCj0C6IvV-RIKcOsTVlD_mzAwd6p5uAfxlMxEUSk2wg36n4nEqlczoz10mQ7wCehSy88azzJKHdM5mqwYNBT79WJmXn0dhEKpk2liZLFKhhcx1urRyGecxigeta1ke5DFjDZHyslCVvaqV0fTSq4-FlDezdpJFOx1Nyr-co1kikRziQRkCc9In" />
              <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-on-primary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Sustainability</div>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg mb-2">Green Bonds: Harvesting Growth</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">Exploring new ESG opportunities within the Brazilian agricultural sector...</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-3xl overflow-hidden group border border-primary/10">
             <div className="p-8 h-full flex flex-col justify-between">
                <div>
                   <h3 className="text-primary font-headline font-bold text-xl mb-4">Market Outlook</h3>
                   <p className="text-xs leading-relaxed text-on-surface-variant">Central bank reports indicate a stable period ahead, favoring yields in high-liquidity fixed assets.</p>
                </div>
                <div className="mt-8 pt-8 border-t border-primary/5 flex items-center justify-between">
                   <div className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">Updated Today</div>
                   <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
             </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-8 flex flex-col justify-between text-on-primary relative overflow-hidden">
             <div className="relative z-10">
               <span className="material-symbols-outlined text-4xl mb-4">auto_awesome</span>
               <h3 className="font-headline font-bold text-2xl mb-4">Steady Capybara</h3>
               <p className="text-on-primary/70 text-sm leading-relaxed">Balanced and resilient—your risk profile remains optimized.</p>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
