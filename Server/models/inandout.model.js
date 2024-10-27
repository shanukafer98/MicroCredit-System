import mongoose from 'mongoose';

const VehicleRecordSchema = new mongoose.Schema({
  vehicleType: { type: String, enum: ['employee', 'guest'], required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'vehicleType' },
  type: { type: String, enum: ['in', 'out'], required: true },
  timestamp: { type: Date, default: Date.now, required: true }
});

const VehicleRecord = mongoose.model('VehicleRecord', VehicleRecordSchema);
export default VehicleRecord;