
import React, { useEffect, useRef } from 'react';

interface HeroProps {
  onShop: () => void;
  onProcess: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShop, onProcess }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen flex items-center overflow-hidden bg-[#2C1810]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1620626011761-9963d7b69763?auto=format&fit=crop&q=80&w=2400" 
          alt="Luxury Bathroom Architecture"
          className="w-full h-full object-cover scale-105 animate-[subtle-zoom_30s_infinite_alternate] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[#2C1810]/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-4xl">
          <div className="reveal flex items-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-[#D9B382]"></div>
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-[#D9B382]">
              Est. 2024 • Artisan Hand-Crafted
            </span>
          </div>
          
          <h2 className="text-7xl md:text-[9rem] leading-[0.85] mb-12 luxury-serif reveal stagger-1 text-white">
            Architecture <br />
            <span className="italic text-[#D9B382]">of the Self.</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-16 text-white/70 font-light max-w-xl leading-relaxed reveal stagger-2">
            We translate the raw honesty of stone and grain into the foundation of your daily restoration.
          </p>
          
          <div className="flex flex-wrap gap-8 reveal stagger-3">
            <button 
              onClick={onShop}
              className="m3-btn group px-14 py-6 bg-[#D9B382] text-[#2C1810] rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white transition-all shadow-2xl flex items-center gap-3"
            >
              The Collection
              <div className="w-2 h-2 rounded-full bg-[#8D4E3F] group-hover:scale-150 transition-transform"></div>
            </button>
            <button 
              onClick={onProcess}
              className="m3-btn px-14 py-6 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white/10 transition-all backdrop-blur-xl"
            >
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Expressive M3 Scroll Indicator */}
      <div className="absolute bottom-16 right-12 flex items-center gap-6 reveal stagger-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Explore the Grain</span>
        <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-[#D9B382] animate-[scroll-slide_3s_infinite]"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes subtle-zoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.15); }
        }
        @keyframes scroll-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </div>
  );
};

export default Hero;
