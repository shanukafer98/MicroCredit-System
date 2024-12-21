import React, { useEffect, useState } from "react";
import useLoanStore from "../Store/loanStore";
import toast from "react-hot-toast";
import Modal from "react-modal";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ZAxis } from "recharts";

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
      zIndex: 1000, // Set a higher z-index for the modal
    },
    overlay: {
      zIndex: 999, // Ensure the overlay has a high z-index as well
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

  const handleCalculation = async (loanID, loanType) => {
    try {
      navigate(`/payments/${loanID}/${loanType}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 my-2 mx-2 ">
        {loans.map((loan) => (
          <motion.div
            className="bg-slate-400 shadow-2xl p-4 rounded-lg  "
            key={loan._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loan Type: {loan.loanType === "Type1" ? "Interest Loan" : "Installment Loan"}     {loan.weekLoan === true ? "(Week Loan)" : ""}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Principal Amount: Rs.{loan.principalAmount}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Monthly Interest Rate: {loan.interestRate}%
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Late Fee Interest Rate: {loan.latefeeInterest}%
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Bail Type: {loan.bailType}
            </motion.p>
            {loan.monthlyInterest !== null && loan.monthlyInterest !== undefined && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Monthly Interest: Rs. {loan.monthlyInterest.toFixed(2)}
              </motion.p>
            )}
            {loan.monthlyInterest !== null && loan.monthlyInterest !== undefined &&  loan.weekLoan === true && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Weekly Interest: Rs. {(loan.monthlyInterest /4).toFixed(2)} 
              </motion.p>
            )}
            {loan.loanDuration && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Loan Duration: {loan.loanDuration} months
              </motion.p>
            )}
            {loan.monthlyInstallment && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Monthly Installment: Rs.{loan.monthlyInstallment.toFixed(2)}
              </motion.p>
            )}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Status: {loan.status}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Loan Issued Date & Time:{" "}
              {new Date(loan.createdAt).toLocaleDateString()} at{" "}
              {new Date(loan.createdAt).toLocaleTimeString()}
            </motion.p>
            <motion.div
              className="flex gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <motion.button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 my-2 rounded shadow-2xl border-2 border-blue-700"
                onClick={() => openModal(loan)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Make a Payment
              </motion.button>

              <motion.button
                className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 my-2 rounded shadow-2xl border-2 border-red-700"
                onClick={() => handleDelete(loan.loanType, loan._id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Delete Loan
              </motion.button>
              <motion.button
                className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 my-2 rounded shadow-2xl border border-green-700"
                onClick={() => handleCalculation(loan._id, loan.loanType)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Calculate 
              </motion.button>
            </motion.div>
          </motion.div>
        
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