import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  name: { type: String, unique: true, required: true },
  permissions: {
    createTeam: { type: Boolean },
    assignTeam: { type: Boolean },
    deleteTeam: { type: Boolean },
    createRole: { type: Boolean },
    assignRole: { type: Boolean },
    deleteRole: { type: Boolean },
    createUser: { type: Boolean },
    deleteUser: { type: Boolean },
    assignTest: { type: Boolean },
  },
});

export default model('Role', RoleSchema);
