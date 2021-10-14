require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '5h' });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, userInfo: data }, message: 'ok' });
  },
  isAuthorized: (req, res) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      res.status(401).send({
        data: null,
        message: '로그인이 되어있지 않은 사용자입니다.',
      });
    }

    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).send({
          data: null,
          message: '로그인이 되어있지 않은 사용자입니다.',
        });
      }

      const refreshTokenData = verify(refreshToken, process.env.REFRESH_SECRET);

      if (!refreshTokenData) {
        res.status(401).send({
          data: null,
          message: '로그인이 되어있지 않은 사용자입니다.',
        });
      }
      const newAccessToken = sign(refreshTokenData, process.env.ACCESS_SECRET);

      return verify(newAccessToken, process.env.ACCESS_SECRET);
    }
  },
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};
