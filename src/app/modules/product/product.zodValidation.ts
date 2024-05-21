import { z } from 'zod';

// Define Zod schemas for the sub-documents first
const variantSchema = z.object({
  type: z.string().nonempty('variant type is required'),
  value: z.string().nonempty('variant value is required'),
});

const inventorySchema = z.object({
  quantity: z.number().min(0, 'inventory quantity is required'),
  inStock: z.boolean().refine(value => value === true || value === false, {
    message: 'inventory inStock is required',
  }),
});
const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0, 'price is required'),
  category: z.string(),
  tags: z.array(z.string().nonempty('tag is required')),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
  isDeleted: z.boolean(),
});
export default productValidationSchema;
