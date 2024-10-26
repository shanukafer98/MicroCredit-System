
import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    registeredAt: { type: Date, default: Date.now },
    inTimes: [{ type: Date }],  // Array for recording multiple entry times
    outTimes: [{ type: Date }]  // Array for recording multiple exit times
  });
  
  const Employee = mongoose.model('Employee', EmployeeSchema);
  export default Employee;