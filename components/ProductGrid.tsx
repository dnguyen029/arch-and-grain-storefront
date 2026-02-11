
import React from 'react';
import { Product } from '../types';
import { ArrowUpRight, Eye, Plus } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewProduct: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onViewProduct }) => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {products.map((product, idx) => (
          <div 
            key={product.id} 
            className={`group reveal active stagger-${(idx % 3) + 1}`}
          >
            {/* Expressive M3 Card Container */}
            <div 
              className="relative aspect-[3/4] mb-10 overflow-hidden rounded-t-[4rem] rounded-bl-[1rem] rounded-br-[4rem] bg-[#F5E9E2] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22, 1, 0.36, 1)]"
              onClick={() => onViewProduct(product.id)}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-[2s] group-hover:scale-110"
              />
              
              {/* Refined Quick Actions */}
              <div className="absolute inset-0 bg-[#2C1810]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-8 right-8">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#2C1810] shadow-xl hover:bg-[#D9B382] transition-colors scale-0 group-hover:scale-100 duration-500 delay-100"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="absolute bottom-8 left-8">
                <div className="bg-[#2C1810] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  Hand Finished
                </div>
              </div>
            </div>

            {/* Architectural Info Block */}
            <div className="px-4">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="text-3xl luxury-serif mb-1 group-hover:text-[#8D4E3F] transition-colors">{product.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A67B5B]">
                    {product.material} • {product.category} Series
                  </p>
                </div>
                <div className="text-2xl font-light tracking-tighter text-[#2C1810]/60">
                  ${product.price.toLocaleString()}
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-[#2C1810]/5 mb-6 group-hover:w-full w-8 transition-all duration-700"></div>
              
              <button 
                onClick={() => onViewProduct(product.id)}
                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C1810]/40 group-hover:text-[#2C1810] transition-colors"
              >
                Inquire <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
