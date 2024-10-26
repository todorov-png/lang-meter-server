import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js';

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  validateAccess(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefresh(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async save(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.save();
    } else {
      await tokenModel.create({ user: userId, refreshToken });
    }
  }

  async delete(refreshToken) {
    await tokenModel.deleteOne({ refreshToken });
  }

  async get(refreshToken) {
    return await tokenModel.findOne({ refreshToken });
  }
}

export default new TokenService();
