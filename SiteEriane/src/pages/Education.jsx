import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();
  const courses = [
    {
      title: 'Investing in the Wetlands',
      desc: 'Learn to navigate complex illiquid markets using the principles of riparian ecology and sustainable capital flow.',
      progress: 65,
      tag: 'Foundation',
      tagColor: 'bg-tertiary',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7uIHdYuaCydHIWogsAlmL3xWYRBv0lNn2gW_U7_0YLUF0ifB_nZhgDSqoZNFmG8JvCtvMn6SAaFy6_05WAdF87NhdzIcOXSMkuR3YfPYhUznll3E_ybExgNZ_qp8BVwy2MbMlUlhpcdDGkKxDVCABYE7E2UhB1gHQ8GHOvqVGRzFox10RGN-ISKBHvyNVXWemw-iaUlT22bqvS88Wk0cMj_AILPhaX8RpSfzQbcwmLfvVmWMyFSA3g8UbiA29uviXGpkJE4cZREzN'
    },
    {
      title: 'Sustainable Growth',
      desc: 'Analyzing long-term compound interest through the lens of forest regeneration and bio-diverse portfolios.',
      progress: 12,
      tag: 'Strategic',
      tagColor: 'bg-primary-container',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsCyK0ArCyDL520XrjvNw5QRwUoRbletm7I5cKbd6KLkWD5i_vLeAQs7_JhCyHRGpcG4rJzKX84R8Hl319TisiaF6w3uVIGyWjCkB1eb219EFSAEnOKPcYACGPm5CKPLHvmmIbneTtX0iHh0VLJg8s8VEbUuwoRQWLYDZO9e46lqu6JDN-MmUJwUNoA_F7h0kusgEkvrpm5y8dfpoZbPMvm9GB7nP--Xap5AC_iyQEDFlsB3fvDUGJB5aP5bzrnMnmZrBona2LrC9P'
    },
    {
      title: 'Valuation Basics',
      desc: 'Master the bedrock of financial analysis. Establishing value in volatile environments with structural integrity.',
      progress: 0,
      tag: 'Core',
      tagColor: 'bg-secondary',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXK7uF4FPqvEoytt9GFTfI5v6-vlrFhckwkMx827XmTAmGY1amzY5ySVCEJGvo4n8FreHm1SKrGyRvwD9Yz7PnT1EoPpBNR2tIle7nQx-cz_xcCAD0X6LcnCwCPUFLsijSamJVPYnSFBh1CS1cGW-QRZ5W1wxxWHv-KhFaaqEawSn2XDz2Hu4_roYoo55-EUh6a4sWbtNQWe8AXdoUPFwx2pioil-Al8fpvS8u4jc9EVi2vXGFURmlDxadaQkyuH3WFiKtQxWfHPU'
    }
  ];

  return (
    <Layout>
      <section className="px-12 py-12 max-w-[1600px] mx-auto w-full transition-all duration-500 ease-in-out">
        {/* Hero Header */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <h2 className="font-headline text-primary leading-tight mb-4 tracking-tight" style={{ fontSize: '3.5rem' }}>
              Cultivate Your <br/>Financial Ecosystem
            </h2>
            <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed font-body">
              Master the rhythmic cycles of wealth with our curated educational paths, designed to bridge nature's wisdom with market precision.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <div className="p-3 bg-secondary-container rounded-full text-secondary">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div>
                <span className="block font-headline text-xl font-bold text-primary tracking-tight">12.4%</span>
                <span className="text-xs text-stone-500 uppercase tracking-widest font-body font-bold">Knowledge Growth Index</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-medium shadow-md shadow-primary/20">All Courses</button>
            <button className="bg-surface-container-low text-on-surface-variant px-6 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors">Sustainable Finance</button>
            <button className="bg-surface-container-low text-on-surface-variant px-6 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors">Risk Management</button>
            <button className="bg-surface-container-low text-on-surface-variant px-6 py-2 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors">Valuation Basics</button>
          </div>
          <div className="flex items-center gap-2 text-stone-500 font-body">
            <span className="text-sm font-medium">Sort by:</span>
            <button className="flex items-center gap-1 text-primary font-bold text-sm hover:translate-y-[-1px] transition-transform">
              Recent Activity <span className="material-symbols-outlined text-xs">expand_more</span>
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.title} className="group relative bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-outline-variant/5">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={course.title} 
                  src={course.img}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className={`absolute top-4 left-4 ${course.tagColor} text-white text-[10px] uppercase tracking-tighter px-3 py-1 rounded-full font-bold`}>{course.tag}</span>
              </div>
              <div className="p-8">
                <h3 className="font-headline text-xl font-bold text-primary mb-3">{course.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6 font-body">
                  {course.desc}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-500 font-body">
                    <span>{course.progress > 0 ? 'Progress' : 'Not Started'}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Featured Course Card */}
          <div className="lg:col-span-2 group relative bg-surface-container p-1 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-outline-variant/10">
            <div className="flex flex-col md:flex-row h-full bg-surface-container-lowest rounded-lg overflow-hidden">
              <div className="md:w-1/2 overflow-hidden relative h-48 md:h-auto">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Featured Course" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMwKeEGSdGfhaj7NwG3RaRSKHmL0BxD6kS-OYAdtSn0Jd5k1FamKOTO4p84D0RYxGfFjAH1UYt6scaxIJYrqQWQdVRidlG4a91OA51lYjJAp-6ZBUBcIMpTxN0cgT6Za9RDdggW0IqPxloXSdJPkHzQx6IKxlHOQd5p2dLjbOgGGn5hTJMcPq1WXkwkBNMpXmhzbpdDp07iX21646wplrdH7qjnIXzfNI6Vs7go_YUJgg3-a05JMh5W56q_Q7SJFfs1my-L_F2Tt0G"
                />
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <span className="text-tertiary font-bold text-xs uppercase tracking-[0.2em] mb-4 font-body">Featured Course</span>
                <h3 className="font-headline text-3xl font-black text-primary mb-4 leading-tight">Advanced Portfolio Ecology</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8 font-body">
                  A masterclass in rebalancing risk. Learn how to protect your assets against sudden 'flood' events in the global economy.
                </p>
                <button className="w-fit px-8 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:translate-y-[-2px] hover:shadow-xl transition-all">
                  Resume Module
                </button>
              </div>
            </div>
          </div>

          {/* Mini Stats Card */}
          <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between border border-outline-variant/10">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-2">Pantanal Insights</h3>
              <p className="text-sm text-stone-600 mb-6 font-body">Short, daily lessons on market seasonality and asset migration patterns.</p>
            </div>
            <div className="flex -space-x-3 items-center">
              {[
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAlnH0d9LuhbJNmMilysWpBEAusB5ilAr36NPRSmc1m5Ei7u6VYOkSr9Hc-l6oPoskwEqBHsuh3xe2SH3Dhkk6tWiuJ8YIEIhvirasTfP1mOgtZtX_7Ubu7X2jyF6S1a7Gf6OPmd4dxBWveyjEeFp-yUoaaKR2Yra4EYQWURePGQodC6cvX2AMNwTtlAXOl8ILsKjZFM7ohm01ji3nBJyhDHQFP4GI1ownEPmFV_jpbZUa-ihmtDL94Ae3tyIFCI6CS8NIwcLOUNqLr',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDKi0YeSDqA16Ez8e3ZxlT7miaLy7Gjg7O66nqb2UMNAa5m9v878rybGgwyn7YF-XHVwJf8NR8119m1Mb84Qnyold9wJ0bqcrv87BezlEsGckwh1g-RHMRng8213DKWUKgyFsHjUCT4mhFpWtp_BfP8RH7UndFWzrF5xrVAajIV8Q7UY3r3f5e0Ygff12UO4UVzPcBbnsBAxDdelrVQ9awxIRyCMUE744_4XgmQDO0Mcwr7K0VKKNESs3lbNs5ccYWP2cAN38F_PfLt',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCncyPLKE7T6eqlWlWokMp-FHrVkBB-1kQdfK6shCIbwikl4RYoipfPlS8WULOYEgGtrwJJZ42XlN-n0A3Ua4bEQ9alUMzSwaBrbQYZFWWx4lIZGpc-O5NRNyIvZEdPLNBo6E1UHRNnbF51mDPWejWDZxZ1BnsgL9FGe-RWmG8s3PaiNEvJY7MUTnXX3mMj1DJfZ5YZGKv5lACV8aTzv8rOIY0WBbYkhPHseU5Hruo4e38nNZVXD3To8Rr7l_UaZ-BKxSVQwhFUdkBK'
              ].map((img, i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-surface object-cover" alt={`Student ${i}`} src={img}/>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center text-[10px] font-bold text-primary-container">+42</div>
              <span className="ml-6 text-xs text-stone-500 font-bold font-body">Joined this week</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Education;
