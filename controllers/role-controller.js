import roleService from '../service/role-service.js';
import userService from '../service/user-service.js';
import ApiError from '../exceptions/api-error.js';

class RoleController {
  async create(req, res, next) {
    try {
      const { name, permissions } = req.body;
      if (!Object.keys(permissions).length) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.ROLE.NOT_PERMISSIONS'));
      }
      const isRole = await roleService.findByName(name);
      if (isRole) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.ROLE.HAS_ALREADY'));
      }
      const data = await roleService.create(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { _id, name } = req.body;
      let role = await roleService.findById(_id);
      if (!role) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.ROLE.NOT_FOUND'));
      }
      const isRole = await roleService.findByName(name);
      if (isRole && isRole._id.toString() !== role._id.toString()) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.ROLE.HAS_ALREADY'));
      }
      await roleService.update(_id, req.body);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { role } = req.body;
      const isRole = await roleService.findById(role);
      if (!isRole) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.ROLE.NOT_FOUND'));
      }
      await roleService.delete(role);
      await userService.clearRole(role);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteList(req, res, next) {
    try {
      const { roles } = req.body;
      for (const role of roles) {
        const isRole = await roleService.findById(role);
        if (!isRole) {
          throw ApiError.BadRequerest(req.t('CONTROLLER.ROLE.NOT_FOUND'));
        }
        await roleService.delete(role);
        await userService.clearRole(role);
      }
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async getList(req, res, next) {
    try {
      const data = await roleService.getList();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await roleService.getAll();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new RoleController();
