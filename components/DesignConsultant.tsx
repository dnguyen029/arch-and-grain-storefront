
import React, { useState } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getDesignAdvice } from '../services/geminiService';
import { Product } from '../types';

interface DesignConsultantProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onViewProduct: (id: string) => void;
}

const DesignConsultant: React.FC<DesignConsultantProps> = ({ isOpen, onClose, products, onViewProduct }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<{ recommendation: string; suggestedProductIds: string[] } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await getDesignAdvice(input);
    setAdvice(result);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-[#2C1810]/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#FDF8F5] h-full shadow-2xl flex flex-col p-8 m3-surface transition-transform duration-500 transform translate-x-0">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-3xl luxury-serif flex items-center gap-2">
              <Sparkles className="text-[#8D4E3F]" />
              Design Consultant
            </h3>
            <p className="text-sm text-[#A67B5B] mt-2 italic">A personalized aesthetic vision by Arch & Grain</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-8">
          {!advice && !loading && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[#F5E9E2] rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Sparkles size={32} className="text-[#8D4E3F]" />
              </div>
              <p className="text-lg text-[#2C1810]/70 italic mb-8">
                "Tell me about your bathroom space, your preferred materials, or the mood you wish to create."
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Modern Minimalist', 'Small Master Bath', 'Warm Oak Textures'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setInput(tag)}
                    className="px-4 py-2 border border-[#D9B382] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D9B382] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-[#8D4E3F]">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="text-sm font-bold uppercase tracking-widest">Architecting your vision...</p>
            </div>
          )}

          {advice && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F5E9E2]">
                <p className="text-lg leading-relaxed text-[#2C1810]/90 font-light">
                  {advice.recommendation}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#A67B5B]">Recommended Artifacts</h4>
                <div className="grid grid-cols-2 gap-4">
                  {advice.suggestedProductIds.map(id => {
                    const product = products.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={id} className="group cursor-pointer" onClick={() => onViewProduct(id)}>
                        <div className="aspect-square rounded-2xl overflow-hidden mb-2">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h5 className="text-sm font-bold luxury-serif">{product.name}</h5>
                        <p className="text-xs text-[#A67B5B]">${product.price.toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
                <button 
                  onClick={() => setAdvice(null)}
                  className="w-full py-3 border-2 border-[#D9B382] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D9B382] transition-colors mt-4"
                >
                  New Conversation
                </button>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g. I need a warm vanity for a small marble ensuite..."
            className="w-full bg-[#F5E9E2] border-none rounded-2xl py-6 px-8 pr-16 focus:ring-2 focus:ring-[#8D4E3F] text-[#2C1810] placeholder-[#2C1810]/40"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#8D4E3F] text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DesignConsultant;
