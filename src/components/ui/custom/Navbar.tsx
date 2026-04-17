import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

export function Navbar() {
  const { setCurrentView, cartCount, user, currentView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Products', view: 'products' as const },
    { label: 'Learn', view: 'products' as const },
    { label: 'Dashboard', view: 'dashboard' as const, requiresAuth: true },
  ];

  const handleNavClick = (view: string, requiresAuth?: boolean) => {
    if (requiresAuth && !user) {
      setCurrentView('login');
    } else {
      setCurrentView(view as any);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Aria Empire" className="h-8 w-auto border border-border p-1" />
            <span className="font-bold text-xl tracking-tight text-black">
              Aria Empire
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view, item.requiresAuth)}
                className={`text-sm font-bold uppercase transition-colors ${
                  currentView === item.view 
                    ? 'text-aria-orange' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={() => setCurrentView('products')}
              className="relative p-2 text-gray-400 hover:text-black transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-aria-orange text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="p-2 text-gray-400 hover:text-black transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentView('login')}
                className="hidden md:flex bg-black hover:bg-aria-orange text-white"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view, item.requiresAuth)}
                  className="text-sm font-bold uppercase text-gray-500 hover:text-black text-left"
                >
                  {item.label}
                </button>
              ))}
              {!user && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentView('login');
                    setMobileMenuOpen(false);
                  }}
                  className="border-white/20 text-white hover:bg-white/10 w-full"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
