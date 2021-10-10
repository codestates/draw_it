const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const { userRouter } = require('./router/user');
const { postRouter } = require('./router/post');

const app = express();

app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
  res.status(200).send('Draw it');
});

const HTTP_PORT = process.env.HTTP_PORT || 4000;

app.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT}`);
});
