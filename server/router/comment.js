const express = require('express');
const { commentController } = require('../controller/index');

const router = express.Router();

// post
router.get('/:id', commentController.getComment);

router.post('/:id', commentController.uploadComment);

module.exports.commentRouter = router;
