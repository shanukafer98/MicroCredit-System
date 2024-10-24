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
    <div>
      {payments.map((payment) => (
        <div key={payment._id} className="payment-card">
          <p>Amount Paid: Rs.{payment.amountPaid}</p>
          <p>Payment Date: {new Date(payment.paymentDate).toLocaleDateString()}</p>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 my-2 rounded shadow-2xl" onClick={() => handleDeletePayment(payment._id)}>Delete Payment</button>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;