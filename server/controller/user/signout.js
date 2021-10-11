module.exports = (req, res) => {
  res.cookie('refreshToken', '', { path: '/', httpOnly: true });
  // res.set(
  //   'Set-Cookie',
  //   'refreshToken=null; accessToken=null; Domain=localhost; Path=/; Secure; HttpOnly; SameSite=None;'
  // );

  res.status(205).send({ message: '로그아웃 되었습니다.' });
};
