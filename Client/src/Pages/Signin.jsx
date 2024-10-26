// import { useState } from "react";
// import axios from "axios";
// import { Toaster, toast } from "react-hot-toast";

// export const Signin = () => {
//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user.username || !user.email || !user.password) {
//       toast.error("All fields are required");
//     }
//     try {
//       setLoading(true);
//       const response = await axios.post("http://localhost:5000/signin", user);
//       console.log(response.data);
//       toast.success("Signin successful");
//     } catch (error) {
//       toast.error("An error occurred during signin");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="max-w-md w-full mx-auto p-4 bg-white shadow-md rounded-lg">
//         <h1 className="text-center text-2xl font-bold mb-6">Sign In</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium mb-2"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               id="username"
//               value={user.username}
//               onChange={(e) => setUser({ ...user, username: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               id="password"
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//         <p className="text-center mt-4">
//           Don't have an account?{" "}
//           <a href="/Signup" className="text-blue-500 hover:text-blue-700">
//             Signup
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [result, setResult] = useState(null);
  const [records, setRecords] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeePlate, setEmployeePlate] = useState('');

  const handleCheckPlate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/vehicle/check-plate', { plateNumber });
      setResult(response.data);
      await fetchRecords(); // Fetch records after checking the plate
    } catch (error) {
      console.error('Error checking plate number', error);
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

  const handleRegisterGuest = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/vehicle/register-guest', { name: guestName, plateNumber });
      alert(response.data.message);
      // Update result to show guest details instead of input fields
      setResult({
        type: 'guest',
        guest: {
          name: guestName,
          plateNumber,
          registeredAt: new Date().toLocaleString(),
        },
      });
      setGuestName(''); // Clear guest name input
      await fetchRecords(); // Fetch records after guest registration
    } catch (error) {
      console.error('Error registering guest', error);
    }
  };

  const handleRegisterEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/vehicle/register-employee', { name: employeeName, plateNumber: employeePlate });
      alert(response.data.message);
      setEmployeeName(''); // Reset employee name field
      setEmployeePlate(''); // Reset employee plate field
      await fetchRecords(); // Fetch records after employee registration
    } catch (error) {
      console.error('Error registering employee', error);
    }
  };

  const handleRecordTime = async (type) => {
    try {
      const endpoint = type === 'in' 
        ? 'http://localhost:3000/api/vehicle/record-in'
        : 'http://localhost:3000/api/vehicle/record-out';
        
      const response = await axios.post(endpoint, { plateNumber });
      alert(response.data.message);
      await fetchRecords(); // Fetch updated records after recording time
    } catch (error) {
      console.error(`Error recording ${type} time`, error);
    }
  };

  return (
    <div className="container mx-auto p-6">
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

      {/* Display Records */}
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

      {/* Display Results for Employee or Guest Registration */}
      {result && result.type === 'employee' && (
        <div className="bg-green-100 border border-green-300 text-green-900 p-4 rounded-lg mt-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Employee Found</h2>
          <p><strong>Name:</strong> {result.employee.name}</p>
          <p><strong>Plate Number:</strong> {result.employee.plateNumber}</p>
          {/* Buttons to record in and out time for employees */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => handleRecordTime('in')}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Record In
            </button>
            <button
              onClick={() => handleRecordTime('out')}
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

      {/* Employee Registration Section */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Register Employee</h2>
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="Enter employee name"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          value={employeePlate}
          onChange={(e) => setEmployeePlate(e.target.value)}
          placeholder="Enter employee plate number"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleRegisterEmployee}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
        >
          Register Employee
        </button>
      </div>
    </div>
  );
};

export default Signin;
