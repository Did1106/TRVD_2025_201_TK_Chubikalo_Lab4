const express = require('express');
const multer = require('multer');
const router = express.Router();
const authController = require('../controllers/authController');

const upload = multer({ dest: 'src/public/img/' });

router.get('/register', authController.showRegister);
router.post('/register', upload.single('photo'), authController.register);

router.get('/login', authController.showLogin);
router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
