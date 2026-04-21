import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Star, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getAssetPath } from '@/lib/utils';

export function ProductDetail() {
  const { selectedProduct, setCurrentView, formatPrice } = useApp();

  if (!selectedProduct) {
    setCurrentView('products');
    return null;
  }

  return (
    <section className="relative min-h-screen w-full bg-background pt-24 pb-16 selection:bg-black selection:text-white">
      <div className="w-full px-6 lg:px-12">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('products')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Image */}
          <div className="relative aspect-video lg:aspect-square bento-card overflow-hidden">
            <img
              src={getAssetPath(selectedProduct.image)}
              alt={selectedProduct.title}
              className="w-full h-full object-cover"
            />
            
            {selectedProduct.bestseller && (
              <span className="absolute top-0 left-0 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest">
                Best Seller
              </span>
            )}
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-aria-orange">
                {selectedProduct.category}
              </span>
              <span className="text-gray-200">•</span>
              <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                {selectedProduct.rating} ({selectedProduct.reviews} reviews)
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl text-black font-bold tracking-tight mb-4 leading-tight">
              {selectedProduct.title}
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              {selectedProduct.description}
            </p>

            {/* What's Included */}
            {selectedProduct.whatsIncluded && (
              <div className="mb-8">
                <h3 className="text-black font-bold uppercase text-xs tracking-widest mb-4">
                  Feature Set
                </h3>
                <ul className="space-y-3">
                  {selectedProduct.whatsIncluded.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-500 text-sm">
                      <Check className="w-4 h-4 text-aria-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcomes */}
            {selectedProduct.outcomes && (
              <div className="mb-8">
                <h3 className="text-black font-bold uppercase text-xs tracking-widest mb-4">
                  Growth Outcomes
                </h3>
                <ul className="space-y-3">
                  {selectedProduct.outcomes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-500 text-sm">
                      <div className="w-1.5 h-1.5 bg-black" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="text-5xl font-bold text-gray-900 font-mono tracking-tighter">
                  {formatPrice(selectedProduct.price)}
                </div>
                <div className="h-10 w-px bg-gray-100 hidden sm:block" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-grow">
                <a
                  href={selectedProduct.sellerUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center justify-center bg-[#FF4F00] hover:bg-black text-white font-bold h-16 rounded-2xl transition-all px-8 text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  Access Seller Course
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
                </a>
                <Button
                  onClick={() => setCurrentView('products')}
                  variant="outline"
                  className="border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 font-bold h-16 px-8 rounded-2xl transition-all uppercase tracking-widest text-[10px]"
                >
                  Marketplace HUB
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
