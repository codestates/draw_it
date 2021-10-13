const { isAuthorized } = require('../tokenFunctions');
const { user_post_passed } = require('../../models');
const { User } = require('../../models');

module.exports = {
  mypage: async (req, res) => {
    const auth = isAuthorized(req, res);

    if (!auth) {
      res.status(401).send({
        data: null,
        message: '로그인이 되어있지 않은 사용자입니다.',
      });
    } else {
      const userInfo = await User.findOne({
        where: {
          id: auth.id,
        },
      });

      const countData = await user_post_passed.count({
        where: {
          userId: userInfo.id,
        },
      });

      res.status(200).send({
        data: {
          id: userInfo.id,
          nickname: userInfo.nickname,
          passedPosts: countData,
          updatedAt: userInfo.updatedAt,
          createdAt: userInfo.createdAt,
        },
      });
    }
  },

  edit: (req, res) => {
    const auth = isAuthorized(req, res);

    if (!auth) {
      res.status(400).send({
        data: null,
        message: '마이페이지 조회 권한이 없습니다.',
      });
    } else {
      User.update(
        {
          nickname: req.body.nickname,
        },
        {
          where: {
            id: auth.id,
          },
        }
      )
        .then((data) => {
          //? "id": PK,
          //?  "nickname": "nickname",
          //?  "passedPosts": "1",
          //?  "updatedAt": "created time",
          //?  "createdAt": "updated time"
          user_post_passed
            .findAndCountAll({
              where: {
                id: auth.id,
              },
            })
            .then((data) => {
              res.status(200).send({
                data: {
                  id: auth.id,
                  nickname: req.body.nickname,
                  passedPosts: data.count,
                  updatedAt: auth.updatedAt,
                  createdAt: auth.createdAt,
                },
              });
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    }
  },
};
