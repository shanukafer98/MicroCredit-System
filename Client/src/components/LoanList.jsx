import React, { useEffect } from "react";
import useLoanStore from "../Store/loanStore";
import toast from "react-hot-toast";

const LoanList = () => {
  const { loans, fetchLoans } = useLoanStore();
  const clientID = localStorage.getItem("clientID");
  const deleteLoan = useLoanStore((state) => state.deleteLoan);

  useEffect(() => {
    fetchLoans(clientID);
  }, [fetchLoans]);

  const handleDelete = async (loanType, id) => {
    try {
      await deleteLoan(loanType, id);
      toast.success("Succesfully delete the loan");
    } catch (err) {
      toast.error("Cant delete the specific loan");
      console.log(err);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 m-2 ">
        {loans.map((loan) => (
          <div
            className=" bg-slate-400 shadow-2xl p-6 rounded-lg hover:scale-105"
            key={loan._id}
          >
            <h3>Loan Type: {loan.loanType}</h3>
            <p>Principal Amount: Rs.{loan.principalAmount}</p>
            <p>Monthly Interest Rate: {loan.interestRate}%</p>
            <p>Late Fee Interest Rate: {loan.latefeeInterest}%</p>
            {loan.monthlyInterest && (
              <p>Monthly Interest: {loan.monthlyInterest}</p>
            )}
            {loan.loanDuration && (
              <p>Loan Duration: {loan.loanDuration} months</p>
            )}
            <p>Total Due: Rs.{loan.totalDue}</p>
            <p>Status: {loan.status}</p>
            <p>
              Loan Issued Date & Time:{" "}
              {new Date(loan.createdAt).toLocaleDateString()} at{" "}
              {new Date(loan.createdAt).toLocaleTimeString()}
            </p>
            <p>
              Last loan update Date & Time:{" "}
              {new Date(loan.updatedAt).toLocaleDateString()} at{" "}
              {new Date(loan.updatedAt).toLocaleTimeString()}
            </p>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 my-2 rounded"
              onClick={() => handleDelete(loan.loanType, loan._id)}
            >
              Delete Loan{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanList;
