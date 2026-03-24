import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const Valuation = () => {
  const { t } = useTranslation();
  const [valuation, setValuation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  
  const [form, setForm] = useState({
    lodge_name: '',
    equity_value: 0,
    revenue: 0,
    ebitda_margin: 0,
    growth_rate: 0
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('capy_user'));
    setUser(storedUser);
    fetchValuation();
  }, []);

  const fetchValuation = async () => {
    try {
      const token = localStorage.getItem('capy_token');
      const response = await fetch('/api/valuations/latest', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      // Verifica se recebemos um objeto de erro da Railway ou um objeto de valuation real
      if (data && data.lodge_name) {
        setValuation(data);
        setForm(data);
      } else {
        console.warn('API de valuation não retornou dados válidos:', data);
        setValuation(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching valuation:', error);
      setValuation(null);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('capy_token');
    try {
      const res = await fetch('/api/valuations', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetchValuation();
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const isAdmin = user?.role === 'admin';

  const data = valuation || {
    lodge_name: 'Pantanal Eco-Lodge',
    equity_value: 12400000,
    revenue: 4200000,
    ebitda_margin: 32.4,
    growth_rate: 12.5
  };

  return (
    <Layout>
      <div className="space-y-8 md:space-y-12">
        {/* Hero Header */}
        <section className="flex flex-col lg:flex-row justify-between lg:items-end gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-tertiary font-body text-[10px] md:text-xs tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-tertiary"></span>
              Strategic Evaluation
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-headline text-on-surface leading-tight tracking-tight">
              {data.lodge_name} <br className="hidden md:block" />
              <span className="text-secondary">Valuation Dashboard</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {isAdmin && (
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-surface-container-highest text-on-surface rounded-xl font-bold hover:bg-surface-dim transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'edit'}</span>
                {isEditing ? 'Cancel' : 'Edit Analysis'}
              </button>
            )}
            {isAdmin && isEditing && (
              <button 
                onClick={handleSave}
                className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Save Changes
              </button>
            )}
            {!isEditing && (
              <button className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg text-sm transition-transform active:scale-95">Export Report</button>
            )}
          </div>
        </section>

        {isEditing ? (
          /* Admin Editor Mode */
          <div className="bg-surface-container-low rounded-[2.5rem] p-10 border border-primary/20 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-2xl font-bold font-headline mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Valuation Parameter Editor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Company Name</label>
                <input className="w-full bg-surface-container p-4 rounded-xl font-bold border-none" value={form.lodge_name} onChange={e => setForm({...form, lodge_name: e.target.value})}/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Equity Value ($)</label>
                <input type="number" className="w-full bg-surface-container p-4 rounded-xl font-bold border-none" value={form.equity_value} onChange={e => setForm({...form, equity_value: parseFloat(e.target.value)})}/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Revenue ($)</label>
                <input type="number" className="w-full bg-surface-container p-4 rounded-xl font-bold border-none" value={form.revenue} onChange={e => setForm({...form, revenue: parseFloat(e.target.value)})}/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">EBITDA Margin (%)</label>
                <input type="number" step="0.1" className="w-full bg-surface-container p-4 rounded-xl font-bold border-none" value={form.ebitda_margin} onChange={e => setForm({...form, ebitda_margin: parseFloat(e.target.value)})}/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Growth Rate (%)</label>
                <input type="number" step="0.1" className="w-full bg-surface-container p-4 rounded-xl font-bold border-none" value={form.growth_rate} onChange={e => setForm({...form, growth_rate: parseFloat(e.target.value)})}/>
              </div>
            </div>
          </div>
        ) : (
          /* Bento Grid Dashboard View */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Main Valuation Card */}
            <div className="md:col-span-12 lg:col-span-8 bg-surface-container-low rounded-2xl md:rounded-[2rem] p-6 md:p-10 relative overflow-hidden group border border-outline-variant/10">
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/5 rounded-full -mr-10 md:-mr-20 -mt-10 md:-mt-20 blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
                  <div>
                    <p className="text-xs md:text-sm font-body uppercase tracking-widest text-stone-500 mb-1">Estimated Equity Value</p>
                    <h3 className="text-4xl md:text-6xl font-black font-headline text-primary">
                      ${(data.equity_value / 1000000).toFixed(1)}M
                    </h3>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0">
                    <span className="px-3 md:px-4 py-1.5 bg-primary-fixed text-on-primary-fixed text-[10px] md:text-xs font-bold rounded-full flex items-center gap-1 sm:mb-2">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      Strong Buy
                    </span>
                    <p className="text-[9px] md:text-[10px] uppercase text-stone-400 font-bold tracking-widest whitespace-nowrap">Calculated by CapyAI</p>
                  </div>
                </div>
                
                {/* Data Entry Mini-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-auto">
                  {[
                    { label: 'Revenue (FY24)', value: `$${(data.revenue / 1000000).toFixed(1)}M`, progress: 75, color: 'bg-primary' },
                    { label: 'EBITDA Margin', value: `${data.ebitda_margin}%`, progress: 50, color: 'bg-secondary' },
                    { label: 'Growth Rate', value: `${data.growth_rate}%`, progress: 66, color: 'bg-tertiary' },
                  ].map((item) => (
                    <div key={item.label} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-4">{item.label}</span>
                      <span className="text-xl font-bold font-headline">{item.value}</span>
                      <div className="w-full bg-surface-variant h-1 rounded-full mt-4 overflow-hidden">
                        <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Comparison Card */}
            <div className="md:col-span-4 bg-secondary-container/10 rounded-[2rem] p-10 flex flex-col justify-between border border-secondary/20 hover:bg-secondary-container/20 transition-all duration-500">
              <div>
                <h4 className="text-xl font-bold font-headline text-on-secondary-container mb-6">Market Comparison</h4>
                <div className="space-y-6">
                  {[
                    { label: 'Regional Average', value: '$8.2M', width: '65%', color: 'bg-secondary/40' },
                    { label: 'Premium Bench', value: '$10.5M', width: '85%', color: 'bg-secondary/60' },
                    { label: data.lodge_name, value: `$${(data.equity_value / 1000000).toFixed(1)}M`, width: '100%', color: 'bg-primary' },
                  ].map((row) => (
                    <div key={row.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-tight">{row.label}</span>
                        <span className={`text-sm font-bold ${row.label === data.lodge_name ? 'text-primary' : ''}`}>{row.value}</span>
                      </div>
                      <div className="h-2 bg-on-secondary/10 rounded-full w-full overflow-hidden">
                        <div className={`h-full ${row.color} rounded-full transition-all duration-1000`} style={{ width: row.width }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 p-5 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20">
                <p className="text-xs italic text-on-secondary-fixed-variant leading-relaxed font-medium">
                  "Valuation outpaces regional peers due to proprietary eco-assets and verified growth trajectory."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chart Section */}
        <section className="bg-surface-container rounded-[2rem] p-10 border border-outline-variant/10 overflow-hidden relative">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-2xl font-black font-headline text-primary">Intrinsic Growth Logic</h4>
              <p className="text-sm text-stone-500 font-medium">Long-term value projection based on current performance</p>
            </div>
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-primary">auto_graph</span>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2 px-4">
             {[30, 45, 60, 75, 90, 100].map((h, i) => (
               <div key={i} className="flex-1 bg-primary/10 hover:bg-primary/20 transition-all rounded-t-2xl relative group" style={{ height: `${h}%` }}>
                 <div className="absolute inset-x-0 bottom-0 bg-primary/20 rounded-t-2xl" style={{ height: '30%' }}></div>
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[10px] font-black">
                   202{4+i}: ${(data.revenue * (1 + (data.growth_rate/100) * i) / 1000000).toFixed(1)}M
                 </div>
               </div>
             ))}
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-between">
             <div className="flex gap-12">
                <div>
                   <p className="text-[10px] uppercase font-bold text-stone-400 mb-2">Multiplo Setorial</p>
                   <p className="text-xl font-black font-headline">5.4x EBITDA</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold text-stone-400 mb-2">Discount Rate</p>
                   <p className="text-xl font-black font-headline">9.2%</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-stone-400 mb-2">Model Version</p>
                <p className="text-sm font-bold opacity-60">Pantanal_v3.2_Organic</p>
             </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Valuation;
