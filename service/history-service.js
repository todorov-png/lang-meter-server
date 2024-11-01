import HistoryModel from '../models/history-model.js';

class HistoryService {
  async create(data) {
    return await HistoryModel.create(data);
  }

  async getUserAll(id) {
    return await HistoryModel.find({ user: id }).populate('test', ['name', 'lang']);
  }
}

export default new HistoryService();
