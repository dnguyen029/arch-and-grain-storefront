
import React from 'react';

const ProcessPage: React.FC = () => {
  return (
    <div className="bg-[#FDF8F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#2C1810]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541604193435-225878996ac3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-60"
            alt="Artisan at work"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D9B382] mb-8 block reveal active">Our Philosophy</span>
          <h2 className="text-6xl md:text-9xl luxury-serif mb-8 reveal active stagger-1">The Arch <br/><span className="italic">&</span> Grain</h2>
          <p className="text-xl md:text-2xl font-light italic text-white/80 reveal active stagger-2">An unwavering commitment to architectural permanence and organic warmth.</p>
        </div>
      </section>

      {/* The Two Pillars */}
      <section className="py-32 px-6 max-w-7xl mx-auto space-y-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl luxury-serif text-[#8D4E3F]/30 italic">01</span>
              <div className="w-12 h-[1px] bg-[#8D4E3F]"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8D4E3F]">The Arch</span>
            </div>
            <h3 className="text-4xl md:text-6xl luxury-serif mb-8">Timeless <br/><span className="italic">Stone</span></h3>
            <p className="text-lg text-[#2C1810]/70 leading-relaxed mb-8">
              Every vanity begins with the search for the perfect block. We source our Statuario Marble from Italy and our honed Travertine from Turkey. 
            </p>
            <p className="text-lg text-[#2C1810]/70 leading-relaxed">
              Our stonemasons hand-finish every edge, ensuring the "Arch" silhouettes—our signature curves—retain the raw power of the mountain while offering a soft, tactile touch that invites the hand.
            </p>
          </div>
          <div className="reveal stagger-1 rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl relative group">
            <img src="https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt="Stone Detail" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="lg:order-2 reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl luxury-serif text-[#D9B382]/30 italic">02</span>
              <div className="w-12 h-[1px] bg-[#D9B382]"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D9B382]">The Grain</span>
            </div>
            <h3 className="text-4xl md:text-6xl luxury-serif mb-8">Living <br/><span className="italic">Hardwood</span></h3>
            <p className="text-lg text-[#2C1810]/70 leading-relaxed mb-8">
              Hardwood is the soul of our studio. We specialize in Rift-Sawn White Oak and Smoked Ash, selected for their stability in high-humidity environments.
            </p>
            <p className="text-lg text-[#2C1810]/70 leading-relaxed">
              We use traditional joinery—mortise and tenon—to ensure our cabinetry lasts as long as the home itself. Each unit is sealed with a proprietary matte wax that celebrates the open grain rather than hiding it under plastic.
            </p>
          </div>
          <div className="lg:order-1 reveal rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl relative group">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt="Wood Grain Detail" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="bg-[#F5E9E2] py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto reveal">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-12 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-[#8D4E3F]"></div>
          </div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12 text-[#8D4E3F]">A Legacy of Quality</h4>
          <blockquote className="text-3xl md:text-6xl luxury-serif italic leading-[1.1] text-[#2C1810] mb-16">
            "We build for the senses. A vanity should feel as intentional as a piece of sculpture, yet as reliable as the ground beneath your feet."
          </blockquote>
          <div className="flex items-center justify-center gap-6">
            <div className="w-8 h-[1px] bg-[#2C1810]/20"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2C1810]/60">Studio Founders, Arch & Grain</p>
            <div className="w-8 h-[1px] bg-[#2C1810]/20"></div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <h3 className="text-4xl luxury-serif mb-8">Ready to transform your space?</h3>
        <button className="px-10 py-5 bg-[#2C1810] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform">
          Contact Our Studio
        </button>
      </section>
    </div>
  );
};

export default ProcessPage;
