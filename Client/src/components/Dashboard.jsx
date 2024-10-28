import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
const url = import.meta.env.VITE_BACKEND_URL;



const Dashboard = ({ loanId, loanType }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState({
    totalIncome: 0,
    totalInterest: 0,
    totalLateFees: 0,
    netProfit: 0,
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Colors for pie chart segments

  // Fetch payment data based on selected date range
  const fetchData = async (loanId, loanType) => {
    try {
      const response = await axios.get(
        `${url}/api/payments/dashboard/${loanId}/${loanType}`,
        {
          params: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
          
          },
        }
      );

      // Safely parse and set the data, checking if values exist before applying `.replace()`
      setData({
        totalIncome: response.data.totalIncome ? parseFloat(response.data.totalIncome.replace('LKR ', '')) : 0,
        totalInterest: response.data.totalInterest ? parseFloat(response.data.totalInterest.replace('LKR ', '')) : 0,
        totalLateFees: response.data.totalLateFees ? parseFloat(response.data.totalLateFees.replace('LKR ', '')) : 0,
        netProfit: response.data.netProfit ? parseFloat(response.data.netProfit.replace('LKR ', '')) : 0,
      });
    } catch (error) {
      console.error('Error fetching payment data:', error);
      setData({
        totalIncome: 0,
        totalInterest: 0,
        totalLateFees: 0,
        netProfit: 0,
      });
    }
  };

  // Use useEffect to fetch data when loanId, loanType, startDate, or endDate changes
  useEffect(() => {
    if (loanId && loanType) {
      fetchData(loanId, loanType);
    }
  }, [loanId, loanType, startDate, endDate]);

  // Data for the pie chart
  const pieChartData = [
    { name: 'Net Profit', value: data.netProfit },
    { name: 'Total Interest', value: data.totalInterest },
    { name: 'Total Late Fees', value: data.totalLateFees },
  ];

  // Data for the bar chart
  const barChartData = [
    { name: 'Total Income', value: data.totalIncome },
    { name: 'Net Profit', value: data.netProfit },
    { name: 'Total Interest', value: data.totalInterest },
    { name: 'Total Late Fees', value: data.totalLateFees },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Loan Payment Dashboard</h2>

      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block font-medium">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="font-medium">Total Income</h3>
          <p>LKR {data.totalIncome.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3 className="font-medium">Net Profit</h3>
          <p>LKR {data.netProfit.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <h3 className="font-medium">Total Interest</h3>
          <p>LKR {data.totalInterest.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-red-100 rounded">
          <h3 className="font-medium">Total Late Fees</h3>
          <p>LKR {data.totalLateFees.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Income Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieChartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Income and Profit Comparison</h3>
          <BarChart width={400} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
