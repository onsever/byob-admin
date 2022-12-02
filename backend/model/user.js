import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
}, {
  timestamps: true,
})

const userModel = new mongoose.model('user', userSchema)
export default userModel;