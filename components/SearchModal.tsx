
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProduct: (id: string) => void;
  products: Product[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onViewProduct, products }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.material.toLowerCase().includes(lowerQuery)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#FDF8F5] animate-in fade-in duration-500">
      <div className="h-20 px-6 flex items-center justify-between border-b border-[#F5E9E2]">
        <div className="flex items-center gap-4 flex-1">
          <SearchIcon size={24} className="text-[#2C1810]/40" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search our artifacts..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-2xl luxury-serif text-[#2C1810] placeholder:text-[#2C1810]/20"
          />
        </div>
        <button 
          onClick={onClose}
          className="p-4 hover:bg-[#F5E9E2] rounded-full transition-colors"
        >
          <X size={28} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {!query.trim() ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="reveal active">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8D4E3F] mb-8">Quick Navigation</h3>
                <div className="space-y-6">
                  {['White Oak', 'Marble', 'Concrete', 'Double Vanities', 'Floating Units'].map((term) => (
                    <button 
                      key={term}
                      onClick={() => setQuery(term)}
                      className="block text-4xl luxury-serif hover:text-[#8D4E3F] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div className="reveal active stagger-1 bg-[#F5E9E2] rounded-[3rem] p-12 flex flex-col justify-end min-h-[400px]">
                <h4 className="text-3xl luxury-serif mb-4">Finding the right grain.</h4>
                <p className="text-sm text-[#2C1810]/60 leading-relaxed mb-8">
                  Our studio specializes in a wide range of organic materials and architectural forms. Use the search to find specific materials or configurations.
                </p>
                <div className="w-12 h-[1px] bg-[#2C1810]"></div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-12">
                <h3 className="text-3xl luxury-serif">Results for "{query}"</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C1810]/40">{results.length} Pieces found</span>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {results.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => onViewProduct(product.id)}
                      className="group cursor-pointer bg-white p-6 rounded-[2rem] border border-[#F5E9E2] hover:shadow-2xl hover:scale-[1.02] transition-all"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-[#FDF8F5]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                      </div>
                      <h4 className="text-xl luxury-serif mb-2">{product.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#8D4E3F] mb-4">{product.material}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium tracking-tight">${product.price.toLocaleString()}</span>
                        <ArrowRight size={18} className="text-[#2C1810]/20 group-hover:text-[#8D4E3F] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-40 text-center">
                  <p className="text-2xl luxury-serif italic text-[#2C1810]/40 mb-4">"Silence in the studio."</p>
                  <p className="text-sm text-[#2C1810]/40 uppercase tracking-widest">No matching pieces were found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
