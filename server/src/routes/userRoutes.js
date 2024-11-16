const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post("/inscription", userController.createUser);

module.exports = router;