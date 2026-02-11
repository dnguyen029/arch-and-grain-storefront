
import { Product } from "../types";

/**
 * ARCH & GRAIN | Medusa Production Service
 * Pulls the API URL from environment variables for deployment flexibility.
 */
const MEDUSA_BASE_URL = process.env.PUBLIC_MEDUSA_URL || "http://localhost:9000";

/**
 * Maps a Medusa Product object to our luxury Storefront interface.
 */
const mapMedusaProduct = (medusaProd: any): Product => {
  const price = medusaProd.variants?.[0]?.prices?.[0]?.amount 
    ? medusaProd.variants[0].prices[0].amount / 100 
    : 0;

  return {
    id: medusaProd.id,
    name: medusaProd.title || "Untitled Piece",
    description: medusaProd.description || "A masterfully crafted architectural element by Arch & Grain.",
    price: price,
    image: medusaProd.thumbnail || `https://picsum.photos/seed/${medusaProd.id}/800/800`,
    category: (medusaProd.collection?.title as any) || 'Modern',
    material: medusaProd.material || (medusaProd.metadata?.material as string) || "Sustainably Sourced Hardwood"
  };
};

/**
 * Fetches products from the live Medusa environment.
 */
export const fetchProductsFromMedusa = async (): Promise<Product[] | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${MEDUSA_BASE_URL}/store/products`, {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    if (data.products && Array.isArray(data.products)) {
      return data.products.map(mapMedusaProduct);
    }
    return null;
  } catch (error) {
    console.debug("Arch & Grain: Production backend offline. Using curated local collection.");
    return null;
  }
};

/**
 * Cart Persistence: Creates or retrieves a Medusa Cart
 */
export const getOrCreateCart = async (existingCartId?: string) => {
  try {
    if (existingCartId) {
      const res = await fetch(`${MEDUSA_BASE_URL}/store/carts/${existingCartId}`);
      if (res.ok) return (await res.json()).cart;
    }
    
    const res = await fetch(`${MEDUSA_BASE_URL}/store/carts`, { method: "POST" });
    const data = await res.json();
    return data.cart;
  } catch (e) {
    return null;
  }
};

export const addToMedusaCart = async (cartId: string, variantId: string, quantity: number) => {
  try {
    const response = await fetch(`${MEDUSA_BASE_URL}/store/carts/${cartId}/line-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variant_id: variantId, quantity })
    });
    return response.json();
  } catch (e) {
    return null;
  }
};
