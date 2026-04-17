import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function FeaturedProduct() {
  const { setCurrentView, addToCart, products } = useApp();

  const featuredProduct = products.find(p => p.featured) || products[0];

  const handleBuyNow = () => {
    addToCart(featuredProduct);
    setCurrentView('products');
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="/featured_toolkit_cover.jpg"
          alt="Featured Product"
          className="w-full h-full object-cover"
        />
        {/* Clean solid overlay for text legibility */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex items-end pb-24 lg:pb-32">
        <div className="w-full px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left - Title */}
            <div className="max-w-3xl">
              <span className="font-label text-xs tracking-[0.2em] uppercase text-white/50 mb-4 block">
                Featured Product
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95] tracking-tight">
                The Complete Marketing Toolkit
              </h2>
            </div>

            {/* Right - Price & CTA */}
            <div className="lg:text-right">
              <div className="text-5xl lg:text-6xl font-display font-bold text-aria-pink mb-4">
                ${featuredProduct.price}
              </div>
              <Button
                onClick={handleBuyNow}
                size="lg"
                className="bg-aria-pink hover:bg-aria-pink/90 text-white px-8"
              >
                Buy Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="mt-3 text-white/40 text-sm">
                One-time purchase • Instant download
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
