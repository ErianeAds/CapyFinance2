import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="px-12 py-8 max-w-[1600px] mx-auto w-full space-y-10">
        {/* Market Ticker Section */}
        <section className="flex flex-wrap gap-4">
          <div className="bg-surface-container-low px-6 py-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(21,66,18,0.5)]"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Ibovespa</p>
              <p className="font-headline font-bold text-lg">128.452,10 <span className="text-xs text-primary font-normal font-body">+1.2%</span></p>
            </div>
          </div>
          <div className="bg-surface-container-low px-6 py-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-2 h-2 rounded-full bg-tertiary"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Selic</p>
              <p className="font-headline font-bold text-lg">10.75% <span className="text-xs text-on-surface-variant font-normal font-body">Stable</span></p>
            </div>
          </div>
          <div className="bg-surface-container-low px-6 py-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">IPCA (Annual)</p>
              <p className="font-headline font-bold text-lg">4.51% <span className="text-xs text-error font-normal font-body">+0.3%</span></p>
            </div>
          </div>
          <div className="bg-surface-container-low px-6 py-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-2 h-2 rounded-full bg-primary-container"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">USD / BRL</p>
              <p className="font-headline font-bold text-lg">4.92 <span className="text-xs text-primary font-normal font-body">-0.05</span></p>
            </div>
          </div>
        </section>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Portfolio Performance (Main Chart) */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h2 className="font-headline text-2xl font-bold">{t('nav.portfolio')} Ecosystem</h2>
                <p className="text-on-surface-variant text-sm">Flow performance over the last 12 months</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full text-xs font-bold bg-surface-container-highest">1Y</button>
                <button className="px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">6M</button>
                <button className="px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors">ALL</button>
              </div>
            </div>
            {/* Mock Line Chart Representation */}
            <div className="h-64 flex items-end gap-1 relative z-10">
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[40%] rounded-t-lg"></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[45%] rounded-t-lg"></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[55%] rounded-t-lg"></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[50%] rounded-t-lg"></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[65%] rounded-t-lg"></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[75%] rounded-t-lg"></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[70%] rounded-t-lg"></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors h-[85%] rounded-t-lg"></div>
              <div className="flex-1 bg-gradient-to-br from-primary to-primary-container h-[95%] rounded-t-lg"></div>
            </div>
            {/* Subtle Capybara Motif */}
            <div className="absolute bottom-4 right-8 opacity-5 pointer-events-none select-none">
              <span className="material-symbols-outlined text-8xl">pets</span>
            </div>
          </div>

          {/* Asset Allocation (Side Card) */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-highest rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="font-headline text-xl font-bold mb-6">Asset Biomass</h2>
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
              <span className="material-symbols-outlined">download</span>
              Full Report
            </button>
          </div>
        </div>

        {/* News Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-low rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="Pantanal wetlands" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC17q31Kp-GX3OJZ25ijxACLoUk8GicbsWFaXfGdc86ofmj8sZVDY8bRvhwKk0o15NwUPQ6hpxOH9jiE3olYu-T0bCj0C6IvV-RIKcOsTVlD_mzAwd6p5uAfxlMxEUSk2wg36n4nEqlczoz10mQ7wCehSy88azzJKHdM5mqwYNBT79WJmXn0dhEKpk2liZLFKhhcx1urRyGecxigeta1ke5DFjDZHyslCVvaqV0fTSq4-FlDezdpJFOx1Nyr-co1kikRziQRkCc9In"
              />
              <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-on-primary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Sustainability</div>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg mb-2">Green Bonds: Harvesting Growth in the Wetland Economy</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">Exploring new ESG opportunities within the Brazilian agricultural sector...</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase">4 min read</span>
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="Forest canopy" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGRqVT8ha6w9RAeepjIQueDAbFOtF1RphHg7yOb_AlhOHetE_9M9QCP3cneJJbpUpJTcfHG6NRJbqf4EfHYUfQdaNjBouUvPnLq9ZmFeulsTtKMnB14wHE2uz4Hs7EvWP3yp4cq-Q5xfMS8peLsoh2LVQOJnm2ftH3tPAH5kk5QrRkqCOHBreAsDbcQ0gTWDCdWp2X7-sWEnrUtwjwsL9IzeiNFd0KjumFq2YDMwdOJYmJGV7i2RZBrqasQmYsHBYn1yrif20ygfp5"
              />
              <div className="absolute top-4 left-4 bg-tertiary/80 backdrop-blur-md text-on-primary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Market Insights</div>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg mb-2">The Selic Stagnation: Protecting Your Capital in Slow Waters</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">Why central bank decisions are keeping investors in defensive positions...</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase">7 min read</span>
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-8 flex flex-col justify-between text-on-primary relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-4">auto_awesome</span>
              <h3 className="font-headline font-bold text-2xl mb-4">Your Financial Spirit Animal</h3>
              <p className="text-on-primary/70 text-sm leading-relaxed">Based on your conservative risk profile, you align with the <strong>Steady Capybara</strong>—balanced, social, and resilient.</p>
            </div>
            <div className="relative z-10 mt-6">
              <button className="bg-surface-container-lowest text-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-surface-bright transition-colors">Re-evaluate Profile</button>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-20">
              <span className="material-symbols-outlined text-[180px]">water</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
