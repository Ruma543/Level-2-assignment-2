import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string(),
  productId: z.string(),
  price: z.number().min(0, 'price is required'),
  quantity: z.number().min(0, 'price is required'),
});
export default orderValidationSchema;
