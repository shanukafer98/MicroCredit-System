import React, { useEffect, useState } from "react";
import useLoanStore from "../Store/loanStore";
import toast from "react-hot-toast";
import Modal from "react-modal";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";

// Set the app element for react-modal
Modal.setAppElement('#root');

const LoanList = () => {
  const { loans, fetchLoans } = useLoanStore();
  const clientID = localStorage.getItem("clientID");
  const deleteLoan = useLoanStore((state) => state.deleteLoan);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    fetchLoans(clientID);
  }, [clientID, fetchLoans]);

  const openModal = (loan) => {
    setSelectedLoan(loan);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedLoan(null);
  };

  const handleDelete = async (loanType, id) => {
    try {
      await deleteLoan(loanType, id);
      toast.success("Successfully deleted the loan");
    } catch (err) {
      toast.error("Can't delete the specific loan");
      console.log(err);
    }
  };

  const handleShowPayment = async (loanId) => {
    try {
      navigate(`/payments/${loanId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCalculation = async (loanID,loanType) => {
    try{
      navigate(`/payments/${loanID}/${loanType}`)

    }catch(err){
      console.log(err)
    }

  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 m-2 ">
        {loans.map((loan) => (
          <div
            className="bg-slate-400 shadow-2xl p-6 rounded-lg hover:scale-105"
            key={loan._id}
          >
            <h3>Loan Type: {loan.loanType}</h3>
            <p>Principal Amount: Rs.{loan.principalAmount}</p>
            <p>Monthly Interest Rate: {loan.interestRate}%</p>
            <p>Late Fee Interest Rate: {loan.latefeeInterest}%</p>
            {loan.monthlyInterest !== null && loan.monthlyInterest !== undefined && (
              <p>Monthly Interest: Rs. {loan.monthlyInterest.toFixed(2)}</p>
            )}
            {loan.loanDuration && (
              <p>Loan Duration: {loan.loanDuration} months</p>
            )}
            {loan.monthlyInstallment && (
              <p>
                Monthly Installment: Rs.{loan.monthlyInstallment.toFixed(2)}
              </p>
            )}
            {/* {loan.unpaidInterest !== null && loan.unpaidInterest !== undefined && (
              <p>Unpaid Interest: Rs.{loan.unpaidInterest.toFixed(2)}</p>
            )}
            {loan.unpaidInstallment !== null && loan.unpaidInstallment !== undefined && (
              <p>Unpaid Installment: Rs.{loan.unpaidInstallment.toFixed(2)}</p>
            )}
            <p>Late Fee: Rs.{loan.lateFee.toFixed(2)}</p>
            <p>Total Due: Rs.{loan.totalDue.toFixed(2)}</p> */}
            <p>Status: {loan.status}</p>
            <p>
              Loan Issued Date & Time:{" "}
              {new Date(loan.createdAt).toLocaleDateString()} at{" "}
              {new Date(loan.createdAt).toLocaleTimeString()}
            </p>
            {/* <p>
              Last loan update Date & Time:{" "}
              {new Date(loan.updatedAt).toLocaleDateString()} at{" "}
              {new Date(loan.updatedAt).toLocaleTimeString()}
            </p> */}
            <div className="flex gap-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-6 my-2 rounded shadow-2xl"
                onClick={() => openModal(loan)}
              >
                Make a Payment
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 my-2 rounded shadow-2xl"
                onClick={() => handleDelete(loan.loanType, loan._id)}
              >
                Delete Loan
              </button>
              {/* <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 my-2 rounded shadow-2xl"
                onClick={() => handleShowPayment(loan._id)}
              >
                Show Payment History
              </button> */}
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 my-2 rounded shadow-2xl"
                onClick={() => handleCalculation(loan._id,loan.loanType)}
              >
                Calculate 
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedLoan && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <PaymentForm loanId={selectedLoan._id} loanType={selectedLoan.loanType} onPaymentSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default LoanList;