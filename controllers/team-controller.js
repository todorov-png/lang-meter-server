import ApiError from '../exceptions/api-error.js';
import teamService from '../service/team-service.js';
import userService from '../service/user-service.js';

class TeamController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const isTeam = await teamService.findByName(name);
      if (isTeam) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.TEAM.HAS_ALREADY'));
      }
      //TODO тут добавить тесты
      const data = await teamService.create(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { _id, name } = req.body;
      let team = await teamService.findById(_id);
      if (!team) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.TEAM.NOT_FOUND'));
      }
      const isTeam = await teamService.findByName(name);
      if (isTeam && isTeam._id.toString() !== team._id.toString()) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.TEAM.HAS_ALREADY'));
      }
      await teamService.update(_id, req.body);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { team } = req.body;
      const isTeam = await teamService.findById(team);
      if (!isTeam) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.TEAM.NOT_FOUND'));
      }
      await teamService.delete(team);
      await userService.clearTeam(team);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async getList(req, res, next) {
    try {
      const data = await teamService.getList();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await teamService.getAll();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new TeamController();
