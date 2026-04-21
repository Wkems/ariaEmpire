import { TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { getAssetPath } from '@/lib/utils';

export function BentoHero() {
  const { setCurrentView } = useApp();
  const featuredProduct = products.find(p => p.featured) || products[0];

  const handleFeaturedClick = () => {
    setCurrentView('products');
  };

  return (
    <section className="px-4 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-6 min-h-[750px]">
        {/* Hero Tile - Large */}
        <div className="md:col-span-2 md:row-span-6 bento-card group relative overflow-hidden flex flex-col p-10 md:p-12">
          <div className="absolute top-0 right-0 p-12 w-1/2 h-full opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
             <TrendingUp className="w-full h-full text-aria-orange" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[1px] w-8 bg-aria-orange"></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-aria-orange">
                Featured Affiliate Hub
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-[1.1] tracking-tight">
              Scale Your <br /> 
              <span className="text-aria-orange">Digital Empire</span> <br />
              With Precision.
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-md leading-relaxed">
              The high-end marketplace for digital marketers. Hand-picked tools, verified commissions, and professional growth.
            </p>
            
            <div className="mt-auto">
                <div className="flex items-center gap-4 p-4 border border-border bg-gray-50 mb-6">
                    <img src={getAssetPath(featuredProduct.image)} alt="" className="w-16 h-16 object-cover border border-border" />
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Top Performer</p>
                        <p className="font-bold text-black">{featuredProduct.title}</p>
                    </div>
                </div>
                <Button 
                    onClick={handleFeaturedClick}
                    className="bg-black hover:bg-aria-orange text-white px-8 h-14 font-bold text-base transition-all flex items-center gap-3"
                >
                    Get Started <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
          </div>
        </div>

        {/* Categories Tile - Medium */}
        <div className="md:col-span-2 md:row-span-3 bento-card p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-black tracking-tight">Hub Categories</h2>
            <Button variant="link" className="text-aria-orange font-bold p-0 h-auto hover:no-underline hover:text-black transition-colors">View All</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            {[
              { name: 'Advertising', count: 12, color: 'bg-blue-50 text-blue-600' },
              { name: 'SaaS Tools', count: 24, color: 'bg-purple-50 text-purple-600' },
              { name: 'Marketing', count: 18, color: 'bg-orange-50 text-orange-600' },
              { name: 'Analytics', count: 9, color: 'bg-green-50 text-green-600' }
            ].map((cat) => (
              <div key={cat.name} className="p-5 border border-border hover:border-black transition-all group flex flex-col bg-gray-50/50 hover:bg-white">
                <span className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <TrendingUp className="w-5 h-5" />
                </span>
                <p className="font-bold text-black text-lg">{cat.name}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{cat.count} Products</p>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Stats Tile - Small / Wide */}
        <div className="md:col-span-2 md:row-span-2 bento-card p-10 grid grid-cols-3 gap-8 items-center bg-black text-white">
          <div className="space-y-2">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Network Earnings</p>
            <p className="text-4xl font-bold tracking-tight">$12.4k</p>
            <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                <TrendingUp className="w-3 h-3" /> +14%
            </div>
          </div>
          <div className="space-y-2 border-l border-white/10 pl-8">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Active Affiliates</p>
            <p className="text-4xl font-bold tracking-tight">1,280</p>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-bold font-mono">
                <Users className="w-3 h-3" /> GROWTH
            </div>
          </div>
          <div className="space-y-2 border-l border-white/10 pl-8">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Avg. Commission</p>
            <p className="text-4xl font-bold tracking-tight">45%</p>
            <div className="flex items-center gap-1 text-aria-orange text-xs font-bold">
                <DollarSign className="w-3 h-3" /> HIGH YIELD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
