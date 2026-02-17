
import { Product } from "../types";
import { fetchSanityProducts } from "./sanityService";

/**
 * ARCH & GRAIN | Medusa Production Service
 * Pulls the API URL from environment variables for deployment flexibility.
 */
const MEDUSA_BASE_URL = process.env.PUBLIC_MEDUSA_URL || "http://localhost:9000";

/**
 * Maps a Medusa Product object to our luxury Storefront interface.
 */
// Maps a Medusa Product object to our luxury Storefront interface.
const mapMedusaProduct = (medusaProd: any): Product => {
  const price = medusaProd.variants?.[0]?.prices?.[0]?.amount
    ? medusaProd.variants[0].prices[0].amount / 100
    : 0;

  return {
    id: medusaProd.id,
    variantId: medusaProd.variants?.[0]?.id, // Map the first variant ID
    name: medusaProd.title || "Untitled Piece",
    description: medusaProd.description || "A masterfully crafted architectural element by Arch & Grain.",
    price: price,
    image: medusaProd.thumbnail || `https://picsum.photos/seed/${medusaProd.id}/800/800`,
    category: (medusaProd.collection?.title as any) || 'Modern',
    material: medusaProd.material || (medusaProd.metadata?.material as string) || "Sustainably Sourced Hardwood"
  };
};

/**
 * Fetches products from the live Medusa environment and enriches them with Sanity data.
 */


export const fetchProductsFromMedusa = async (): Promise<Product[] | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // Increased timeout for dual fetch

    // Parallel fetch from Medusa and Sanity
    const [medusaResponse, sanityData] = await Promise.all([
      fetch(`${MEDUSA_BASE_URL}/store/products`, {
        signal: controller.signal,
        headers: { "Content-Type": "application/json" }
      }).catch(() => null), // Catch individual errors so one failure doesn't block the other entirely (if we want robust fallback, though we need Medusa for IDs)
      fetchSanityProducts().catch(() => null)
    ]);

    clearTimeout(timeoutId);

    if (!medusaResponse || !medusaResponse.ok) {
      // If Medusa fails, we can't really trade. 
      // But if Sanity has IDs, maybe we could display something? 
      // For now, let's stick to "Medusa is source of truth for existence".
      console.warn("Arch & Grain: Medusa backend offline or unreachable.");
      return null;
    }

    const medusaData = await medusaResponse.json();
    let products: Product[] = [];

    if (medusaData.products && Array.isArray(medusaData.products)) {
      products = medusaData.products.map(mapMedusaProduct);
    }

    // Merge logic: If Sanity has data for a product ID, override specific fields
    if (sanityData && products.length > 0) {
      products = products.map(prod => {
        const sanityMatch = sanityData.find((s: any) => s.id === prod.id || s.medusaId === prod.id);
        if (sanityMatch) {
          return {
            ...prod,
            name: sanityMatch.title || prod.name,
            description: sanityMatch.description || prod.description,
            image: sanityMatch.image || prod.image,
            category: (sanityMatch.category as any) || prod.category,
            material: sanityMatch.material || prod.material
          };
        }
        return prod;
      });
    }

    return products;
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
