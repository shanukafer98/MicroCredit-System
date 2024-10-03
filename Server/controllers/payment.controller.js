import Payment from '../models/payment.model.js';
import LoanType1 from '../models/loan_type1.model.js';
import LoanType2 from '../models/loan_type2.model.js';


export const getAllPayments = async (req, res) => {
    try {
        const { loanId } = req.params;
        const payments = await Payment.find({ loanId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const makePayment = async (req, res) => {
    try {
        const { loanId, amountPaid, loanType, paymentDate } = req.body;
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

        // Create payment record
        const payment = new Payment({
            loanId,
            amountPaid,
            loanType,
            paymentDate
        });
        await payment.save();

        let remainingPayment = amountPaid;

        // Handle payments for Loan Type 1
        if (loanType === 'Type1') {
            // Pay off unpaid interest
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

            // Apply excess payment to principal
            if (remainingPayment > 0) {
                loan.principalAmount -= remainingPayment;
                remainingPayment = 0;
            }

            // Calculate new late fee based on unpaid interest
            loan.lateFee = loan.monthlyInterest > 0 ? (loan.monthlyInterest * 10) / 100 : 0;
            loan.totalDue = loan.unpaidInterest + loan.lateFee + loan.monthlyInterest;

        // Handle payments for Loan Type 2
        } else if (loanType === 'Type2') {
            // Pay off unpaid installment
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

                    // Reduce the principal once full installment is paid
                    loan.principalAmount -= loan.monthlyInstallment;
                } else {
                    loan.monthlyInstallment -= remainingPayment;
                    remainingPayment = 0;
                }
            }

            // Calculate new late fee based on unpaid installment
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

export const deletePayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        const { loanId, amountPaid, loanType } = payment;
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

        let remainingRefund = amountPaid;

        // Handle refunds and interest/fees calculations for loanType1
        if (loanType === 'Type1') {
            // Refund current month's interest
            if (loan.monthlyInterest < loan.originalMonthlyInterest) {
                const refundAmount = loan.originalMonthlyInterest - loan.monthlyInterest;
                if (remainingRefund >= refundAmount) {
                    remainingRefund -= refundAmount;
                    loan.monthlyInterest = loan.originalMonthlyInterest;
                } else {
                    loan.monthlyInterest += remainingRefund;
                    remainingRefund = 0;
                }
            }

            // Refund late fees
            if (loan.lateFee < loan.originalLateFee) {
                const refundAmount = loan.originalLateFee - loan.lateFee;
                if (remainingRefund >= refundAmount) {
                    remainingRefund -= refundAmount;
                    loan.lateFee = loan.originalLateFee;
                } else {
                    loan.lateFee += remainingRefund;
                    remainingRefund = 0;
                }
            }

            // Refund unpaid interest
            if (remainingRefund > 0) {
                loan.unpaidInterest += remainingRefund;
            }

            // Calculate new late fee and total due
            loan.lateFee = loan.monthlyInterest > 0 ? (loan.monthlyInterest * 10) / 100 : 0;
            loan.totalDue = loan.unpaidInterest + loan.lateFee + loan.monthlyInterest;

        // Handle refunds and fees calculations for loanType2
        } else if (loanType === 'Type2') {
            // Refund current month's installment
            if (loan.monthlyInstallment < loan.originalMonthlyInstallment) {
                const refundAmount = loan.originalMonthlyInstallment - loan.monthlyInstallment;
                if (remainingRefund >= refundAmount) {
                    remainingRefund -= refundAmount;
                    loan.monthlyInstallment = loan.originalMonthlyInstallment;
                } else {
                    loan.monthlyInstallment += remainingRefund;
                    remainingRefund = 0;
                }
            }

            // Refund late fees
            if (loan.lateFee < loan.originalLateFee) {
                const refundAmount = loan.originalLateFee - loan.lateFee;
                if (remainingRefund >= refundAmount) {
                    remainingRefund -= refundAmount;
                    loan.lateFee = loan.originalLateFee;
                } else {
                    loan.lateFee += remainingRefund;
                    remainingRefund = 0;
                }
            }

            // Refund unpaid installment
            if (remainingRefund > 0) {
                loan.unpaidInstallment += remainingRefund;
            }

            // Calculate new late fee and total due
            loan.lateFee = loan.monthlyInstallment > 0 ? (loan.monthlyInstallment * 1) / 100 : 0;
            loan.totalDue = loan.unpaidInstallment + loan.lateFee + loan.monthlyInstallment;
        }

        // Save the loan after updates
        await loan.save();

        // Delete the payment
        await Payment.findByIdAndDelete(paymentId);

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};