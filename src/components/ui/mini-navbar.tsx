"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Menu, X, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

const AnimatedNavLink = ({ onClick, children, active }: { onClick: () => void; children: React.ReactNode; active?: boolean }) => {
  const defaultTextColor = active ? 'text-aria-orange' : 'text-gray-300';
  const hoverTextColor = 'text-white';
  const textSizeClass = 'text-sm font-bold uppercase tracking-wider';

  return (
    <button 
      onClick={onClick} 
      className={`group relative overflow-hidden h-5 ${textSizeClass} transition-colors`}
    >
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform group-hover:-translate-y-1/2">
        <span className={`${defaultTextColor} h-5 flex items-center`}>{children}</span>
        <span className={`${hoverTextColor} h-5 flex items-center`}>{children}</span>
      </div>
    </button>
  );
};

export function MiniNavbar() {
  const { setCurrentView, cartCount, user, currentView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<any>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-2xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const navLinksData = [
    { label: 'Products', view: 'products' as const },
    { label: 'Dashboard', view: 'dashboard' as const, requiresAuth: true },
  ];

  const handleNavClick = (view: string, requiresAuth?: boolean) => {
    if (requiresAuth && !user) {
      setCurrentView('login');
    } else {
      setCurrentView(view as any);
    }
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                       flex flex-col items-center
                       px-6 py-3 backdrop-blur-md
                       ${headerShapeClass}
                       border border-white/10 bg-black/80
                       w-[calc(100%-2rem)] sm:w-auto lg:w-[95%] lg:max-w-7xl
                       transition-[border-radius] duration-300 ease-in-out shadow-2xl overflow-hidden`}>

      <div className="flex items-center justify-between w-full gap-x-8 sm:gap-x-12">
        {/* Logo */}
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Aria Empire" className="h-6 w-auto border border-white/20 p-0.5" />
          <span className="font-bold text-base tracking-tight text-white">
            Aria Empire
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinksData.map((link) => (
            <AnimatedNavLink 
              key={link.label} 
              onClick={() => handleNavClick(link.view, link.requiresAuth)}
              active={currentView === link.view}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={() => setCurrentView('products')}
            className="group relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="flex flex-col h-5 overflow-hidden">
                <div className="transition-transform duration-300 group-hover:-translate-y-full">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="transition-transform duration-300 group-hover:-translate-y-full">
                    <ShoppingBag className="w-5 h-5 text-aria-orange" />
                </div>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-aria-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </button>

          {/* User / Login */}
          {user ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="p-1.5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/30 transition-all bg-white/5"
            >
              <User className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setCurrentView('login')}
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
                >
                    Login
                </button>
                <button 
                    onClick={() => setCurrentView('signup')}
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black bg-white rounded-full hover:bg-aria-orange hover:text-white transition-all transform hover:scale-105"
                >
                    Signup
                </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[500px] opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-6 w-full border-t border-white/5 pt-6">
          {navLinksData.map((link) => (
            <button 
              key={link.label} 
              onClick={() => handleNavClick(link.view, link.requiresAuth)}
              className={`text-lg font-bold uppercase tracking-widest ${currentView === link.view ? 'text-aria-orange' : 'text-gray-400'} hover:text-white transition-colors`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="flex flex-col items-center gap-4 w-full pt-4">
             <button 
                onClick={() => setCurrentView('products')}
                className="flex items-center gap-3 text-gray-300 hover:text-white font-bold"
             >
                <ShoppingCart className="w-5 h-5" /> Cart ({cartCount})
             </button>
             
             {!user ? (
                 <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    <Button variant="outline" onClick={() => setCurrentView('login')} className="border-white/10 text-white hover:bg-white/5">
                        Login
                    </Button>
                    <Button onClick={() => setCurrentView('signup')} className="bg-white text-black hover:bg-aria-orange hover:text-white">
                        Signup
                    </Button>
                 </div>
             ) : (
                <Button variant="outline" onClick={() => setCurrentView('dashboard')} className="border-white/10 text-white w-full max-w-[200px]">
                    Dashboard
                </Button>
             )}
          </div>
        </nav>
      </div>
    </header>
  );
}
