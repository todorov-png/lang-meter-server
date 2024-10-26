import { Schema, model } from 'mongoose';

const HistorySchema = new Schema({
  test: { type: Schema.Types.ObjectId, required: true, ref: 'Test' },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  correctAnswers: { type: Number, required: true, default: 0 },
});

export default model('History', HistorySchema);
