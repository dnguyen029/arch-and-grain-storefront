
import React from 'react';
import { Product } from '../types';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, Ruler } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  return (
    <div className="bg-[#FDF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2C1810]/60 hover:text-[#2C1810] transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Gallery Side */}
          <div className="space-y-6 reveal active">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#F5E9E2] shadow-2xl group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-[#F5E9E2] opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <img src={product.image} className="w-full h-full object-cover" alt="Detail view" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Side */}
          <div className="lg:sticky lg:top-32 reveal active stagger-1">
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8D4E3F] mb-4 block">
                {product.category} Series
              </span>
              <h2 className="text-5xl md:text-7xl luxury-serif mb-6 leading-tight">{product.name}</h2>
              <p className="text-3xl font-light text-[#2C1810]/80">${product.price.toLocaleString()}</p>
            </div>

            <p className="text-lg text-[#2C1810]/70 leading-relaxed mb-12 max-w-lg">
              {product.description} Crafted from select {product.material}, this unit embodies our commitment to architectural integrity and tactile warmth.
            </p>

            <div className="flex flex-col gap-4 mb-12">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full py-6 bg-[#2C1810] text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform active:scale-95 group"
              >
                <ShoppingBag size={18} className="group-hover:animate-bounce" />
                Reserve For My Project
              </button>
              <button className="w-full py-6 border border-[#2C1810]/10 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] text-[#2C1810]/60 hover:bg-[#F5E9E2] transition-all">
                Download Technical Specs (DWG/PDF)
              </button>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-t border-[#2C1810]/10">
              <div className="flex gap-4">
                <Ruler className="text-[#8D4E3F] shrink-0" size={20} />
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest mb-1">Dimensions</h5>
                  <p className="text-sm text-[#2C1810]/60">72"W x 22"D x 34"H</p>
                </div>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-[#8D4E3F] shrink-0" size={20} />
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest mb-1">Warranty</h5>
                  <p className="text-sm text-[#2C1810]/60">30-Year structural guarantee</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Truck className="text-[#8D4E3F] shrink-0" size={20} />
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest mb-1">Delivery</h5>
                  <p className="text-sm text-[#2C1810]/60">White glove nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
