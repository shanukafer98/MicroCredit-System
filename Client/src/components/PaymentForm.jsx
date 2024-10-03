import React, { useState } from 'react';
import usePaymentStore from '../Store/paymentStore';
import toast from 'react-hot-toast';

const PaymentForm = ({ loanId, loanType, onPaymentSuccess }) => {
  const [payment, setPayment] = useState({ loanId, amountPaid: '', paymentDate: '', loanType });
  const makePayment = usePaymentStore((state) => state.makePayment);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate amountPaid
    if (isNaN(payment.amountPaid) || payment.amountPaid <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    try {
      await makePayment(payment);
      console.log(payment);
      toast.success('Payment made successfully!');
      onPaymentSuccess();
    } catch (err) {
      toast.error('Failed to make payment');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="amountPaid"
        value={payment.amountPaid}
        onChange={handleChange}
        placeholder="Amount Paid"
        className="input"
      />
      <input
        type="date"
        name="paymentDate"
        value={payment.paymentDate}
        onChange={handleChange}
        placeholder="Payment Date"
        className="input"
      />
      <button type="submit" className="btn">
        Make Payment
      </button>
    </form>
  );
};

export default PaymentForm;