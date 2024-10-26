import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plateNumber: { type: String, required: true, unique: true },
  registeredAt: { type: Date, default: Date.now },
  inTimes: [{ type: Date }],  // Array for recording multiple entry times
  outTimes: [{ type: Date }]  // Array for recording multiple exit times
});

const Guest = mongoose.model('Guest', GuestSchema);
export default Guest;