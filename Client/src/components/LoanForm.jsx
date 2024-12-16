import React, { useState, useEffect } from "react";
import useLoanStore from "../Store/loanStore";
import toast from "react-hot-toast";

const LoanForm = () => {
  const [loan, setLoan] = useState({
    loanID: localStorage.getItem("clientID") || "",
    loanType: "type1",
    interestRate: "",
    principalAmount: "",
    latefeeInterest: "",
    loanDuration: "",
    bailType: "",

  });
  const createLoan = useLoanStore((state) => state.createLoan);

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loan.loanType === "type1") {
    }
  }, [FormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLoan(loan);
      toast.success("Loan created successfully!");
    } catch (error) {
      toast.error("Failed to create loan.");
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="loanID"
        value={loan.loanID} // Use state value to control the loanID
        onChange={handleChange}
        placeholder="Client ID"
        className="input"
        disabled
      />
      <input
        name="loanType"
        value={loan.loanType}
        onChange={handleChange}
        placeholder="Loan Type"
        className="input"
      />
      <input
        name="interestRate"
        value={loan.interestRate}
        onChange={handleChange}
        placeholder="Monthly Interest Rate"
        className="input"
      />
      <input
        name="principalAmount"
        value={loan.principalAmount}
        onChange={handleChange}
        placeholder="Principal Amount"
        className="input"
      />
      {loan.loanType === "type2" && (
        <input
          name="loanDuration"
          value={loan.loanDuration}
          onChange={handleChange}
          placeholder="Loan Duration (in months)"
          className="input"
        />
      )}

      <input
        name="latefeeInterest"
        value={loan.latefeeInterest}
        onChange={handleChange}
        placeholder="Late Fee Interest"
        className="input"
      />
      <input
        name="bailType"
        value={loan.bailType}
        onChange={handleChange}
        placeholder="Bail Type"
        className="input"
      />
      
      <button type="submit" className="btn">
        Create Loan
      </button>
    </form>
  );
};

export default LoanForm;
