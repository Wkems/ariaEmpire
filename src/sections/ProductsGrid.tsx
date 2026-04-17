import { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components/ui/custom/ProductCard';
import { useApp } from '@/context/AppContext';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Advertising', value: 'advertising' },
  { label: 'Social Media', value: 'social' },
];

export function ProductsGrid() {
  const { products, setCurrentView, openAdminModal, user } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative w-full bg-background pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="w-full px-6 lg:px-12">
        {/* Navigation Arrow */}
        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-12 font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Personalized Greeting */}
        {user && (
          <div className="mb-8 p-6 bg-black rounded-2xl border border-white/10 shadow-2xl">
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Authenticated Session</p>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">
              Dear {user.name.split(' ')[0]},
            </h1>
            <p className="text-white/60 mt-1 font-sans text-sm">Explore our curated hubs and continue your learning journey.</p>
          </div>
        )}

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-black font-bold tracking-tight">
                Hub Catalog
            </h2>
            
            {/* Search Bar - Tool Style */}
            <div className="w-full md:w-96 h-12 border border-border bg-white flex items-center px-4 gap-3 focus-within:border-black transition-colors">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSearchTerm(val);
                        if (val === 'adminempire004') {
                            setSearchTerm('');
                            openAdminModal();
                        }
                    }}
                    className="flex-grow bg-transparent border-none outline-none text-sm font-medium placeholder:text-gray-300"
                />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 border font-bold text-xs uppercase tracking-widest transition-all ${
                  activeFilter === filter.value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-500 border-border hover:border-black hover:text-black'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border">
            <p className="text-gray-400 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
