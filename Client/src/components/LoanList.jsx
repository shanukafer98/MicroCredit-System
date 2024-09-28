import React, { useEffect } from "react";
import useLoanStore from "../Store/loanStore";
import toast from "react-hot-toast";

const LoanList = () => {
  const { loans, fetchLoans } = useLoanStore();
  const clientID = localStorage.getItem("clientID");
  const deleteLoan = useLoanStore((state) => state.deleteLoan)

  useEffect(() => {
    fetchLoans(clientID);
  }, [fetchLoans]);

  const handleDelete = async (loanID) => {
 
    try{
      await deleteLoan(loanID)
      toast.success("Succesfully delete the loan")

    }catch(err){
      toast.error("Cant delete the specific loan")
      console.log(err)

    }
  
  }




  return (
    <div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 m-2 " >
      {loans.map((loan) => (
        
          <div className=" bg-slate-400 shadow-2xl p-6 rounded-lg hover:scale-105" key={loan._id}>
            <h3>{loan.loanType}</h3>
            <p>Principal Amount: Rs.{loan.principalAmount}</p>
            <p>Interest Rate: {loan.interestRate}%</p>
            <p>Monthly Interest: Rs.{loan.monthlyInterest}</p>
            <p>Total Due: Rs.{loan.totalDue}</p>
            <p>Late Fee Interest Rate: {loan.latefeeInterest}%</p>
            <p>Status: {loan.status}</p>
            <p>
              Loan Issued Date & Time:{" "}
              {new Date(loan.createdAt).toLocaleDateString()} at{" "}
              {new Date(loan.createdAt).toLocaleTimeString()}
            </p>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete(loan._id)}>Delete Loan </button>
          </div>
       
      ))}
      </div>
    </div>
  );
};

export default LoanList;