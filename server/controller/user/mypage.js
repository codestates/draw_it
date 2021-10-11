const {
  isAuthorized,
  checkRefeshToken,
  generateAccessToken,
} = require('../tokenFunctions');
const { user_post_passed } = require('../../models');

module.exports = (req, res) => {
  //? 로그인 후 마이페이지 (Home.js) 가 렌더링 되면
  //? http://localhost:4000/user/mypage로 axios.get 요청을 보내게 됨
  //? 요청 헤더의 Authentication 으로 액세스 토큰을 받아서 인증을 거치고
  //? 인증 된 사용자의 경우 유저 정보(아이디, 닉네임, 맞춘 문제의 갯수)를 반환
  //? 그렇지 않다면 (액세스 토큰의 만료 경우) 리프레쉬 토큰을 검사
  //? 리프레쉬 토큰이 유효하다면 새로운 액세스 토큰을 발급
  //? 리프레쉬 토큰이 유효하지 않다면 상태코드 401, 로그인이 되어있지 않다는 메세지로 응답.

  const auth = isAuthorized(req);

  if (!auth) {
    // res.status(401).send({
    //   data: null,
    //   message: '로그인이 되어있지 않은 사용자입니다.',
    // });
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).send({
        data: null,
        message: '로그인이 되어있지 않은 사용자입니다.',
      });
    }

    const refreshTokenData = checkRefeshToken(refreshToken);

    if (!refreshTokenData) {
      res.status(401).send({
        data: null,
        message: '로그인이 되어있지 않은 사용자입니다.',
      });
    }

    const { email } = refreshTokenData;

    User.findOne({
      where: {
        email,
      },
    }).then((data) => {
      if (!data) {
        res.status(401).send({
          data: null,
          message: '로그인이 되어있지 않은 사용자입니다.',
        });

        const newAccessToken = generateAccessToken(data.dataValues);
        res.status(200).send({
          data: {
            newAccessToken,
            id: data.id,
            email: data.email,
            nickname: data.nickname,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        });
      }
    });
  } else {
    user_post_passed
      .findAndCountAll({
        where: {
          userId: auth.id,
        },
      })
      .then((data) => {
        res.status(201).send({
          data: {
            id: auth.id,
            nickname: auth.nickname,
            passedPosts: data.count,
            updatedAt: auth.updatedAt,
            createdAt: auth.createdAt,
          },
          message: '마이페이지 조회에 성공했습니다.',
        });
      });
  }
};
