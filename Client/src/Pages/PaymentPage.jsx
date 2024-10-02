import React from 'react';
import PaymentForm from '../components/PaymentForm';
import PaymentHistory from '../components/PaymentHistory';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
 
   const { loanId } = useParams()
   
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Loan Details</h1>
    
      <PaymentHistory loanId={loanId}  />
    </div>
  );
};

export default PaymentPage;