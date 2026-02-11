
import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-[#2C1810]/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#FDF8F5] h-full shadow-2xl flex flex-col p-8">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-3xl luxury-serif">Your Curated Collection</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#F5E9E2] rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-[#A67B5B] italic mb-6">Your collection is currently empty.</p>
              <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest border-b border-[#2C1810]">Discover Pieces</button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#F5E9E2]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="luxury-serif text-lg">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-[#2C1810]/40 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-[#A67B5B] mb-2">{item.material}</p>
                    <p className="font-bold">${item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[#F5E9E2]">
            <div className="flex justify-between items-end mb-8">
              <span className="text-sm font-bold uppercase tracking-widest text-[#A67B5B]">Investment Total</span>
              <span className="text-3xl luxury-serif">${total.toLocaleString()}</span>
            </div>
            <button className="w-full py-6 bg-[#8D4E3F] text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 group">
              Proceed to Checkout
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
