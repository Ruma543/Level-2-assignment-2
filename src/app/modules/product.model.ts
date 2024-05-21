import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './product/product.interface';

const variantSchema = new Schema(
  {
    type: { type: String, required: [true, 'variant type is required'] },
    value: { type: String, required: [true, 'variant value is required'] },
  },
  { _id: false }
);
const inventorySchema = new Schema(
  {
    quantity: {
      type: Number,
      required: [true, 'inventory quantity is required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inventory inStock is required'],
    },
  },
  { _id: false }
);

const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  category: {
    type: String,
    required: [true, 'description is required'],
  },
  tags: {
    type: [String],
    required: [true, 'tag is required'],
  },
  variants: {
    type: [variantSchema],
    required: [true, 'variants is required'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'inventory is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

productSchema.pre('save', async function (next) {
  console.log(this, 'pre hook:we will save data');
  next();
});
productSchema.post('save', async function (next) {
  console.log(this, 'post hook:we will post data');
  // next();
});
export const Product = model<TProduct, ProductModel>('Product', productSchema);
