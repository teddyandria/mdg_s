const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/signup', userController.registration);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.get("/fictitious-login", userController.fictitiousLogin)

module.exports = router;