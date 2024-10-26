
const router = express.Router();
import express from 'express';
import Employee from '../models/Employee.js';
import Guest from '../models/Guest.js';

// Check if the plate number belongs to an employee or guest
router.post('/check-plate', async (req, res) => {
  const { plateNumber } = req.body;

  try {
    // Check if the plate number belongs to an employee
    const employee = await Employee.findOne({ plateNumber });
    if (employee) {
      return res.json({ type: 'employee', employee });
    }

    // If not an employee, check if it's already registered as a guest
    const guest = await Guest.findOne({ plateNumber });
    if (guest) {
      return res.json({ type: 'guest', guest });
    }

    // If not found in either, mark it as a new guest
    return res.json({ type: 'guest', message: 'Guest registration required' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Register a new guest
router.post('/register-guest', async (req, res) => {
  const { name, plateNumber } = req.body;

  try {
    // Check if the guest is already registered
    const existingGuest = await Guest.findOne({ plateNumber });
    if (existingGuest) {
      return res.status(400).json({ message: 'Guest already registered' });
    }

    // Register the new guest
    const newGuest = new Guest({ name, plateNumber });
    await newGuest.save();

    res.json({ message: 'Guest registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Register a new employee
router.post('/register-employee', async (req, res) => {
  const { name, plateNumber } = req.body;

  try {
    // Check if the employee is already registered
    const existingEmployee = await Employee.findOne({ plateNumber });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already registered' });
    }

    // Register the new employee
    const newEmployee = new Employee({ name, plateNumber });
    await newEmployee.save();

    res.json({ message: 'Employee registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/api/employee/record-in', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const employee = await Employee.findOneAndUpdate(
      { plateNumber },
      { inTime: new Date() },
      { new: true }
    );
    if (employee) {
      res.json({ message: 'In time recorded successfully.', employee });
    } else {
      res.status(404).json({ message: 'Employee not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error recording in time.', error });
  }
});

// Record "Out" time for an Employee
router.post('/api/employee/record-out', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const employee = await Employee.findOneAndUpdate(
      { plateNumber },
      { outTime: new Date() },
      { new: true }
    );
    if (employee) {
      res.json({ message: 'Out time recorded successfully.', employee });
    } else {
      res.status(404).json({ message: 'Employee not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error recording out time.', error });
  }
});

// Record "In" time for a Guest
router.post('/api/guest/record-in', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const guest = await Guest.findOneAndUpdate(
      { plateNumber },
      { inTime: new Date() },
      { new: true }
    );
    if (guest) {
      res.json({ message: 'In time recorded successfully.', guest });
    } else {
      res.status(404).json({ message: 'Guest not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error recording in time.', error });
  }
});

// Record "Out" time for a Guest
router.post('/api/guest/record-out', async (req, res) => {
  const { plateNumber } = req.body;
  try {
    const guest = await Guest.findOneAndUpdate(
      { plateNumber },
      { outTime: new Date() },
      { new: true }
    );
    if (guest) {
      res.json({ message: 'Out time recorded successfully.', guest });
    } else {
      res.status(404).json({ message: 'Guest not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error recording out time.', error });
  }
});

router.get('/records/:plateNumber', async (req, res) => {
  const { plateNumber } = req.params;

  try {
    const records = await Vehicle.find({ plateNumber });
    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this plate number' });
    }
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
