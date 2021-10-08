module.exports = {
  userController: {
    signup: require('./user/signup'),
    signin: require('./user/signin'),
    signout: require('./user/signout'),
    mypage: require('./user/mypage'),
  },
  postController: {
    post: require('./post'),
  },
};
