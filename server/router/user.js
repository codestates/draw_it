const express = require('express');
const { userController } = require('../controller/user');

const router = express.Router();

router.get('/', userController.get);

module.exports.userRouter = router;
