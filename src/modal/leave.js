import { Schema, model } from 'mongoose';

const leaveSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leave_type: {
    type: String,
    enum: ['Sick', 'Casual'],
    required: true
  },
  leave_duration: {
    type: Number,
    required: true
  },
  date_applied: {
    type: Date,
    required: true,
    default: Date.now
  },
  date_from: {
    type: Date,
    required: true
  },
  date_to: {
    type: Date,
    required: true
  }
});

const Leave = model('Leave', leaveSchema);
export default Leave;
