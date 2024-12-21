import React, { useState, useEffect } from "react";
import useLoanStore from "../Store/loanStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const LoanForm = () => {
  const [loan, setLoan] = useState({
    loanID: localStorage.getItem("clientID") || "",
    loanType: "type1",
    interestRate: "",
    principalAmount: "",
    latefeeInterest: "",
    loanDuration: "",
    bailType: "",
    weekLoan: false,
  });
  const createLoan = useLoanStore((state) => state.createLoan);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoan({ ...loan, [name]: type === "checkbox" ? checked : value });
  };

  useEffect(() => {
    if (loan.loanType === "type1") {
      // Add any specific logic for type1 if needed
    }
  }, [loan.loanType]);

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
    <div  className="bg-slate-200 p-2 rounded-lg shadow-lg opacity-70">
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="loanID" className="block text-sm font-medium text-gray-700 pb-2">
          Client ID
        </label>
        <input
          id="loanID"
          name="loanID"
          value={loan.loanID} // Use state value to control the loanID
          onChange={handleChange}
          className="input"
          disabled
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="loanType" className="block text-sm font-medium text-gray-700 pb-2">
          Loan Type
        </label>
        <select
          id="loanType"
          name="loanType"
          value={loan.loanType}
          onChange={handleChange}
          className="input"
        >
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
        </select>
      </motion.div>
      {loan.loanType === "type1" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="weekLoan" className="block text-sm font-medium text-gray-700 pb-2">
            Week Loan
          </label>
          <input
            type="checkbox"
            id="weekLoan"
            name="weekLoan"
            checked={loan.weekLoan}
            onChange={handleChange}
            className="w-[30px] h-[30px]"
          />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 pb-2">
          Monthly Interest Rate
        </label>
        <input
          id="interestRate"
          name="interestRate"
          value={loan.interestRate}
          onChange={handleChange}
          className="input"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <label htmlFor="principalAmount" className="block text-sm font-medium text-gray-700 pb-2">
          Principal Amount
        </label>
        <input
          id="principalAmount"
          name="principalAmount"
          value={loan.principalAmount}
          onChange={handleChange}
          className="input"
        />
      </motion.div>
      {loan.loanType === "type2" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <label htmlFor="loanDuration" className="block text-sm font-medium text-gray-700 pb-2">
            Loan Duration (in months)
          </label>
          <input
            id="loanDuration"
            name="loanDuration"
            value={loan.loanDuration}
            onChange={handleChange}
            className="input"
          />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <label htmlFor="latefeeInterest" className="block text-sm font-medium text-gray-700 pb-2">
          Late Fee Interest
        </label>
        <input
          id="latefeeInterest"
          name="latefeeInterest"
          value={loan.latefeeInterest}
          onChange={handleChange}
          className="input"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <label htmlFor="bailType" className="block text-sm font-medium text-gray-700 pb-2">
          Bail Type
        </label>
        <input
          id="bailType"
          name="bailType"
          value={loan.bailType}
          onChange={handleChange}
          className="input"
        />
      </motion.div>
      <motion.button
        type="submit"
        className="btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Create Loan
      </motion.button>
    </motion.form>
  </div>);
};

export default LoanForm;