
import React from 'react';
import { X, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'shop' | 'process') => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#2C1810]/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-[#FDF8F5] z-[70] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22, 1, 0.36, 1)] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8D4E3F]">Navigation</span>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#F5E9E2] rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-8">
            {[
              { label: 'The Sanctuary', view: 'home', sub: 'The Home of Arch & Grain' },
              { label: 'The Shop', view: 'shop', sub: 'Explore our curated artifacts' },
              { label: 'Our Process', view: 'process', sub: 'How we marry Arch and Grain' },
              { label: 'Bespoke Inquiry', view: 'process', sub: 'Custom architectural solutions' }
            ].map((link, idx) => (
              <button 
                key={link.label}
                onClick={() => onNavigate(link.view as any)}
                className="group w-full text-left reveal active animate-in slide-in-from-left duration-700"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-end justify-between border-b border-[#2C1810]/5 pb-4 group-hover:border-[#8D4E3F] transition-colors">
                  <div>
                    <h3 className="text-4xl luxury-serif group-hover:text-[#8D4E3F] transition-colors">{link.label}</h3>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#2C1810]/40 mt-2">{link.sub}</p>
                  </div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#8D4E3F]" size={24} />
                </div>
              </button>
            ))}
          </nav>

          <div className="pt-12 border-t border-[#F5E9E2]">
            <div className="flex gap-6 mb-8 text-[#2C1810]/40">
              <Instagram size={20} className="hover:text-[#8D4E3F] cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-[#8D4E3F] cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-[#8D4E3F] cursor-pointer transition-colors" />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8D4E3F]">The Studio</h4>
              <p className="text-sm text-[#2C1810]/60 leading-relaxed font-light italic">
                124 Grain St, Pacific Northwest <br />
                studio@archandgrain.co
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;
