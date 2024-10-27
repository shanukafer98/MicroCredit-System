// routes/vehicle.js
import express from 'express';
import Employee from '../models/Employee.modal.js';
import Guest from '../models/Guest.modal.js';
import VehicleRecord from '../models/inandout.model.js';

const router = express.Router();

// Check if the vehicle plate number exists
router.post('/check-plate', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const employee = await Employee.findOne({ plateNumber });
    if (employee) return res.json({ type: 'employee', employee });
    const guest = await Guest.findOne({ plateNumber });
    if (guest) return res.json({ type: 'guest', guest });
    return res.json({ type: 'guest', message: 'Guest registration required' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Register a new guest
router.post('/register-guest', async (req, res) => {
  const { name, plateNumber } = req.body;
  try {
    const guest = new Guest({ name, plateNumber });
    await guest.save();
    res.json({ message: 'Guest registered successfully', guest });
  } catch (error) {
    res.status(500).json({ message: 'Error registering guest', error });
  }
});

// Register a new employee
router.post('/register-employee', async (req, res) => {
  const { name, plateNumber } = req.body;
  try {
    const employee = new Employee({ name, plateNumber });
    await employee.save();
    res.json({ message: 'Employee registered successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error registering employee', error });
  }
});

// Record guest check-in time
router.post('/guest/record-in', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const guest = await Guest.findOne({ plateNumber });
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    


    const vehicleRecord = new VehicleRecord({
      vehicleType: 'guest',
      vehicleId: guest._id,
      type: 'in',
    });
    await vehicleRecord.save();

    res.json({ message: 'Guest check-in recorded' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording guest check-in', error });
  }
});

// Record employee check-in time
router.post('/employee/record-in', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const employee = await Employee.findOne({ plateNumber });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    


    const vehicleRecord = new VehicleRecord({
      vehicleType: 'employee',
      vehicleId: employee._id,
      type: 'in',
    });
    await vehicleRecord.save();

    res.json({ message: 'Employee check-in recorded' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording employee check-in', error });
  }
});

// Record guest check-out time
router.post('/guest/record-out', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const guest = await Guest.findOne({ plateNumber });
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    

    const vehicleRecord = new VehicleRecord({
      vehicleType: 'guest',
      vehicleId: guest._id,
      type: 'out',
    });
    await vehicleRecord.save();

    res.json({ message: 'Guest check-out recorded' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording guest check-out', error });
  }
});

// Record employee check-out time
router.post('/employee/record-out', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const employee = await Employee.findOne({ plateNumber });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    


    const vehicleRecord = new VehicleRecord({
      vehicleType: 'employee',
      vehicleId: employee._id,
      type: 'out',
    });
    await vehicleRecord.save();

    res.json({ message: 'Employee check-out recorded' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording employee check-out', error });
  }
});

// Fetch records for a specific plate number
router.get('/records/:plateNumber', async (req, res) => {
  const { plateNumber } = req.params;
  try {
    const employee = await Employee.findOne({ plateNumber });
    const guest = await Guest.findOne({ plateNumber });

    if (!employee && !guest) {
      return res.status(404).json({ message: 'No records found for this plate number' });
    }

    const vehicleId = employee ? employee._id : guest._id;
    const records = await VehicleRecord.find({ vehicleId }).sort({ timestamp: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error });
  }
});


router.get('/all-records', async (req, res) => {
  try {
    // Fetch all records
    const records = await VehicleRecord.find().sort({ timestamp: -1 });

  
    const employeeRecords = records.filter(record => record.vehicleType === 'employee');
    const guestRecords = records.filter(record => record.vehicleType === 'guest');




    const populatedGuestRecords = await VehicleRecord.populate(guestRecords, {
      path: 'vehicleId',
      model: 'Guest',
      select: 'name plateNumber',
    });


    const populatedEmployeeRecords = await VehicleRecord.populate(employeeRecords, {
      path: 'vehicleId',
      model: 'Employee',
      select: 'name plateNumber',
    });

    const populatedRecords = [...populatedEmployeeRecords, ...populatedGuestRecords];

    populatedRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

   
    const exportData = populatedRecords.map(record => ({
      vehicleType: record.vehicleType,
      vehicleId: record.vehicleId ? record.vehicleId._id : null,
      name: record.vehicleId ? record.vehicleId.name : null,
      plateNumber: record.vehicleId ? record.vehicleId.plateNumber : null,
      type: record.type,
      timestamp: record.timestamp,
    }));

    res.json(exportData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


export default router;
