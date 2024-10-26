import { Schema, model } from 'mongoose';

const PermissionSchema = new Schema({
  name: { type: String, unique: true, required: true },
});

export default model('Permission', PermissionSchema);
