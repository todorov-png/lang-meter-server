import testService from '../service/test-service.js';
import clientService from '../service/client-service.js';
import tokenService from '../service/token-service.js';
import ApiError from '../exceptions/api-error.js';

class TestController {
  async getList(req, res, next) {
    try {
      const data = await testService.getList();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const tokenData = tokenService.validateRefresh(refreshToken);
      if (!tokenData) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.NOT_USER'));
      }
      const userData = await clientService.findByIdFull(tokenData.id);
      if (!userData.team) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.NOT_TEAM'));
      }
      const tests = [];
      const testList = await testService.getList();
      userData.team.tests.forEach((test) => {
        tests.push(testList.find((el) => el._id.toString() === test.toString()));
      });
      return res.json(tests);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const data = await testService.findById(req.params.id);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new TestController();
