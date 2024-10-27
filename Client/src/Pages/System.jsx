


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const System = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [result, setResult] = useState(null);
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeePlate, setEmployeePlate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (plateNumber) {
        fetchRecords();
        fetchAllRecords();
      }
    }, 1000); // Fetch records every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [plateNumber]);

  const handleCheckPlate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/vehicle/check-plate', { plateNumber });
      setResult(response.data);
      await fetchRecords(); // Fetch records after checking the plate
      toast.success('Plate number checked successfully!');
    } catch (error) {
      console.error('Error checking plate number', error);
      toast.error('Error checking plate number');
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/vehicle/records/${plateNumber}`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records', error);
      setRecords([]); // Reset records if there's an error
    }
  };

  const fetchAllRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/vehicle/all-records');
      setAllRecords(response.data);
    } catch (error) {
      console.error('Error fetching all records', error);
      setAllRecords([]); // Reset records if there's an error
    }
  };

  const handleRegisterGuest = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/vehicle/register-guest', { name: guestName, plateNumber });
      toast.success(response.data.message);
      setResult({
        type: 'guest',
        guest: {
          name: guestName,
          plateNumber,
          registeredAt: new Date().toLocaleString(),
        },
      });
      setGuestName('');
      await fetchRecords();
    } catch (error) {
      console.error('Error registering guest', error);
      toast.error('Error registering guest');
    }
  };

  const handleRegisterEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/vehicle/register-employee', { name: employeeName, plateNumber: employeePlate });
      toast.success(response.data.message);
      setEmployeeName('');
      setEmployeePlate('');
      await fetchRecords();
    } catch (error) {
      console.error('Error registering employee', error);
      toast.error('Error registering employee');
    }
  };

  const handleRecordTime = async (type, userType) => {
    try {
      const endpoint = userType === 'employee'
        ? `http://localhost:3000/api/vehicle/employee/record-${type}`
        : `http://localhost:3000/api/vehicle/guest/record-${type}`;
        
      const response = await axios.post(endpoint, { plateNumber, vehicleType: userType });
      toast.success(response.data.message);
      await fetchRecords();
    } catch (error) {
      console.error(`Error recording ${type} time for ${userType}`, error);
      toast.error(`Error recording ${type} time for ${userType}`);
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-row">
      <Toaster />
      {/* Left Section: Input Fields and Buttons */}
      <div className="flex-1 flex flex-col items-center mr-4">
        <h1 className="text-3xl font-bold text-center mb-6">Vehicle Plate Check and Registration</h1>

        {/* Plate Number Check Section */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="Enter vehicle plate number to check"
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full max-w-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCheckPlate}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Check Plate
          </button>
        </div>


        {/* Display Results for Employee or Guest Registration */}
        {result && result.type === 'employee' && (
          <div className="bg-green-100 border border-green-300 text-green-900 p-4 rounded-lg mt-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Employee Found</h2>
            <p><strong>Name:</strong> {result.employee.name}</p>
            <p><strong>Plate Number:</strong> {result.employee.plateNumber}</p>
            <p><strong>Registered Date:</strong> {new Date(result.employee.registeredAt).toLocaleDateString()}</p>
            <p><strong>Registered Time:</strong> {new Date(result.employee.registeredAt).toLocaleTimeString()}</p>
            {/* Buttons to record in and out time for employees */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleRecordTime('in', 'employee')}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Record In
              </button>
              <button
                onClick={() => handleRecordTime('out', 'employee')}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Record Out
              </button>
            </div>
          </div>
        )}

        {result && result.type === 'guest' && result.guest && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded-lg mt-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Guest Registration</h2>
            <p><strong>Name:</strong> {result.guest.name}</p>
            <p><strong>Plate Number:</strong> {result.guest.plateNumber}</p>
            <p><strong>Registered Date:</strong> {new Date(result.guest.registeredAt).toLocaleDateString()}</p>
            <p><strong>Registered Time:</strong> {new Date(result.guest.registeredAt).toLocaleTimeString()}</p>
            {/* Buttons to record in and out time for guests */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleRecordTime('in', 'guest')}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Record In
              </button>
              <button
                onClick={() => handleRecordTime('out', 'guest')}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Record Out
              </button>
            </div>
          </div>
        )}

        {result && result.type === 'guest' && !result.guest && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded-lg mt-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Guest Registration</h2>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter guest name"
              className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleRegisterGuest}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Register Guest
            </button>
          </div>
        )}

        {/* Employee Registration Section */}
        <div className="mt-6 flex flex-col w-2/4 items-center ">
  <h2 className="text-2xl font-bold mb-4">Register Employee</h2>
  <input
    type="text"
    value={employeeName}
    onChange={(e) => setEmployeeName(e.target.value)}
    placeholder="Enter employee name"
    className="border border-gray-300 rounded-lg p-3 mb-4 w-full max-w-md focus:outline-none focus:border-blue-500"
  />
  <input
    type="text"
    value={employeePlate}
    onChange={(e) => setEmployeePlate(e.target.value)}
    placeholder="Enter employee plate number"
    className="border border-gray-300 rounded-lg p-3 mb-4 w-full max-w-md focus:outline-none focus:border-blue-500"
  />
  <button
    onClick={handleRegisterEmployee}
    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
  >
    Register Employee
  </button>
</div>


{records.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Records for {plateNumber}</h2>
            <ul className="bg-gray-100 p-4 rounded-lg">
              {records.map((record) => (
                <li key={record._id} className="mb-2">
                  <p><strong>Type:</strong> {record.type}</p>
                  <p><strong>Recorded At:</strong> {new Date(record.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Right Section: Display All Records */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">All Records</h2>
        <button
          onClick={fetchAllRecords}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-4"
        >
          Fetch All Records
        </button>
        <ul className="bg-gray-100 p-4 rounded-lg">
          {allRecords.map((record) => (
            <li key={record._id} className="mb-2">
              <p><strong>Type:</strong> {record.type}</p>
              <p><strong>Recorded At:</strong> {new Date(record.timestamp).toLocaleString()}</p>
              <p><strong>Plate Number:</strong> {record.plateNumber}</p>
              <p><strong>Name:</strong> {record.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default System;
