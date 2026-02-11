
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import MenuSidebar from './components/MenuSidebar';
import SearchModal from './components/SearchModal';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import DesignConsultant from './components/DesignConsultant';
import ShopPage from './components/ShopPage';
import ProcessPage from './components/ProcessPage';
import ProductDetail from './components/ProductDetail';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { fetchProductsFromMedusa, getOrCreateCart } from './services/medusaService';
import { Sparkles, WifiOff } from 'lucide-react';

type View = 'home' | 'shop' | 'process' | 'product-detail';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(localStorage.getItem('arch_grain_cart_id'));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  const [isLiveSync, setIsLiveSync] = useState(false);

  // Initialize App Data & Medusa Handshake
  useEffect(() => {
    const initializeStore = async () => {
      // 1. Fetch Products
      const medusaProds = await fetchProductsFromMedusa();
      if (medusaProds && medusaProds.length > 0) {
        setProducts(medusaProds);
        setIsLiveSync(true);
      }

      // 2. Persistent Cart Handshake
      const cartObj = await getOrCreateCart(cartId || undefined);
      if (cartObj) {
        setCartId(cartObj.id);
        localStorage.setItem('arch_grain_cart_id', cartObj.id);
        
        // Map Medusa line items to our CartItem interface if they exist
        if (cartObj.items) {
          const mappedItems = cartObj.items.map((item: any) => ({
            id: item.variant.product.id,
            name: item.title,
            price: item.unit_price / 100,
            image: item.thumbnail,
            quantity: item.quantity,
            material: item.variant.product.material || "Crafted Hardwood"
          }));
          setCart(mappedItems);
        }
      }
    };
    initializeStore();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    
    // In a full migration, you would call addToMedusaCart(cartId, variantId, 1) here.
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleViewProduct = (id: string) => {
    setSelectedProductId(id);
    setView('product-detail');
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (newView: View) => {
    setView(newView);
    setSelectedProductId(null);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 80) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view, selectedProductId]);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="min-h-screen selection:bg-[#D9B382] selection:text-[#2C1810]">
      <Navigation 
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenConsultant={() => setIsConsultantOpen(true)}
        onNavigate={navigateTo}
      />

      {!isLiveSync && (
        <div className="fixed bottom-10 left-10 z-50 flex items-center gap-3 px-5 py-3 bg-white shadow-2xl rounded-full text-[10px] font-bold uppercase tracking-widest text-[#2C1810]/60 border border-[#F5E9E2] animate-in slide-in-from-left duration-1000">
          <div className="w-2 h-2 rounded-full bg-[#D9B382] animate-pulse"></div>
          Showcase Mode Active
        </div>
      )}

      <MenuSidebar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={navigateTo}
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onViewProduct={handleViewProduct}
        products={products}
      />

      <main className="transition-opacity duration-700">
        {view === 'home' && (
          <>
            <Hero 
              onShop={() => navigateTo('shop')} 
              onProcess={() => navigateTo('process')} 
            />
            
            <div id="featured-shop" className="bg-white">
                <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 flex justify-between items-end reveal">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8D4E3F] block mb-4">Our Gallery</span>
                    <h3 className="text-5xl md:text-7xl luxury-serif">Signature Series</h3>
                  </div>
                  <button onClick={() => navigateTo('shop')} className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#D9B382] pb-2 hover:text-[#8D4E3F] hover:border-[#8D4E3F] transition-all">
                    View Full Catalog
                  </button>
                </div>
                <ProductGrid 
                  products={products.slice(0, 3)} 
                  onAddToCart={handleAddToCart}
                  onViewProduct={handleViewProduct}
                />
            </div>

            <section className="py-40 px-6 bg-[#FDF8F5]">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
                {[
                  { title: 'The Ethos', desc: 'Every piece of timber is tracked from the forest floor to your bath.', icon: 'Grain' },
                  { title: 'The Arch', desc: 'Precision-milled stone that honors the architectural curve.', icon: 'Stone' },
                  { title: 'The Bond', desc: 'A thirty-year structural promise built into every mortise joint.', icon: 'Joinery' }
                ].map((feature, i) => (
                  <div key={i} className="reveal text-left stagger-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8D4E3F] mb-10 flex items-center gap-4">
                      <div className="w-8 h-[1px] bg-[#8D4E3F]"></div>
                      {feature.icon}
                    </div>
                    <h3 className="text-4xl luxury-serif mb-6">{feature.title}</h3>
                    <p className="text-[#2C1810]/60 text-lg font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {view === 'shop' && (
          <ShopPage products={products} onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} />
        )}

        {view === 'process' && (
          <ProcessPage />
        )}

        {view === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={handleAddToCart} 
            onBack={() => setView('shop')}
          />
        )}

        <footer className="bg-[#2C1810] text-white py-40">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-24">
            <div className="md:col-span-2">
              <h2 className="text-5xl luxury-serif mb-10 tracking-tighter cursor-pointer" onClick={() => navigateTo('home')}>ARCH & GRAIN</h2>
              <p className="text-white/40 max-w-md mb-16 leading-relaxed text-xl italic font-light">
                "We don't just build vanities; we create the foundation for your daily ritual of restoration."
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#D9B382] mb-10">Navigation</h4>
              <ul className="space-y-6 text-sm font-light text-white/60">
                <li><button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">The Collections</button></li>
                <li><button onClick={() => navigateTo('process')} className="hover:text-white transition-colors">Bespoke Inquiry</button></li>
                <li><button onClick={() => navigateTo('process')} className="hover:text-white transition-colors">Studio Story</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#D9B382] mb-10">Visit Our Studio</h4>
              <p className="text-sm text-white/40 leading-relaxed font-light mb-8 italic">
                Architecting the Sanctuary in the Pacific Northwest.
              </p>
            </div>
          </div>
        </footer>
      </main>

      <button 
        onClick={() => setIsConsultantOpen(true)}
        className="fixed bottom-12 right-12 z-[55] w-24 h-24 bg-[#8D4E3F] text-[#FDF8F5] rounded-[2.5rem] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#D9B382] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <Sparkles size={36} className="relative z-10 group-hover:rotate-12 transition-transform" />
      </button>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={handleRemoveFromCart}
      />

      <DesignConsultant 
        isOpen={isConsultantOpen} 
        onClose={() => setIsConsultantOpen(false)}
        products={products}
        onViewProduct={handleViewProduct}
      />
    </div>
  );
};

export default App;
