import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// will call controler function
router.post('/', OrderControllers.createOrder);
// router.get('/', OrderControllers.getAllOrder);
// router.get('/', OrderControllers.getSearchOrder);

// router.get('/', async (req, res) => {
//   const email = req.query.email as string | undefined;

//   if (email) {
//     await OrderControllers.getSearchOrder(req, res);
//   } else {
//     await OrderControllers.getAllOrder(req, res);
//   }
// });
router.get('/', OrderControllers.getOrderData);
export const OrderRoutes = router;
