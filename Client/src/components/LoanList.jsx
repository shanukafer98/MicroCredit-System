import React, { useEffect } from 'react';
import useLoanStore from '../Store/loanStore';

const LoanList = (ClientID) => {
  const { loans, fetchLoans } = useLoanStore();

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  return (
    <div>
      {loans.map((loan) => (
        <div key={loan._id} className="loan-card">
          <h3>{loan.loanType}</h3>
          <p>Interest Rate: {loan.interestRate}%</p>
          <p>Principal Amount: ₹{loan.principalAmount}</p>
          <p>Monthly Interest: ₹{loan.monthlyInterest}</p>
          <p>Total Due: ₹{loan.totalDue}</p>
          <p>Late Fee Interest: ₹{loan.latefeeInterest}</p>
          <p>Status: {loan.status}</p>
        </div>
      ))}
    </div>
  );
};

export default LoanList;