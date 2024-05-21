import { Product } from '../product.model';
import { TProduct } from './product.interface';

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
  const result = await Product.findByIdAndUpdate(id, data, { new: true });
  console.log('for update data', data, id);
  return result;
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
