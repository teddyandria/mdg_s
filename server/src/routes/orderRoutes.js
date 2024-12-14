const express = require("express");
const router = express.Router();
const  orderController = require("../controllers/orderController");

router.post("/order/validate", orderController.validateOrderController);

module.exports = router;