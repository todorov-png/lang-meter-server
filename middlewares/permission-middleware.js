import ApiError from '../exceptions/api-error.js';
import tokenService from '../service/token-service.js';
import UserModel from '../models/user-model.js';

export default async function (req, res, next) {
  const { refreshToken } = req.cookies;
  const userData = tokenService.validateRefresh(refreshToken);
  const user = await UserModel.findById(userData.id, {
    role: true,
  }).populate('role', 'permissions');
  const permissionsUser = user && user.role ? user.role.permissions : {};
  const permissions = this ? this : [];
  if (permissions.some((item) => permissionsUser[item])) {
    return next();
  }
  return next(ApiError.NotFoundError());
}
