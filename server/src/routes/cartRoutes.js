const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();


router.post('/cart/add', cartController.addProductToCart);


router.get('/cart/:userId', cartController.getUserCart);


router.delete('/cart/:userId/product/:productId', cartController.deleteProductFromCart);

module.exports = router;
