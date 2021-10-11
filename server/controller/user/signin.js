const { User } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');

module.exports = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: {
      email,
      password,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(401).send({
          data: null,
          message: '로그인에 실패했습니다.',
        });
      } else {
        //? 토큰 발행
        const accessToken = generateAccessToken(data.dataValues);
        const refreshToken = generateRefreshToken(data.dataValues);

        //? res.cookie 를 통해 헤더의 set-cookie에 리프레시 토큰을 담아줌.
        sendRefreshToken(res, refreshToken);

        //? 비밀번호 제외한 데이터를 응답으로 보내줌.
        res.status(200).send({
          data: {
            accessToken,
            id: data.id,
            email: data.email,
            nickname: data.nickname,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
          message: '로그인에 성공하였습니다.',
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};
