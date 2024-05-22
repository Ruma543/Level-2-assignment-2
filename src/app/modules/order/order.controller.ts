import { Request, Response } from 'express';
import orderValidationSchema from './order.zodvalidation';
import { OrderService } from './order.service';
import { ProductService } from '../product/product.service';
import mongoose from 'mongoose';

//order created data
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body.order;
    const zodData = orderValidationSchema.parse(order);

    if (!mongoose.Types.ObjectId.isValid(zodData.productId)) {
      return res.status(400).json({
        success: false,
        message: `Invalid product ID: ${zodData.productId}`,
      });
    }

    const product = await ProductService.getSingleProductDataFromDB(
      zodData.productId
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    if (product.inventory.quantity < zodData.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    const result = await OrderService.createOrderIntoDB(zodData);

    // Update the product quantity
    // product.inventory.quantity -= zodData.quantity;
    await ProductService.updateProductQuantity(
      zodData.productId,
      zodData.quantity
      // product.inventory.quantity
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      data: error,
    });
  }
};

//all order get and search by email order get data
const getOrderData = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const query = email
      ? { email: { $regex: email, $options: 'i' } }
      : undefined;

    const result = await OrderService.getOrderDataFromDB(query);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';
    res.status(200).json({
      success: true,
      message,
      // count: result.length,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      data: error,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getOrderData,
};
