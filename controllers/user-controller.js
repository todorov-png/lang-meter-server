import userService from '../service/user-service.js';
import teamService from '../service/team-service.js';
import roleService from '../service/role-service.js';
import ApiError from '../exceptions/api-error.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { username, email, password, role, team } = req.body;
      if (!username && !email && !password) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.CREATE.EMPTY'));
      }
      if (!/^[0-9a-zA-Z]+$/.test(username)) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.CREATE.USERNAME.ERROR'));
      }
      if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.CREATE.EMAIL.ERROR'));
      }
      if (password.length < 4) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.CREATE.PASSWORD.LONG'));
      }
      if (password.length > 32) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.CREATE.PASSWORD.SHORT'));
      }
      const isEmail = await userService.findByEmail(email);
      if (isEmail) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.CREATE.EMAIL.AVAILABLE'));
      }
      const isUsername = await userService.findByUsername(username);
      if (isUsername) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.CREATE.USERNAME.AVAILABLE'));
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuidv4();
      if (team) {
        await teamService.incUserCounter(team);
      }
      const date = Date.now();
      const userId = await userService.create(
        {
          username,
          email,
          role,
          team,
          password: hashPassword,
          activationLink,
          isActivated: true,
          activationDate: date,
          registrationDate: date,
        },
        date
      );
      return res.json(userId);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { userId, roleId, teamId } = req.body;
      const user = await userService.findById(userId);
      if (!user) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.UPDATE.NOT_FOUND'));
      }

      const responseUser = JSON.parse(JSON.stringify(user));
      const role = await roleService.getName(roleId);
      const team = await teamService.getName(teamId);

      if (user.team) {
        if (teamId) {
          if (user.team.toString() !== teamId.toString()) {
            await teamService.decUserCounter(user.team);
            await teamService.incUserCounter(teamId);
          }
        } else {
          await teamService.decUserCounter(user.team);
        }
      } else if (teamId) {
        await teamService.incUserCounter(teamId);
      }

      responseUser.role = role ? role : { name: '------', _id: null };
      responseUser.team = team ? team : { name: '------', _id: null };
      user.role = roleId;
      user.team = teamId;
      await userService.update(user._id, user);

      return res.json(responseUser);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { user } = req.body;
      const userData = await userService.findById(user);
      if (!userData) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.USER.DELETE.NOT_FOUND'));
      }
      if (userData.team) await teamService.decUserCounter(userData.team);
      await userService.delete(user);
      return res.end();
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
