import RoleModel from '../models/role-model.js';

class RoleService {
  async findById(id) {
    return await RoleModel.findById(id);
  }

  async findByName(name) {
    return await RoleModel.findOne({
      name: new RegExp('^' + name + '$', 'i'),
    });
  }

  async create(data) {
    return await RoleModel.create(data);
  }

  async update(id, data) {
    await RoleModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    await RoleModel.deleteOne({ _id: id });
  }

  async getList() {
    return await RoleModel.find({}, { _id: true, name: true });
  }

  async getAll() {
    return await RoleModel.find();
  }

  async getName(id) {
    return await RoleModel.findOne({ _id: id }, { _id: true, name: true });
  }
}

export default new RoleService();
