const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyRefreshToken = require('../middleware/Token')

router.post('/register',adminController.adminSignup);
router.post('/login',adminController.login)
router.get('/refresh-token', verifyRefreshToken,adminController.refreshToken)
router.get('/analytics/:order',verifyRefreshToken,adminController.analytics)



module.exports = router;