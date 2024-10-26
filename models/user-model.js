import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  registrationDate: { type: Number },
  activationDate: { type: Number },
  // lastLoginDate: { type: Number },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export default model('User', UserSchema);
