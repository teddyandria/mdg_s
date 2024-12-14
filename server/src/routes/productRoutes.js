const express = require('express');
const productController = require('../controllers/productController');
const uploadPhoto = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/createProducts', uploadPhoto, productController.createProduct);

router.get('/products', productController.getAllProducts);
// router.get('/products/:id', productController.getOneProduct);
router.get("/products/categories", productController.getCategories);
router.get('/products/category/:categoryName', productController.getProductsByCategory);

router.get('/products/:id', productController.getOneProductWithId);

router.delete('/products/:id', productController.deleteProduct);




module.exports = router;
