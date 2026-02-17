
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Product } from "../types";

// --- Configuration ---
// Make sure to add these to your environment variables (.env.local or similar)
// VITE_SANITY_PROJECT_ID=your_project_id
// VITE_SANITY_DATASET=production
// VITE_SANITY_API_VERSION=2024-01-01

const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || "2024-01-01";

// Only initialize if project ID is present, to prevent crashes
export const sanityClient = SANITY_PROJECT_ID
    ? createClient({
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        useCdn: true, // set to `false` to bypass the edge cache
        apiVersion: SANITY_API_VERSION,
    })
    : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

// --- Helper Functions ---
export function urlFor(source: any) {
    if (!builder || !source) return "";
    return builder.image(source).url();
}

/**
 * Fetches products from Sanity.
 * Assumes a schema where products have:
 * - _type: "product"
 * - medusaId: string (to link to Medusa)
 * - title: string
 * - description: text
 * - image: image
 * - categories: array (referenced)
 */
export const fetchSanityProducts = async (): Promise<Partial<Product>[] | null> => {
    if (!sanityClient) {
        console.warn("Arch & Grain: Sanity Project ID not found. Skipping Sanity integration.");
        return null;
    }

    try {
        const query = `*[_type == "product"]{
      "id": medusaId,
      title,
      subtitle,
      description,
      "image": thumbnail.asset->url,
      "images": images[].asset->url,
      "category": collection->title,
      "material": material
    }`;

        const sanityProducts = await sanityClient.fetch(query);
        return sanityProducts;
    } catch (error) {
        console.error("Arch & Grain: Failed to fetch from Sanity:", error);
        return null;
    }
};
