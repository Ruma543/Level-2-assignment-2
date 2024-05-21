import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productValidationSchema from './product.zodValidation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;
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
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // console.log(productId);
    const result = await ProductService.getSingleProductDataFromDB(productId);
    // const result = await ProductService.getSingleProductDataFromDB(productId);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;

    const result = await ProductService.updateSingleProductDataFromDB(
      productId,
      data
    );
    if ((result as any).modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found or no changes made',
      });
    }
    res.status(200).json({
      success: true,
      message: 'product data update  successfully',
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
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result =
      await ProductService.deleteSingleProductDataFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
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
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
