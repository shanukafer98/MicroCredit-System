import React, { useState } from 'react';
import usePaymentStore from '../Store/paymentStore';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const [payment, setPayment] = useState({ loanId: '', amountPaid: '' });
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="loanId"
          value={payment.loanId}
          onChange={handleChange}
          placeholder="Loan ID"
          className="input"
        />
        <input
          name="amountPaid"
          value={payment.amountPaid}
          onChange={handleChange}
          placeholder="Amount Paid"
          className="input"
        />
        <button type="submit" className="btn">Make Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;