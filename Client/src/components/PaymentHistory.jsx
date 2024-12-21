import React, { useEffect } from 'react';
import usePaymentStore from '../Store/paymentStore';
import toast from 'react-hot-toast';

const PaymentHistory = ({ loanId }) => {
  const { payments, fetchPayments, deletePayment } = usePaymentStore();

  useEffect(() => {
    fetchPayments(loanId);
  }, [fetchPayments, loanId]);

  const handleDeletePayment = async (paymentId) => {
    try {
      await deletePayment(paymentId);
      toast.success('Payment deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete payment');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Payment History</h1>
      <div className="overflow-x-auto">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500">No payments found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b text-center">Amount Paid</th>
                <th className="py-2 px-4 border-b text-center">Payment Date</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">Rs.{payment.amountPaid}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 my-2 rounded shadow-2xl"
                      onClick={() => handleDeletePayment(payment._id)}
                    >
                      Delete Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;