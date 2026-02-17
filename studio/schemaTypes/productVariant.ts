
import { defineField, defineType } from 'sanity'

export const productVariantType = defineType({
    name: 'productVariant',
    title: 'Product Variant',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'medusaId',
            title: 'Medusa ID',
            type: 'string',
            description: 'The ID of the variant in Medusa (e.g. variant_...)',
        }),
        defineField({
            name: 'sku',
            title: 'SKU',
            type: 'string',
        }),
        defineField({
            name: 'prices',
            title: 'Prices',
            type: 'string', // Simplified preview of prices
        }),
        defineField({
            name: 'options',
            title: 'Options',
            type: 'array',
            of: [{ type: 'string' }], // Simplified
        }),
    ],
})
