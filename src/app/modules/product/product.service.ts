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
const getSingleProductDataFromDB = async (id: string) => {
  // const id = '664bf3d79a856ff3689fe172';
  const result = await Product.findOne({ _id: id });
  // console.log(result);
  return result;
};
const updateSingleProductDataFromDB = async (id: string, data: any) => {
  // const id1 = { _id: id };
  // const result = await Product.findOneAndUpdate(id1, data, { new: true });
  // console.log('for update data', id, data);
  // return result;
  try {
    const objectId = new mongoose.Types.ObjectId(id); // Ensure the ID is in ObjectId format
    const result = await Product.findOneAndUpdate(
      { _id: objectId }, // Ensure _id is used as the field
      data,
      { new: true, runValidators: true } // Ensure new and validation options
    );

    console.log('Updated data for', id, data);
    return result;
  } catch (err) {
    console.error('Error updating data:', err);
    throw err;
  }
};
const deleteSingleProductDataFromDB = async (id: string) => {
  const result = await Product.updateOne({ id }, { isDeleted: true });
  console.log('deleted id', id);
  return result;
};
export const ProductService = {
  createProductIntoDB,
  getAllProductDataFromDB,
  getSingleProductDataFromDB,
  updateSingleProductDataFromDB,
  deleteSingleProductDataFromDB,
};
