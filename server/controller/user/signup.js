const { User } = require('../../models');

module.exports = (req, res) => {
  const { email, nickname, password } = req.body;

  User.findOne({
    where: {
      email,
    },
  }).then((data) => {
    if (data) {
      res
        .status(409)
        .send({ data: null, message: '이미 존재하는 이메일입니다.' });
    } else {
      User.create({
        email,
        nickname,
        password,
      })
        .then((data) => {
          res.status(201).send({
            data: {
              id: data.id,
              email: data.email,
              nickname: data.nickname,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            },
            message: '회원가입에 성공하였습니다.',
          });
        })
        .catch((err) => {
          throw err;
        });
    }
  });
};
