import { Schema, model } from 'mongoose';

const TeamSchema = new Schema({
  name: { type: String, required: true },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  members: { type: Number, required: true, default: 0 },
  linkTg: { type: String },
});

export default model('Team', TeamSchema);
