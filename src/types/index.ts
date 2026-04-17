export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'beginner' | 'advanced' | 'advertising' | 'social' | 'toolkit';
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  bestseller?: boolean;
  creator?: string;
  commission?: number;
  sellerUrl?: string;
  whatsIncluded?: string[];
  outcomes?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  purchasedProducts: string[];
  hoursLearned: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ViewState = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'dashboard' 
  | 'login' 
  | 'signup'
  | 'admin';
