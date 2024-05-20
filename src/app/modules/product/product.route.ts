import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

// will call controler function
router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
export const ProductRoutes = router;
