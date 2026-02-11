
import React from 'react';

const CATEGORIES = ['All Products', 'Single Vanities', 'Double Vanities', 'Floating', 'Traditional', 'Modern'];

interface CategorySliderProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full py-8 bg-[#FDF8F5] border-b border-[#F5E9E2] sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto hide-scrollbar flex items-center gap-3">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300
              ${activeCategory === cat 
                ? 'bg-[#2C1810] text-white shadow-lg' 
                : 'bg-white border border-[#F5E9E2] text-[#2C1810] hover:bg-[#F5E9E2]'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
