import Payment from '../models/payment.model.js';
import LoanType1 from '../models/loan_type1.model.js';
import LoanType2 from '../models/loan_type2.model.js';


export const  getAllPayments = async (req, res) => {
    try {
        const { loanId } = req.params;
        const payments = await Payment.findById(loanId);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const makePayment = async (req, res) => {
    try {
        const { loanId, amountPaid, loanType,paymentDate } = req.body;
        let loan;

        // Dynamically load the loan based on loanType
        if (loanType === 'Type1') {
            loan = await LoanType1.findById(loanId);
        } else if (loanType === 'Type2') {
            loan = await LoanType2.findById(loanId);
        }

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        // Create payment, including the loan type
        const payment = new Payment({
            loanId,
            amountPaid,
            loanType, 
            paymentDate
        });
        await payment.save();

        let remainingPayment = amountPaid;

        // Handle payments and interest/fees calculations for loanType1
        if (loanType === 'Type1') {
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
        } else if (loanType === 'Type2') {
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

