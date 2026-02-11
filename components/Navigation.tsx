
import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenConsultant: () => void;
  onNavigate: (view: 'home' | 'shop' | 'process') => void;
}

const Navigation: React.FC<NavigationProps> = ({ cartCount, onOpenCart, onOpenMenu, onOpenSearch, onOpenConsultant, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#FDF8F5]/80 backdrop-blur-md border-b border-[#F5E9E2]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={onOpenMenu}
            className="p-2 hover:bg-[#F5E9E2] rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase">
            <button onClick={() => onNavigate('shop')} className="hover:text-[#8D4E3F] transition-colors">Collections</button>
            <button onClick={() => onNavigate('process')} className="hover:text-[#8D4E3F] transition-colors">Bespoke</button>
            <button onClick={() => onNavigate('process')} className="hover:text-[#8D4E3F] transition-colors">Story</button>
          </div>
        </div>

        <h1 
          onClick={() => onNavigate('home')}
          className="text-2xl font-bold tracking-tight luxury-serif absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-70 transition-opacity"
        >
          ARCH & GRAIN
        </h1>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenConsultant}
            className="hidden md:flex px-5 py-2.5 bg-[#D9B382] hover:bg-[#c9a372] text-[#2C1810] rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm"
          >
            Design Consultant
          </button>
          <button 
            onClick={onOpenSearch}
            className="p-2 hover:bg-[#F5E9E2] rounded-full transition-colors"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={onOpenCart}
            className="p-2 hover:bg-[#F5E9E2] rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#8D4E3F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
