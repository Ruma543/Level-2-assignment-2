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
export const ProductService = {
  createProductIntoDB,
  getAllProductDataFromDB,
};
