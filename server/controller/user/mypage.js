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

      res.status(200).json({
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

  edit: async (req, res) => {
    const auth = isAuthorized(req, res);
    const { nickname } = req.body;

    try {
      await User.update({ nickname }, { where: { id: auth.id } });

      const count = await user_post_passed.count({
        where: { userId: auth.id },
      });

      const user = await User.findOne({ where: { id: auth.id } });

      res.status(200).json({
        data: {
          id: user.id,
          nickname: user.nickname,
          passedPosts: count,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        },
        message: '마이페이지 변경 성공하였습니다.',
      });
    } catch (err) {
      res
        .status(500)
        .json({ data: null, message: '마이페이지 변경 실패하였습니다.' });
    }
  },
};
