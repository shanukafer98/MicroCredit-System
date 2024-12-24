import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
const url = import.meta.env.VITE_BACKEND_URL;

const PaymentCalculator = () => {
  const { loanId, loanType } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const displayResults = Array.isArray(results) ? results : [];

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${url}/api/payments/${loanId}/${loanType}`);
        setResults(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        toast.error('Failed to fetch payment calculations');
      }
    };

    fetchResults();
  }, [loanId, loanType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const isType1 = results.length > 0 && results[0].total_unpaidInterest !== undefined;
  const isType2 = results.length > 0 && results[0].total_unpaidInstallment !== undefined;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Calculator Results</h1>
      <div className="overflow-x-auto">
        {displayResults.length === 0 ? (
          <p className="text-center text-gray-500">No results found.</p>
        ) : (
          <motion.table
            className="min-w-full bg-white border border-gray-200 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Payment</th>
                <th className="py-2 px-4 border-b">Late Fee</th>
                <th className="py-2 px-4 border-b">Total Late Fee</th>
                {isType1 && <th className="py-2 px-4 border-b">Total Unpaid Interest</th>}
                {isType2 && <th className="py-2 px-4 border-b">Total Unpaid Installment</th>}
                {isType2 && <th className="py-2 px-4 border-b">Fixed Monthly Installment</th>}
                <th className="py-2 px-4 border-b">Interest</th>
                <th className="py-2 px-4 border-b">Principal Amount</th>
                <th className="py-2 px-4 border-b">Total Due</th>
                <th className="py-2 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {displayResults.map((result, index) => (
                <motion.tr
                  key={index}
                  className="hover:bg-green-100"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <td className="py-2 px-4 border-b">{result.payment}</td>
                  <td className="py-2 px-4 border-b">{result.lateFee}</td>
                  <td className="py-2 px-4 border-b">{result.total_lateFee}</td>
                  {isType1 && <td className="py-2 px-4 border-b">{result.total_unpaidInterest}</td>}
                  {isType2 && <td className="py-2 px-4 border-b">{result.total_unpaidInstallment}</td>}
                  {isType2 && <td className="py-2 px-4 border-b">{result.fixed_monthly_installment}</td>}
                  <td className="py-2 px-4 border-b">{result.interest}</td>
                  <td className="py-2 px-4 border-b">{result.principalAmount}</td>
                  <td className="py-2 px-4 border-b">{result.total_due}</td>
                  <td className="py-2 px-4 border-b">
                    <ul className="list-disc pl-4">
                      {result.calculation_steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
    </div>
  );
};

export default PaymentCalculator;