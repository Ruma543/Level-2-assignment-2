import { Request, Response } from 'express';
import orderValidationSchema from './order.zodvalidation';
import { OrderService } from './order.service';

//order created data
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body.order;
    const zodData = orderValidationSchema.parse(order);
    const result = await OrderService.createOrderIntoDB(zodData);

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
