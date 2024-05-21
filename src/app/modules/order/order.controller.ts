import { Request, Response } from 'express';
import orderValidationSchema from './order.zodvalidation';
import { OrderService } from './order.service';

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
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    });
  }
};
// const getAllOrder = async (req: Request, res: Response) => {
//   try {
//     const result = await OrderService.getAllOrderDataFromDB();
//     res.status(200).json({
//       success: true,
//       message: 'Orders fetched successfully!',
//       count: result.length,
//       data: result,
//     });
//   } catch (err: any) {
//     // console.log(err);
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       data: err,
//     });
//   }
// };
// const getSearchOrder = async (req: Request, res: Response) => {
//   try {
//     const search = req.query.email; //searchTerm is using for search

//     const query = search ? { email: { $regex: search, $options: 'i' } } : {};

//     // Execute the query
//     const result = await OrderService.getSearchOrderDataFromDB(query);

//     // Send response
//     res.status(200).json({
//       success: true,
//       message: 'Orders fetched successfully for user email!',
//       count: result.length,
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       data: err,
//     });
//   }
// };

const getOrderData = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const query = email
      ? { email: { $regex: email, $options: 'i' } }
      : undefined;

    const result = await OrderService.getOrderDataFromDB(query);

    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';
    res.status(200).json({
      success: true,
      message,
      count: result.length,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getOrderData,
  // getAllOrder,
  // getSearchOrder,
};
