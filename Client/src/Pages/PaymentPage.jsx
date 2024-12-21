// PaymentPage.js
import React from 'react';
import PaymentHistory from '../components/PaymentHistory';
import { useParams } from 'react-router-dom';
import PaymentCalculator from '../components/PaymentCalculator';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

const PaymentPage = () => {
  const { loanId, loanType } = useParams();

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center  text-slate-400">Payment Details Section</h1>
      <PaymentHistory loanId={loanId} />
      <PaymentCalculator loanId={loanId} loanType={loanType} />
      <Dashboard loanId={loanId} loanType={loanType}  />
    </div>
    </Layout>
  );
};

export default PaymentPage;
