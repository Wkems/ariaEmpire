import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'dashboard';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { user, setSelectedProduct, setCurrentView, incrementClicks, formatPrice } = useApp();

  const isPurchased = user?.purchasedProducts.includes(product.id);
  const commission = product.commission || 50;
  const creator = product.creator || "Aria Empire";

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    incrementClicks();
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  if (variant === 'dashboard') {
    return (
      <div 
        onClick={handleViewDetails}
        className="bento-card group cursor-pointer overflow-hidden"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-black truncate">{product.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{product.category}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-black">{formatPrice(product.price)}</span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600" />
              Purchased
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleViewDetails}
      className="group bento-card cursor-pointer flex flex-col h-full"
    >
      <div className="aspect-video overflow-hidden relative border-b border-border">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.bestseller && (
          <span className="absolute top-0 left-0 px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest z-10">
            Best Seller
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-black text-base mb-1 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>
        <p className="text-gray-400 text-xs mb-4">
          by {creator}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <span className="text-xl font-bold text-black">{formatPrice(product.price)}</span>
            <div className="bg-[#00C853] text-white px-2 py-1 text-[10px] font-bold uppercase">
              Commission {commission}%
            </div>
          </div>
          
          {isPurchased ? (
            <div className="w-full py-2 bg-gray-100 text-gray-500 text-center text-sm font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              PROMOTING
            </div>
          ) : (
            <Button
              onClick={handleViewDetails} // Change trigger from handleAddToCart to handleViewDetails
              className="w-full bg-[#000080] hover:bg-black text-white font-bold text-sm h-10 rounded-none transition-colors"
            >
              View Product Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
