import TeamModel from '../models/team-model.js';

class TeamService {
  async findById(id) {
    return await TeamModel.findById(id);
  }

  async findByName(name) {
    return await TeamModel.findOne({
      name: new RegExp('^' + name + '$', 'i'),
    });
  }

  async create(data) {
    return await TeamModel.create(data);
  }

  async update(id, data) {
    await TeamModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    await TeamModel.deleteOne({ _id: id });
  }

  async getAll() {
    return await TeamModel.find();
  }

  async getList() {
    return await TeamModel.find({}, { _id: true, name: true });
  }

  async getName(id) {
    return await TeamModel.findOne({ _id: id }, { _id: true, name: true });
  }

  async incUserCounter(id) {
    await TeamModel.updateOne({ _id: id }, { $inc: { members: 1 } });
  }

  async decUserCounter(id) {
    await TeamModel.updateOne({ _id: id }, { $inc: { members: -1 } });
  }
}
export default new TeamService();
