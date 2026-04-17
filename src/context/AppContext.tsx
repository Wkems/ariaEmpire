import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product, CartItem, User, ViewState } from '@/types';
import { products as initialProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';

interface AppContextType {
  // Navigation
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // User
  user: User | null;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  purchaseProduct: (productId: string) => void;
  
  // Admin - Ghost System
  isAdmin: boolean;
  adminAttempts: number;
  isLocked: boolean;
  lockTimeRemaining: number;
  attemptAdminAccess: (password: string) => boolean;
  logoutAdmin: () => void;
  lastActivity: number;
  updateLastActivity: () => void;
  openAdminModal: () => void;
  onOpenAdminModal: (callback: () => void) => void;
  totalClicks: number;
  incrementClicks: () => void;
  affiliateStats: number;
}

// Admin password: "adminempire004"

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aria_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Persist products
  useEffect(() => {
    localStorage.setItem('aria_products', JSON.stringify(products));
  }, [products]);
  
  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // User
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Analytics & Stats
  const [totalClicks, setTotalClicks] = useState<number>(() => {
    const saved = localStorage.getItem('aria_total_clicks');
    return saved ? parseInt(saved) : 0;
  });
  const [affiliateStats, setAffiliateStats] = useState<number>(() => {
    const saved = localStorage.getItem('aria_affiliate_stats');
    return saved ? parseFloat(saved) : 0;
  });

  // Persist Stats
  useEffect(() => {
    localStorage.setItem('aria_total_clicks', totalClicks.toString());
  }, [totalClicks]);

  useEffect(() => {
    localStorage.setItem('aria_affiliate_stats', affiliateStats.toString());
  }, [affiliateStats]);

  const incrementClicks = useCallback(() => {
    setTotalClicks(prev => prev + 1);
  }, []);
  
  // Listen for auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
          purchasedProducts: [],
          hoursLearned: 0
        });
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
          purchasedProducts: [],
          hoursLearned: 0
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Admin - Ghost System
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAttempts, setAdminAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [adminModalCallback, setAdminModalCallback] = useState<(() => void) | null>(null);


  // Admin auto-logout after 5 minutes of inactivity
  useEffect(() => {
    if (!isAdmin) return;
    
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 5 * 60 * 1000) {
        logoutAdmin();
        setCurrentView('home');
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAdmin, lastActivity]);

  // Lock timer countdown
  useEffect(() => {
    if (!isLocked || lockTimeRemaining <= 0) return;
    
    const interval = setInterval(() => {
      setLockTimeRemaining(prev => {
        if (prev <= 1) {
          setIsLocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isLocked, lockTimeRemaining]);

  const updateLastActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Product management
  const addProduct = useCallback((product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      rating: 0,
      reviews: 0
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  // Cart management
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // User management
  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return false;
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata.name || data.user.email?.split('@')[0] || 'User',
        purchasedProducts: [],
        hoursLearned: 0
      });
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      console.error('Signup error:', error.message);
      return false;
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        name: name,
        purchasedProducts: [],
        hoursLearned: 0
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCart([]);
  }, []);

  const purchaseProduct = useCallback((productId: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        purchasedProducts: [...prev.purchasedProducts, productId]
      };
    });
  }, []);

  // Admin - Ghost System
  const attemptAdminAccess = useCallback((password: string) => {
    if (isLocked) return false;
    
    // For demo purposes, check against plain password
    const isCorrect = password === 'adminempire004';
    
    if (isCorrect) {
      setIsAdmin(true);
      setAdminAttempts(0);
      setLastActivity(Date.now());
      return true;
    } else {
      const newAttempts = adminAttempts + 1;
      setAdminAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTimeRemaining(60);
      }
      return false;
    }
  }, [adminAttempts, isLocked]);

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
    setAdminAttempts(0);
    setCurrentView('home');
  }, []);

  const onOpenAdminModal = useCallback((callback: () => void) => {
    setAdminModalCallback(() => callback);
  }, []);

  const openAdminModal = useCallback(() => {
    if (adminModalCallback) {
      adminModalCallback();
    }
  }, [adminModalCallback]);

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      selectedProduct,
      setSelectedProduct,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount,
      user,
      authLoading,
      login,
      signup,
      logout,
      purchaseProduct,
      isAdmin,
      adminAttempts,
      isLocked,
      lockTimeRemaining,
      attemptAdminAccess,
      logoutAdmin,
      lastActivity,
      updateLastActivity,
      openAdminModal,
      onOpenAdminModal,
      totalClicks,
      incrementClicks,
      affiliateStats
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
