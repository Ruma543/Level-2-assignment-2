import { query } from 'express';
import { Product } from '../product.model';
import { TProduct } from './product.interface';
import mongoose from 'mongoose';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData); //built in static method

  return result;
};
const getAllProductDataFromDB = async () => {
  const result = await Product.find();
  return result;
};
const getSearchProductDataFromDB = async (query: string) => {
  const result = await Product.find(query);
  console.log(result);
  return result;
};
const getSingleProductDataFromDB = async (id: string) => {
  // const id = '664bf3d79a856ff3689fe172';
  const result = await Product.findOne({ _id: id });
  // console.log(result);
  return result;
};
const updateSingleProductDataFromDB = async (id: string, data: any) => {
  // const id1 = { _id: id };
  const result = await Product.updateOne(
    { _id: id },
    { $set: data },
    { new: true }
  );
  console.log('for update data', id, data);
  return result;
};
const deleteSingleProductDataFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  console.log('deleted id', id, result);
  return result;
};
export const ProductService = {
  createProductIntoDB,
  getAllProductDataFromDB,
  getSingleProductDataFromDB,
  updateSingleProductDataFromDB,
  deleteSingleProductDataFromDB,
  getSearchProductDataFromDB,
};
