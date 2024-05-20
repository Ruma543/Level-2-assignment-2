import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productValidationSchema from './product.zodValidation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodData = productValidationSchema.parse(product);
    const result = await ProductService.createProductIntoDB(zodData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    });
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductDataFromDB();
    res.status(200).json({
      success: true,
      message: 'All product data get successfully',
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    });
  }
};
export const ProductControllers = {
  createProduct,
  getAllProduct,
};
