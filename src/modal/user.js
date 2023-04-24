import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  department: { type: String, required: true },
  sick_leaves: { type: Number, default: 6 },
  casual_leaves: { type: Number, default: 18 },
});

const User = model('User', userSchema);

export default User;
