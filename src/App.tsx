import { useState, useEffect, useCallback } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { MiniNavbar } from '@/components/ui/mini-navbar';
import { ProductCard } from '@/components/ui/custom/ProductCard';
import { BentoHero } from '@/sections/BentoHero';
import { Benefits } from '@/sections/Benefits';
import { Testimonials } from '@/sections/Testimonials';
import { ProductsGrid } from '@/sections/ProductsGrid';
import { ProductDetail } from '@/sections/ProductDetail';
import { Auth } from '@/sections/Auth';
import { GhostAdmin, AdminAccessModal } from '@/sections/GhostAdmin';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

// Secret knock detection component
function GhostAdminTrigger({ onTrigger }: { onTrigger: () => void }) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret combo: Shift + Alt + A
      if (e.shiftKey && e.altKey && e.key === 'A') {
        onTrigger();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTrigger]);

  return null;
}

// Main App Content
function AppContent() {
  const { currentView, isAdmin, setCurrentView, products, onOpenAdminModal, authLoading } = useApp();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminAccessGranted, setAdminAccessGranted] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Register the admin modal trigger with the context
  useEffect(() => {
    onOpenAdminModal(() => setShowAdminModal(true));
  }, [onOpenAdminModal]);
  
  // Handle secret admin trigger
  const handleAdminTrigger = useCallback(() => {
    if (!isAdmin) {
      setShowAdminModal(true);
    }
  }, [isAdmin]);

  // Handle successful admin access
  const handleAdminSuccess = useCallback(() => {
    setShowAdminModal(false);
    setAdminAccessGranted(true);
    setCurrentView('admin');
  }, [setCurrentView]);

  // Handle unauthorized admin access redirect
  useEffect(() => {
    if (currentView === 'admin' && !adminAccessGranted) {
      setCurrentView('home');
    }
  }, [currentView, adminAccessGranted, setCurrentView]);

  // Destructure 3 featured products
  const homeFeaturedProducts = products.filter(p => p.featured).slice(0, 3);


  // Render current view
  const renderView = () => {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-aria-dark flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-aria-pink border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    // If admin access granted, show admin panel
    if (adminAccessGranted && isAdmin) {
      return <GhostAdmin />;
    }

    switch (currentView) {
      case 'home':
        return (
          <>
            <BentoHero />
            <Benefits />
            <Testimonials />
            
            {/* Featured Products Section - 3 Products max */}
            <section className="py-24 bg-background border-t border-border">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold text-black font-sans uppercase tracking-tight">Top performing Hubs</h2>
                  <button 
                    onClick={() => setCurrentView('products')}
                    className="text-aria-orange font-bold text-sm uppercase tracking-widest hover:underline"
                  >
                    Explore Hub Catalog
                  </button>
                </div>
                <div 
                  className="grid md:grid-cols-3 gap-4"
                  onClick={() => setCurrentView('products')}
                >
                  {homeFeaturedProducts.map(product => (
                    <div key={product.id} className="cursor-pointer">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <CTA />
          </>
        );
      case 'products':
        return <ProductsGrid />;
      case 'product-detail':
        return <ProductDetail />;
      case 'login':
        return <Auth mode="login" />;
      case 'signup':
        return <Auth mode="signup" />;
      case 'admin':
        return null;
      default:
        return (
          <>
            <BentoHero />
            <Benefits />
            <Testimonials />
            <section className="py-24 bg-background border-t border-border">
              <div className="max-w-7xl mx-auto px-6">
                 <div className="grid md:grid-cols-3 gap-4" onClick={() => setCurrentView('products')}>
                    {homeFeaturedProducts.map(product => <ProductCard key={product.id} product={product} /> )}
                 </div>
              </div>
            </section>
            <CTA />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      {!isAdmin && !authLoading && currentView === 'home' && <MiniNavbar />}
      
      {/* Main Content */}
      <main className={cn(
        "relative",
        (!authLoading && currentView === 'home') && "pt-24 sm:pt-32"
      )}>
        {renderView()}
      </main>
      
      {/* Footer - hidden when admin, login, signup or products is active */}
      {!isAdmin && !authLoading && !['login', 'signup', 'products'].includes(currentView) && <Footer />}
      
      {/* Ghost Admin Trigger */}
      {!authLoading && <GhostAdminTrigger onTrigger={handleAdminTrigger} />}
      
      {/* Admin Access Modal */}
      <AdminAccessModal 
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={handleAdminSuccess}
      />
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

// App with Provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
