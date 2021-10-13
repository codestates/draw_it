const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const { userRouter } = require('./router/user');
const { postRouter } = require('./router/post');
const { commentRouter } = require('./router/comment');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.get('/', (req, res) => {
  res.status(200).send('Draw it');
});

const HTTP_PORT = process.env.HTTP_PORT || 4000;

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on ${HTTP_PORT}`);
});
