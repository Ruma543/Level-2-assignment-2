import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

// will call controler function
router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
router.get('/s/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.updateSingleProduct);
router.delete('/:productId', ProductControllers.deleteSingleProduct);
export const ProductRoutes = router;
