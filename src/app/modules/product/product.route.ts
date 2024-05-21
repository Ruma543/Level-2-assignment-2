import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

// will call controler function
router.post('/', ProductControllers.createProduct);
// router.get('/', ProductControllers.getAllProduct);
// router.get('/search', ProductControllers.getSearchProduct);
router.get('/', ProductControllers.getProducts);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.updateSingleProduct);
router.delete('/:productId', ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
