// import { query } from 'express';
import mongoose from 'mongoose';
import { Product } from '../product.model';
import { TProduct } from './product.interface';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData); //built in static method
  return result;
};

const getProductDataFromDB = async (query?: any) => {
  let result;

  if (query) {
    // If query is provided, perform a search query
    result = await Product.find(query);
  } else {
    // If no query is provided, fetch all products
    result = await Product.find();
  }

  return result;
};
const getSingleProductDataFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  // console.log(result);
  return result;
};
//for update the product quantity and instock status after create an order
const updateProductQuantity = async (
  productId: string,
  newQuantity: number
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error(`Invalid product ID: ${productId}`);
  }
  // Find the product to get the current quantity
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Calculate new quantity
  const Quantity = product.inventory.quantity - newQuantity;
  const inStock = Quantity > 0;
  //update quantity and in stock
  return await Product.findByIdAndUpdate(
    productId,
    { 'inventory.quantity': Quantity, 'inventory.inStock': inStock },
    { new: true }
  );
};

const updateSingleProductDataFromDB = async (id: string, data: any) => {
  const result = await Product.updateOne(
    { _id: id },
    { $set: data },
    { new: true }
  );
  // console.log('for update data', id, data);
  return result;
};
const deleteSingleProductDataFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  return result;
};
export const ProductService = {
  createProductIntoDB,
  getProductDataFromDB,
  getSingleProductDataFromDB,
  updateSingleProductDataFromDB,
  deleteSingleProductDataFromDB,
  updateProductQuantity,
};
