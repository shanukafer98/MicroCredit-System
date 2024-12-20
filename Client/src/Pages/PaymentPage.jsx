// PaymentPage.js
import React from 'react';
import PaymentHistory from '../components/PaymentHistory';
import { useParams } from 'react-router-dom';
import PaymentCalculator from '../components/PaymentCalculator';
import Dashboard from '../components/Dashboard';

const PaymentPage = () => {
  const { loanId, loanType } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Details Section</h1>
      <PaymentHistory loanId={loanId} />
      <PaymentCalculator loanId={loanId} loanType={loanType} />
      <Dashboard loanId={loanId} loanType={loanType}  />
    </div>
  );
};

export default PaymentPage;
