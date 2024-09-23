import React, { useState } from 'react';
import usePaymentStore from '../Store/paymentStore';
import toast from 'react-hot-toast';

const PaymentForm = ({ loanId }) => {
  const [payment, setPayment] = useState({ loanId, amountPaid: '' });
  const makePayment = usePaymentStore((state) => state.makePayment);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await makePayment(payment);
    toast.success('Payment made successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="amountPaid" value={payment.amountPaid} onChange={handleChange} placeholder="Amount Paid" className="input" />
      <button type="submit" className="btn">Make Payment</button>
    </form>
  );
};

export default PaymentForm;