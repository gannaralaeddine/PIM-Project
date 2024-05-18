const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get("/logout", authController.logout)

router.get("/confirmation/:token", authController.confirmation);

module.exports = router;
