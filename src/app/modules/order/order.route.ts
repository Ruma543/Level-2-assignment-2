import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// will call controler function
router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getAllOrder);
// router.get('/:email', OrderControllers.getSearchOrder);
router.get('/', OrderControllers.getSearchOrder);

export const OrderRoutes = router;
