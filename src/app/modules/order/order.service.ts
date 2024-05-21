import { Order } from '../order.model';
import { TOrder } from './order.interface';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);

  return result;
};
// const getAllOrderDataFromDB = async () => {
//   const result = await Order.find();
//   return result;
// };
// const getSearchOrderDataFromDB = async (query: string) => {
//   const result = await Order.find(query);
//   console.log(result);
//   return result;
// };

const getOrderDataFromDB = async (query?: any) => {
  let result;
  if (query) {
    // If a query is provided, perform a search operation
    result = await Order.find(query);
  } else {
    // If no query is provided, fetch all orders
    result = await Order.find();
  }
  return result;
};
export const OrderService = {
  createOrderIntoDB,
  getOrderDataFromDB,
  // getAllOrderDataFromDB,
  // getSearchOrderDataFromDB,
};
