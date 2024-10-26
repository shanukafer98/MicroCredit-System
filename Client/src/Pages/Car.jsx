import React, { useState } from 'react';
import axios from 'axios';

const Car = () =>  {
  const [plateNumber, setPlateNumber] = useState('');
  const [result, setResult] = useState(null);
  const [guestName, setGuestName] = useState('');

  const handleCheckPlate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/vehicle/check-plate', { plateNumber });
      setResult(response.data);
    } catch (error) {
      console.error('Error checking plate number', error);
    }
  };

  const handleRegisterGuest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/vehicle/register-guest', { name: guestName, plateNumber });
      alert(response.data.message);
      setResult(null);  // Reset form after registration
    } catch (error) {
      console.error('Error registering guest', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Vehicle Plate Check</h1>

      {/* Plate Number Input Section */}
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          placeholder="Enter vehicle plate number"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full max-w-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleCheckPlate}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Check
        </button>
      </div>

      {/* Display Results for Employee or Guest Registration */}
      {result && result.type === 'employee' && (
        <div className="bg-green-100 border border-green-300 text-green-900 p-4 rounded-lg mt-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Employee Found</h2>
          <p><strong>Name:</strong> {result.employee.name}</p>
          <p><strong>Plate Number:</strong> {result.employee.plateNumber}</p>
        </div>
      )}

      {result && result.type === 'guest' && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded-lg mt-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Guest Registration</h2>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Enter guest name"
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:border-yellow-500"
          />
          <button
            onClick={handleRegisterGuest}
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
          >
            Register Guest
          </button>
        </div>
      )}
    </div>
  );
}

export default Car;
