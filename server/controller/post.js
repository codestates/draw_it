const { Post } = require('../models');

module.exports.postController = {
  getAll: async (req, res) => {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const found = await Post.findOne({ where: { id } });

    if (!found) {
      return res
        .status(404)
        .json({ message: `원하는 post를 찾을 수 없습니다.` });
    }
    res.status(200).json(found);
  },
  create: async (req, res) => {
    const { id, image, answer } = req.body;

    // ToDo 로그인 유무 확인하기

    if (!(id && image && answer)) {
      return res.status(404).json(`모든 항목을 입력해주세요`);
    }

    const created = await Post.create({ userId: id, image, answer });
    res.status(201).json(created);
  },
  delete: async (req, res) => {
    const { id } = req.params;

    // ToDo 로그인 유무 확인하기

    try {
      await Post.destroy({ where: { id } });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.sendStatus(204);
  },
  check: async (req, res) => {
    const { id: postId } = req.params;
    const answer = req.body['answer'].replace(/ /g, '');

    // ToDo 로그인 유무 확인하기

    // postId로 해당 post 찾기
    const post = await Post.findOne({ where: { id: postId } });

    if (!post) {
      return res
        .status(404)
        .json({ message: `원하는 post를 찾을 수 없습니다.` });
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
      return res.status(201).json({ message: '정답입니다' });
    }

    res.status(200).json({ message: '정답이 아닙니다' });
  },
};
