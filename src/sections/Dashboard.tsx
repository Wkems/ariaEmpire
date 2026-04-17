import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/custom/ProductCard';
import { useApp } from '@/context/AppContext';

export function Dashboard() {
  const { user, products, setCurrentView } = useApp();

  const purchasedProducts = products.filter(p => 
    user?.purchasedProducts.includes(p.id)
  );

  if (!user) {
    setCurrentView('login');
    return null;
  }

  return (
    <section className="relative min-h-screen w-full bg-white pt-24 pb-16">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-black tracking-tight mb-6">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xl text-black/60 max-w-2xl font-sans">
            Start your learning journey by browsing our products
          </p>
          
          <div className="mt-10">
            <Button
              onClick={() => setCurrentView('products')}
              className="bg-aria-pink hover:bg-aria-pink/90 text-white h-14 px-10 text-lg rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            >
              Browse Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Purchased Products */}
        {purchasedProducts.length > 0 && (
          <div className="mt-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {purchasedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  variant="dashboard" 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
