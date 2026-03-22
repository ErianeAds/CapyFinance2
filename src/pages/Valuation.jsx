import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const Valuation = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="flex-1 p-12 max-w-[1600px] mx-auto w-full space-y-12 transition-all duration-500 ease-in-out">
        {/* Hero Header */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-tertiary font-body text-xs tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-tertiary"></span>
              Strategic Evaluation
            </div>
            <h2 className="text-5xl font-black font-headline text-on-surface leading-tight tracking-tight">
              Pantanal Eco-Lodge <br/>
              <span className="text-secondary">Valuation Dashboard</span>
            </h2>
            <p className="text-on-surface-variant font-body leading-relaxed opacity-80">
              An integrated analysis of intrinsic cash flow performance against the broader regional tourism benchmarks. Leveraging organic growth models derived from ecosystem sustainability.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-surface-container-highest text-on-surface rounded-xl font-bold hover:bg-surface-dim transition-colors">Export PDF</button>
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold shadow-lg">Save Analysis</button>
          </div>
        </section>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Valuation Card */}
          <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-10 relative overflow-hidden group border border-outline-variant/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-sm font-body uppercase tracking-widest text-stone-500 mb-1">Estimated Equity Value</p>
                  <h3 className="text-6xl font-black font-headline text-primary">$12.4M</h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-4 py-1.5 bg-primary-fixed text-on-primary-fixed text-xs font-bold rounded-full flex items-center gap-1 mb-2">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    Strong Buy
                  </span>
                  <p className="text-xs text-stone-500 font-body">+18.4% vs Previous Quarter</p>
                </div>
              </div>
              
              {/* Data Entry Mini-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-auto">
                {[
                  { label: 'Revenue (FY24)', value: '$4.2M', progress: 75, color: 'bg-primary' },
                  { label: 'EBITDA Margin', value: '32.4%', progress: 50, color: 'bg-secondary' },
                  { label: 'Growth Rate', value: '12.5%', progress: 66, color: 'bg-tertiary' },
                ].map((item) => (
                  <div key={item.label} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow">
                    <span className="text-xs font-body text-stone-400 block mb-4">{item.label}</span>
                    <span className="text-xl font-bold font-headline">{item.value}</span>
                    <div className="w-full bg-surface-variant h-1 rounded-full mt-4 overflow-hidden">
                      <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Comparison Card */}
          <div className="md:col-span-4 bg-secondary-container/10 rounded-[2rem] p-10 flex flex-col justify-between border border-secondary/20">
            <div>
              <h4 className="text-xl font-bold font-headline text-on-secondary-container mb-6">Market Comparison</h4>
              <div className="space-y-6">
                {[
                  { label: 'Eco-Tourism Avg', value: '$8.2M', width: '65%', color: 'bg-secondary/40' },
                  { label: 'Pantanal Premium', value: '$10.5M', width: '85%', color: 'bg-secondary/60' },
                  { label: 'Current Lodge', value: '$12.4M', width: '100%', color: 'bg-primary' },
                ].map((row) => (
                  <div key={row.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{row.label}</span>
                      <span className={`text-sm font-bold ${row.label === 'Current Lodge' ? 'text-primary' : ''}`}>{row.value}</span>
                    </div>
                    <div className="h-2 bg-on-secondary/10 rounded-full w-full overflow-hidden">
                      <div className={`h-full ${row.color} rounded-full transition-all duration-1000`} style={{ width: row.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-xs italic text-on-secondary-fixed-variant leading-relaxed">
                "The lodge outpaces regional peers due to its proprietary water-rights and exclusive jaguar-trail access."
              </p>
            </div>
          </div>

          {/* Metrics Bento Box */}
          <div className="md:col-span-4 bg-surface-container-highest rounded-[2rem] p-8">
            <h4 className="text-lg font-bold font-headline mb-6">Risk Assessment</h4>
            <div className="space-y-4">
              {[
                { label: 'Climate Stability', sub: 'Low Exposure', icon: 'tsunami', color: 'text-tertiary', bg: 'bg-tertiary/10', dots: [true, true, false] },
                { label: 'Regulatory Health', sub: 'Compliance Verified', icon: 'gavel', color: 'text-secondary', bg: 'bg-secondary/10', dots: [true, true, true] },
              ].map((risk) => (
                <div key={risk.label} className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/5">
                  <div className={`w-10 h-10 rounded-full ${risk.bg} flex items-center justify-center ${risk.color}`}>
                    <span className="material-symbols-outlined">{risk.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{risk.label}</p>
                    <p className="text-xs text-stone-500">{risk.sub}</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {risk.dots.map((active, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${active ? 'bg-primary' : 'bg-surface-dim'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Placeholder Card */}
          <div className="md:col-span-8 bg-surface-container rounded-[2rem] p-8 flex flex-col border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-lg font-bold font-headline">5-Year Growth Projection</h4>
              <div className="flex gap-2">
                <button className="text-xs font-bold px-3 py-1 bg-primary text-white rounded-full">Organic</button>
                <button className="text-xs font-bold px-3 py-1 text-stone-400 hover:bg-surface-variant rounded-full transition-colors">Aggressive</button>
              </div>
            </div>
            <div className="flex-1 flex items-end gap-3 min-h-[200px] px-4">
              {[40, 55, 70, 85, 100].map((h, i) => (
                <div 
                  key={i}
                  className={`flex-1 ${i === 3 ? 'bg-primary shadow-lg shadow-primary/20' : i === 4 ? 'bg-primary-container' : 'bg-primary-fixed-dim/40'} rounded-t-xl relative group transition-all duration-500 hover:opacity-80`}
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">202{4+i}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-outline-variant/20 flex justify-between items-center">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] uppercase text-stone-400 mb-1">Terminal Value</p>
                  <p className="text-sm font-bold">$18.9M</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-stone-400 mb-1">Discount Rate (WACC)</p>
                  <p className="text-sm font-bold">8.4%</p>
                </div>
              </div>
              <div className="flex items-center text-primary gap-1 cursor-pointer hover:gap-2 transition-all">
                <span className="text-xs font-bold">Detailed Model</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Analysis Notes */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
          <div className="space-y-6">
            <h5 className="text-xl font-bold font-headline">Analyst Perspective</h5>
            <div className="bg-surface-container-low p-8 rounded-[2rem] border-l-8 border-tertiary">
              <p className="font-body text-on-surface-variant leading-relaxed italic">
                "The valuation reflects a 2.4x multiple expansion opportunity within the sustainable lodge sector. We recommend focusing on 'Scope 3' emission reductions to unlock green-fund capital in the next fiscal year. Current EBITDA trajectory is superior to peers due to vertical integration of river-guide services."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-dim rounded-full flex items-center justify-center text-primary overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Analyst" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO6sTyTfQB9aF4WdixhPPbmChoaJuoo7vzd8k705B2NoH1-6TLtWeNUD8guqKpk3N2vyFchMFZf9ZX_FLI7G38xHx4X6Up7DsCUr5s_f0N8M_EIbzy2nrCdaBobWd9zl_JvQTpgAPlLRXMyau_c3oPZTfwtwEhYL2OiVdXqKxhGIfcyXqhbb7-ZtDggPJqzg_DnZdea8aSWpQeAVGlG7NXVrBP4mldFRVGrkdDO_OVz_YiM9twQftB8xiXYaYsXbwTnATjMb7MMRaF"/>
                </div>
                <div>
                  <p className="text-sm font-bold">Julian Merchán</p>
                  <p className="text-xs text-stone-500">Chief Valuations Officer</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute bottom-4 right-4 opacity-10">
              <span className="material-symbols-outlined text-8xl">water_lux</span>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary mb-4">verified</span>
            <h5 className="text-lg font-bold font-headline mb-2">Pantanal Precision Certified</h5>
            <p className="text-sm text-on-surface-variant max-w-xs mx-auto">
              This valuation follows the CapyFinance proprietary organic assessment framework, verified for environmental impact transparency.
            </p>
            <button className="mt-6 text-primary font-bold text-sm underline underline-offset-4 decoration-2">Download Certificate</button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Valuation;
