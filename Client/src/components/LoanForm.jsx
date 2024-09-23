import React, { useState } from 'react';
import useLoanStore from '../Store/loanStore';
import toast from 'react-hot-toast';

const LoanForm = (ClientID) => {
  const [loan, setLoan] = useState({clientid: '', loanType: 'type1', interestRate: '', principalAmount: '', monthlyInterest: '', latefeeInterest: '' });
  const createLoan = useLoanStore((state) => state.createLoan);
  

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLoan(loan);
    toast.success('Loan created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name='clientid' value={localStorage.getItem('clientID')} onChange={handleChange} placeholder="Client ID" className="input" />
      <input name="loanType" value={loan.loanType} onChange={handleChange} placeholder="Loan Type" className="input" />
      <input name="interestRate" value={loan.interestRate} onChange={handleChange} placeholder="Interest Rate" className="input" />
      <input name="principalAmount" value={loan.principalAmount} onChange={handleChange} placeholder="Principal Amount" className="input" />
      <input name="monthlyInterest" value={loan.monthlyInterest} onChange={handleChange} placeholder="Monthly Interest" className="input" />
      <input name="latefeeInterest" value={loan.latefeeInterest} onChange={handleChange} placeholder="Late Fee Interest" className="input" />
      <button type="submit" className="btn">Create Loan</button>
    </form>
  );
};

export default LoanForm;