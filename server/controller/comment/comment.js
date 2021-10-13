const { Comment, Post, User } = require('../../models');
const { checkRefeshToken } = require('../tokenFunctions');

module.exports = {
  getComment: async (req, res) => {
    const { id } = req.params;

    try {
      const comments = await Comment.findAll({
        where: { postId: id },
        include: [{ model: User, attributes: ['nickname'] }],
      });

      res
        .status(200)
        .json({ data: comments, message: '코멘트 조회 성공했습니다.' });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ data: null, message: '코멘트 조회 실패하였습니다.' });
    }
  },
  uploadComment: async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const auth = checkRefeshToken(req.cookies['refreshToken']);

    if (!auth) {
      return res.status(401).json({
        data: null,
        message: '권한이 없는 요청입니다.',
      });
    }

    const user = await User.findOne({ where: { id: auth.id } });

    if (!user) {
      return res.status(401).json({
        data: null,
        message: '권한이 없는 요청입니다.',
      });
    }

    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res
        .status(404)
        .json({ message: `원하는 퀴즈를 찾을 수 없습니다.` });
    }

    const created = await Comment.create({
      text,
      userId: user.id,
      postId: post.id,
    });

    res
      .status(201)
      .json({ data: created, message: '댓글 작성 완료하였습니다.' });
  },
};
