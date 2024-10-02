import React from 'react';
import LoanForm from '../components/LoanForm';
import LoanList from '../components/LoanList';

const LonePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Loan Management System</h1>
      <LoanForm />
      <LoanList />
    </div>
  );
};

export default LonePage;