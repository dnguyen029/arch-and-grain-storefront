
import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'medusaId',
            title: 'Medusa ID',
            type: 'string',
            description: 'The ID of the product in Medusa (e.g. prod_...)',
        }),
        defineField({
            name: 'handle',
            title: 'Handle',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text', // Simple text for now, could be portable text
        }),
        defineField({
            name: 'features',
            title: 'Features (Bullet Points)',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'specifications',
            title: 'Specifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'value', type: 'string', title: 'Value' },
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'value',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'downloads',
            title: 'Downloads / Resources',
            type: 'array',
            of: [
                {
                    type: 'file',
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Title',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'material',
            title: 'Material', // Custom field for Arch & Grain
            type: 'string',
        }),
        defineField({
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            to: [{ type: 'category' }], // Linking to our category type which acts as collection
        }),
        defineField({
            name: 'variants',
            title: 'Variants',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'productVariant' }] }],
        }),
    ],
})
