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
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
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
  formatPrice: (price: number) => string;
}

// Admin password: "adminempire004"

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Products
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch and persist products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching products:', error);
      } else if (data && data.length > 0) {
        setProducts(data);
      } else if (data && data.length === 0) {
        // Seed initial products to Supabase
        const { data: seededData, error: seedError } = await supabase.from('products').insert(initialProducts).select();
        if (seedError) {
          console.error('Error seeding products:', seedError);
          setProducts(initialProducts); // fallback
        } else if (seededData) {
          setProducts(seededData);
        }
      }
    }
    
    fetchProducts();
  }, []);
  
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
  const [affiliateStats] = useState<number>(() => {
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
  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProduct = {
      ...product,
      rating: 0,
      reviews: 0
    };
    const { data, error } = await supabase.from('products').insert(newProduct).select().single();
    if (data) {
      setProducts(prev => [...prev, data]);
    } else if (error) {
      console.error('Error adding product:', error);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
    if (data) {
      setProducts(prev => prev.map(p => p.id === id ? data : p));
    } else if (error) {
      console.error('Error updating product:', error);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    } else {
      console.error('Error deleting product:', error);
    }
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
      return { success: false, message: error.message };
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata.name || data.user.email?.split('@')[0] || 'User',
        purchasedProducts: [],
        hoursLearned: 0
      });
      return { success: true };
    }
    return { success: false, message: 'An unexpected error occurred during login.' };
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
      return { success: false, message: error.message };
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return { success: false, message: 'Email address is already in use.' };
    }

    if (data.session) {
      setUser({
        id: data.session.user.id,
        email: data.session.user.email || '',
        name: name,
        purchasedProducts: [],
        hoursLearned: 0
      });
      return { success: true };
    } else if (data.user) {
      return { success: true, message: 'Please check your email to confirm your account.' };
    }
    return { success: false, message: 'An unexpected error occurred during signup.' };
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

  const formatPrice = useCallback((price: number) => {
    return `₦${price.toLocaleString()}`;
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
      affiliateStats,
      formatPrice
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
