const express = require('express');
const { userController } = require('../controller/index');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/signout', userController.signout);
router.get('/mypage', userController.mypage.mypage);
router.put('/mypage', userController.mypage.edit);

module.exports.userRouter = router;
