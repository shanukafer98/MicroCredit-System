import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plateNumber: { type: String, required: true, unique: true },
  registeredAt: { type: Date, default: Date.now },
 
});

const Guest = mongoose.model('Guest', GuestSchema);
export default Guest;