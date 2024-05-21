import { Order } from '../order.model';
import { TOrder } from './order.interface';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);

  return result;
};
const getAllOrderDataFromDB = async () => {
  const result = await Order.find();
  return result;
};
const getSearchOrderDataFromDB = async (query: string) => {
  const result = await Order.find(query);
  console.log(result);
  return result;
};
export const OrderService = {
  createOrderIntoDB,
  getAllOrderDataFromDB,
  getSearchOrderDataFromDB,
};
