
import React, { useState, useMemo } from 'react';
import CategorySlider from './CategorySlider';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

interface ShopPageProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewProduct: (id: string) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ products, onAddToCart, onViewProduct }) => {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Products') return products;
    return products.filter(p => 
      p.category === activeCategory || 
      (activeCategory === 'Single Vanities' && p.category === 'Single') ||
      (activeCategory === 'Double Vanities' && p.category === 'Double')
    );
  }, [activeCategory, products]);

  return (
    <div className="bg-[#FDF8F5] min-h-screen pb-20">
      <header className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-[1px] bg-[#8D4E3F]"></div>
          </div>
          <h2 className="text-5xl md:text-8xl luxury-serif mb-8 reveal active">The Collections</h2>
          <p className="text-xl text-[#2C1810]/60 max-w-2xl mx-auto font-light leading-relaxed reveal active stagger-1">
            An exploration of material and form. Each series is designed to withstand the ritual of daily life while elevating the architectural soul of your home.
          </p>
        </div>
      </header>
      
      <CategorySlider activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      
      <div className="reveal active stagger-2 min-h-[600px]">
        <ProductGrid 
          products={filteredProducts} 
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
        />
        {filteredProducts.length === 0 && (
          <div className="text-center py-40">
            <p className="italic text-[#2C1810]/40">No pieces found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
