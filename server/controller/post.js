const { User, Post, user_post_passed } = require('../models');
const { isAuthorized, checkRefeshToken } = require('./tokenFunctions');
const { uploadImage } = require('./uploadImage');

module.exports = {
  getAll: async (req, res) => {
    // ToDo 로그인 유무 확인하기
    const userId = req.query['userid'];

    const auth = checkRefeshToken(req.cookies['refreshToken']);

    if (!auth) {
      return res.status(401).json({
        data: null,
        message: '권한이 없는 요청입니다.',
      });
    }

    if (userId) {
      // query로 userId가 입력되었을 때,
      const myPosts = await Post.findAll({
        where: { userId },
        include: [{ model: User, attributes: ['nickname', 'id'] }],
      });
      return res.status(200).json({
        data: myPosts,
        message: '모든 퀴즈를 조회하는데 성공했습니다.',
      });
    }

    // 아무 입력을 받지 않아 모든 posts를 전달
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['nickname', 'id'] }],
    });
    return res
      .status(200)
      .json({ data: posts, message: '모든 퀴즈를 조회하는데 성공했습니다.' });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const auth = checkRefeshToken(req.cookies['refreshToken']);

    if (!auth) {
      return res.status(401).json({
        data: null,
        message: '권한이 없는 요청입니다.',
      });
    }

    const post = await Post.findOne({
      where: { id },
      include: [{ model: User, attributes: ['nickname', 'id'] }],
    });

    if (!post) {
      return res
        .status(404)
        .json({ data: null, message: '원하는 post를 찾을 수 없습니다.' });
    }

    try {
      const isPassed = await user_post_passed.findOne({
        where: { userId: auth.id, postId: id },
      });

      return res.status(200).json({
        data: { post, isPassed: isPassed ? true : false },
        message: '퀴즈 조회에 성공했습니다.',
      });
    } catch (err) {
      console.log(err);
    }
  },
  create: async (req, res) => {
    const answer = req.files.file.name.replace(/ /g, '');
    const image = req.files.file;

    const auth = checkRefeshToken(req.cookies['refreshToken']);

    if (!auth) {
      return res.status(401).json({
        data: null,
        message: '권한이 없는 요청입니다.',
      });
    }

    if (!(image && answer)) {
      return res.status(404).json({ message: '모든 항목을 입력해주세요' });
    }

    try {
      const imageUrl = await uploadImage(image, auth.id);

      const created = await Post.create({
        userId: auth.id,
        image: imageUrl.Location,
        answer,
      });
      res
        .status(201)
        .json({ data: created, message: '퀴즈 업로드에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const auth = checkRefeshToken(req.cookies['refreshToken']);

    if (!auth) {
      return res.status(401).json({
        data: null,
        message: '권한이 없는 요청입니다.',
      });
    }

    const post = await Post.findOne({ where: { id, userId: auth.id } });

    if (!post) {
      return res
        .status(200)
        .json({ data: null, message: '존재하지 않는 퀴즈입니다.' });
    }

    try {
      await Post.destroy({ where: { id } });
      return res
        .status(200)
        .json({ data: post, message: '퀴즈 삭제에 성공했습니다.' });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
  check: async (req, res) => {
    const { id } = req.params;
    const answer = req.body['answer'].replace(/ /g, '');

    // ToDo 로그인 유무 확인하기

    const auth = isAuthorized(req, res);

    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res
        .status(404)
        .json({ message: `원하는 퀴즈를 찾을 수 없습니다.` });
    }

    const isPassed = await user_post_passed.findOne({
      where: { userId: auth.id, postId: post.id },
    });

    if (isPassed) {
      return res
        .status(200)
        .json({ data: null, message: '이미 정답을 맞힌 문제입니다.' });
    }

    // post의 값과 전달받은 answer가 일치한지 확인
    if (post.answer === answer) {
      // 일치하므로 해당 유저와 연결된 user_post_passed를 생성

      try {
        const created = await user_post_passed.create({
          userId: auth.id,
          postId: id,
        });
        return res.status(201).json({ data: created, message: '정답입니다.' });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ data: null, message: '알 수 없는 에러가 발생했습니다.' });
      }
    }

    res.status(200).json({ data: null, message: '정답이 아닙니다' });
  },
};
