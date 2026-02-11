
import { Product } from './types';

export const COLORS = {
  background: '#FDF8F5',
  surface: '#F5E9E2',
  primary: '#8D4E3F',
  secondary: '#D9B382',
  text: '#2C1810',
  accent: '#A67B5B'
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Heirloom Oak Single',
    description: 'A solid white oak vanity with hand-turned legs and a honed travertine top.',
    price: 3450,
    image: 'https://picsum.photos/seed/vanity1/800/800',
    category: 'Traditional',
    material: 'White Oak'
  },
  {
    id: '2',
    name: 'Brutalist Concrete Arch',
    description: 'Cast concrete floating vanity with an integrated basin and walnut accents.',
    price: 4200,
    image: 'https://picsum.photos/seed/vanity2/800/800',
    category: 'Minimalist',
    material: 'Concrete'
  },
  {
    id: '3',
    name: 'Marble Arch Double',
    description: 'Statuario marble twin-sink vanity with matte charcoal cabinetry.',
    price: 8900,
    image: 'https://picsum.photos/seed/vanity3/800/800',
    category: 'Double',
    material: 'Marble'
  },
  {
    id: '4',
    name: 'Sandstone Floating Plinth',
    description: 'Ethereal sandstone textures carved into a seamless wall-mounted unit.',
    price: 2800,
    image: 'https://picsum.photos/seed/vanity4/800/800',
    category: 'Modern',
    material: 'Sandstone'
  },
  {
    id: '5',
    name: 'Smoked Ash & Brass',
    description: 'Dark smoked ash wood with antiqued brass hardware and a quartz top.',
    price: 5600,
    image: 'https://picsum.photos/seed/vanity5/800/800',
    category: 'Modern',
    material: 'Ash'
  },
  {
    id: '6',
    name: 'Terracotta Trough',
    description: 'Inspired by Mediterranean pottery, this single unit brings warmth to any space.',
    price: 1950,
    image: 'https://picsum.photos/seed/vanity6/800/800',
    category: 'Single',
    material: 'Terracotta'
  }
];
