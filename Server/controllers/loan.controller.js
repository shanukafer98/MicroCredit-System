import LoanType1 from '../models/loan_type1.model.js';
import LoanType2 from '../models/loan_type2.model.js';
import Payment from '../models/payment.model.js';
import mongoose from 'mongoose';

export const createLoan = async (req, res) => {
    try {
        const { loanType, ...loanData } = req.body;
        let loan;

        if (loanType === 'type1') {
            loan = new LoanType1(loanData);
            loan.monthlyInterest = (loan.principalAmount * loan.interestRate) / 100;
            loan.totalDue = loan.monthlyInterest;
        } else if (loanType === 'type2') {
            loan = new LoanType2(loanData);
            loan.monthlyInstallment = (loan.principalAmount + ((loan.principalAmount * loan.interestRate * loan.loanDuration) / 100)) / loan.loanDuration;
            loan.totalDue = loan.monthlyInstallment;
        }

        await loan.save();
        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const getAllLoans = async (req, res) => {
    try {
        const {clientID} = req.params;

        // Validate and convert clientID to ObjectId
        if (!mongoose.Types.ObjectId.isValid(clientID)) {
            return res.status(400).json({ message: 'Invalid clientID' });
        }

        const loanID = new  mongoose.Types.ObjectId(clientID);

        const [loansType1, loansType2] = await Promise.all([
            LoanType1.find({ loanID }).populate('loanID'),
            LoanType2.find({ loanID }).populate('loanID')
        ]);

        // Combine both loan types into a single array
        const allLoans = [...loansType1, ...loansType2];

        res.json(allLoans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const deleteLoan =  async (req, res) => {

    const { loanType, id } = req.query;
    let loanModel;
  
    // Choose the right loan model based on loanType
    if (loanType === 'Type1') {
      loanModel = LoanType1;
    } else if (loanType === 'Type2') {
      loanModel = LoanType2;
    } else {
      return res.status(400).json({ message: 'Invalid loan type' });
    }
  
    try {
      const deletedLoan = await loanModel.findByIdAndDelete(id);
      if (!deletedLoan) {
        return res.status(404).json({ message: 'Loan not found' });
      }
      res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting loan', error });
    }
  }





export const makePayment = async (req, res) => {
    try {
        const { loanId, amountPaid, loanType } = req.body;
        let loan;

        // Dynamically load the loan based on loanType
        if (loanType === 'type1') {
            loan = await LoanType1.findById(loanId);
        } else if (loanType === 'type2') {
            loan = await LoanType2.findById(loanId);
        }

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        // Create payment, including the loan type
        const payment = new Payment({
            loanId,
            amountPaid,
            loanType,  // Storing the type of loan for reference
        });
        await payment.save();

        let remainingPayment = amountPaid;

        // Handle payments and interest/fees calculations for loanType1
        if (loanType === 'type1') {
            // Pay off unpaid interest first
            if (loan.unpaidInterest > 0) {
                if (remainingPayment >= loan.unpaidInterest) {
                    remainingPayment -= loan.unpaidInterest;
                    loan.unpaidInterest = 0;
                } else {
                    loan.unpaidInterest -= remainingPayment;
                    remainingPayment = 0;
                }
            }

            // Pay off late fees
            if (loan.lateFee > 0) {
                if (remainingPayment >= loan.lateFee) {
                    remainingPayment -= loan.lateFee;
                    loan.lateFee = 0;
                } else {
                    loan.lateFee -= remainingPayment;
                    remainingPayment = 0;
                }
            }

            // Pay off current month's interest
            if (remainingPayment > 0) {
                if (remainingPayment >= loan.monthlyInterest) {
                    remainingPayment -= loan.monthlyInterest;
                    loan.monthlyInterest = 0;
                } else {
                    loan.monthlyInterest -= remainingPayment;
                    remainingPayment = 0;
                }
            }

            // Calculate new late fee and total due
            loan.lateFee = loan.monthlyInterest > 0 ? (loan.monthlyInterest * 10) / 100 : 0;
            loan.totalDue = loan.unpaidInterest + loan.lateFee + loan.monthlyInterest;

        // Handle payments and fees calculations for loanType2
        } else if (loanType === 'type2') {
            // Pay off unpaid installment first
            if (loan.unpaidInstallment > 0) {
                if (remainingPayment >= loan.unpaidInstallment) {
                    remainingPayment -= loan.unpaidInstallment;
                    loan.unpaidInstallment = 0;
                } else {
                    loan.unpaidInstallment -= remainingPayment;
                    remainingPayment = 0;
                }
            }

            // Pay off late fees
            if (loan.lateFee > 0) {
                if (remainingPayment >= loan.lateFee) {
                    remainingPayment -= loan.lateFee;
                    loan.lateFee = 0;
                } else {
                    loan.lateFee -= remainingPayment;
                    remainingPayment = 0;
                }
            }

            // Pay off current month's installment
            if (remainingPayment > 0) {
                if (remainingPayment >= loan.monthlyInstallment) {
                    remainingPayment -= loan.monthlyInstallment;
                    loan.monthlyInstallment = 0;
                } else {
                    loan.monthlyInstallment -= remainingPayment;
                    remainingPayment = 0;
                }
            }

            // Calculate new late fee and total due
            loan.lateFee = loan.monthlyInstallment > 0 ? (loan.monthlyInstallment * 1) / 100 : 0;
            loan.totalDue = loan.unpaidInstallment + loan.lateFee + loan.monthlyInstallment;
        }

        // Save the loan after updates
        await loan.save();
        res.status(200).json(loan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

