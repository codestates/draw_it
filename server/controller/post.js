const { Post } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    // ToDo 로그인 유무 확인하기
    const userId = req.query['userid'];

    if (userId) {
      // query로 userId가 입력되었을 때,
      const myPosts = await Post.findAll({ where: { userId } });
      return res.status(200).json({
        data: myPosts,
        message: '모든 퀴즈를 조회하는데 성공했습니다.',
      });
    }

    // 아무 입력을 받지 않아 모든 posts를 전달
    const posts = await Post.findAll();
    return res
      .status(200)
      .json({ data: posts, message: '모든 퀴즈를 조회하는데 성공했습니다.' });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const post = await Post.findAll({ where: { id } });
    if (!post) {
      return res
        .status(404)
        .json({ data: null, message: '원하는 post를 찾을 수 없습니다.' });
    }
    return res
      .status(200)
      .json({ data: post, message: '퀴즈 조회에 성공했습니다.' });
  },
  create: async (req, res) => {
    const { userId = 1, image, answer } = req.body;

    // ToDo 로그인 유무 확인하기

    if (!(userId && image && answer)) {
      return res.status(404).json({ message: '모든 항목을 입력해주세요' });
    }

    try {
      const created = await Post.create({ userId, image, answer });
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

    // ToDo 로그인 유무 확인하기

    const post = await Post.findOne({ where: { id } });

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

    // postId로 해당 post 찾기
    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res
        .status(404)
        .json({ message: `원하는 퀴즈를 찾을 수 없습니다.` });
    }

    // post의 값과 전달받은 answer가 일치한지 확인
    if (post.answer === answer) {
      // 일치하므로 해당 유저와 연결된 user_post_passed를 생성
      /*
      const created = await user_post_passed.create({ userId, postId });

      // 해당 유저와 연결된 user_post_passed count 조회

      const passedPosts = user_post_passed.count({ where: { userId } });

      return res.send(201).json({ data: '데이터' });

      */
      // 임시 응답
      return res.status(201).json({ /*data: ,*/ message: '정답입니다' });
    }

    res.status(200).json({ data: null, message: '정답이 아닙니다' });
  },
};
