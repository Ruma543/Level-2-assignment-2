import { Schema, model } from 'mongoose';

import { OrderModel, TOrder } from './order/order.interface';

const orderSchema = new Schema<TOrder, OrderModel>({
  email: { type: String, required: true },
  productId: { type: String, required: [true, 'id is required'] },

  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
});

// productSchema.pre('save', async function (next) {
//   console.log(this, 'pre hook:we will save data');
//   next();
// });
// productSchema.post('save', async function (next) {
//   console.log(this, 'post hook:we will post data');
//   // next();
// });

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
