const express = require('express');
const { postController } = require('../controller/post');

const router = express.Router();

// post
router.get('/', postController.getAll);

router.post('/', postController.create);

router.get('/:id', postController.getById);

router.post('/:id', postController.check);

router.delete('/:id', postController.delete);

module.exports.postRouter = router;
