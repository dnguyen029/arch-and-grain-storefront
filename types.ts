
export interface Product {
  id: string; // Product ID
  variantId?: string; // Main variant ID for simple products, needed to add to cart
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Modern' | 'Traditional' | 'Minimalist' | 'Double' | 'Single';
  material: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DesignAdvice {
  recommendation: string;
  suggestedProducts: string[];
}
