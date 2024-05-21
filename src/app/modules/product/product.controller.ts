import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productValidationSchema from './product.zodValidation';
//create product data
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
  } catch (err) {
    const error = err as Error;
    // console.log(err);
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      data: error,
    });
  }
};

//get all product data and search data
const getProducts = async (req: Request, res: Response) => {
  try {
    const search = req.query.searchTerm as string; // Get the searchTerm query parameter if provided

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : undefined;

    // Fetch products using the combined service method
    const result = await ProductService.getProductDataFromDB(query);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: search
          ? `No products found matching the search term '${search}'`
          : 'No products available',
      });
    }

    res.status(200).json({
      success: true,
      message: search
        ? `Products matching search term '${search}' fetched successfully!`
        : 'Products fetched successfully!',
      // count: result.length,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};
//single product get data
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductService.getSingleProductDataFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    // console.log(err);
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      data: error,
    });
  }
};
//update a single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data1 = req.body;

    const result = await ProductService.updateSingleProductDataFromDB(
      productId,
      data1
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'product not found and no changes made',
      });
    }
    res.status(200).json({
      success: true,
      message: 'product data update  successfully',
      data: data1,
    });
  } catch (err) {
    const error = err as Error;
    // console.log(err);
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      data: error,
    });
  }
};
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result =
      await ProductService.deleteSingleProductDataFromDB(productId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    const error = err as Error;
    // console.log(err);
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      data: error,
    });
  }
};
//pass the controller data for further use
export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
