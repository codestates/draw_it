const express = require('express');
const { postController } = require('../controller/index');

const router = express.Router();

// post
router.get('/', postController.post.getAll);

router.post('/', postController.post.create);

router.get('/:id', postController.post.getById);

router.post('/:id', postController.post.check);

router.delete('/:id', postController.post.delete);

module.exports.postRouter = router;
