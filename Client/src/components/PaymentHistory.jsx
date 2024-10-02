import React, { useEffect } from 'react';
import usePaymentStore from '../Store/paymentStore';

const PaymentHistory = ({ loanId }) => {
  const { payments, fetchPayments } = usePaymentStore();

  useEffect(() => {
    fetchPayments(loanId);
  }, [fetchPayments, loanId]);

  return (
    <div>
      {payments.map((payment) => (
        <div key={payment._id} className="payment-card">
          <p>Amount Paid: {payment.amountPaid}</p>
          <p>Payment Date: {new Date(payment.paymentDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;