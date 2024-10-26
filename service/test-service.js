import TestModel from '../models/test-model.js';

class TestService {
  async findById(id) {
    return await TestModel.findById(id);
  }

  async findByName(name) {
    return await TestModel.findOne({
      name: new RegExp('^' + name + '$', 'i'),
    });
  }

  async getList() {
    return await TestModel.find({}, { _id: true, name: true, lang: true });
  }
}
export default new TestService();
