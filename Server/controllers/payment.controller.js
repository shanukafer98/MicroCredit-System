import Payment from "../models/payment.model.js";
import LoanType1 from "../models/loan_type1.model.js";
import LoanType2 from "../models/loan_type2.model.js";

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
    if (loanType === "Type1") {
      loan = await LoanType1.findById(loanId);
    } else if (loanType === "Type2") {
      loan = await LoanType2.findById(loanId);
    }

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Create a payment record
    const payment = new Payment({
      loanId,
      amountPaid,
      loanType,
      paymentDate,
    });
    await payment.save();
    res.status(200).json({ message: "Payment made successfully" });

    // let remainingPayment = amountPaid;

    // // Handle payments for Loan Type 1
    // if (loanType === "Type1") {
    //   // Pay off unpaid interest
    //   if (loan.unpaidInterest > 0) {
    //     if (remainingPayment >= loan.unpaidInterest) {
    //       remainingPayment -= loan.unpaidInterest;
    //       loan.unpaidInterest = 0;
    //     } else {
    //       loan.unpaidInterest -= remainingPayment;
    //       remainingPayment = 0;
    //     }
    //   }

    //   // Pay off late fees
    //   if (loan.lateFee > 0) {
    //     if (remainingPayment >= loan.lateFee) {
    //       remainingPayment -= loan.lateFee;
    //       loan.lateFee = 0;
    //     } else {
    //       loan.lateFee -= remainingPayment;
    //       remainingPayment = 0;
    //     }
    //   }

    //   // Pay off current month's interest
    //   if (remainingPayment > 0) {
    //     if (remainingPayment >= loan.monthlyInterest) {
    //       remainingPayment -= loan.monthlyInterest;
    //       loan.monthlyInterest = 0;
    //     } else {
    //       loan.monthlyInterest -= remainingPayment;
    //       remainingPayment = 0;
    //     }
    //   }

    //   // Apply any excess payment to the principal
    //   if (remainingPayment > 0) {
    //     loan.principalAmount -= remainingPayment;
    //     remainingPayment = 0;
    //   }

    //   // Calculate new late fee if there's remaining unpaid interest
    //   loan.lateFee =
    //     loan.monthlyInterest > 0 ? (loan.monthlyInterest * 10) / 100 : 0;

    //   // Update the total amount due
    //   loan.totalDue = loan.unpaidInterest + loan.lateFee + loan.monthlyInterest;

    //   // Handle payments for Loan Type 2
    // } else if (loanType === "Type2") {
    //   // Pay off unpaid installment
    //   if (loan.unpaidInstallment > 0) {
    //     if (remainingPayment >= loan.unpaidInstallment) {
    //       remainingPayment -= loan.unpaidInstallment;
    //       loan.unpaidInstallment = 0;
    //     } else {
    //       loan.unpaidInstallment -= remainingPayment;
    //       remainingPayment = 0;
    //     }
    //   }

    //   // Pay off late fees
    //   if (loan.lateFee > 0) {
    //     if (remainingPayment >= loan.lateFee) {
    //       remainingPayment -= loan.lateFee;
    //       loan.lateFee = 0;
    //     } else {
    //       loan.lateFee -= remainingPayment;
    //       remainingPayment = 0;
    //     }
    //   }

    //   // Pay off current month's installment
    //   if (remainingPayment > 0) {
    //     if (remainingPayment >= loan.monthlyInstallment) {
    //       remainingPayment -= loan.monthlyInstallment;

    //       // Reduce the principal only if full installment is paid
    //       loan.principalAmount -= loan.monthlyInstallment;
    //       loan.monthlyInstallment = 0;
    //     } else {
    //       loan.monthlyInstallment -= remainingPayment;
    //       remainingPayment = 0;
    //     }
    //   }

    //   // Calculate new late fee if there's remaining unpaid installment
    //   loan.lateFee =
    //     loan.monthlyInstallment > 0 ? (loan.monthlyInstallment * 1) / 100 : 0;

    //   // Update the total amount due
    //   loan.totalDue =
    //     loan.unpaidInstallment + loan.lateFee + loan.monthlyInstallment;
    // }

    // // Update loan's lastPaymentDate
    // loan.lastPaymentDate = paymentDate;

    // // Check if the loan is completed (principal amount is 0)
    // if (loan.principalAmount <= 0) {
    //   loan.status = "completed"; // Loan is fully paid
    // } else if (loan.totalDue > 0) {
    //   loan.status = "delayed"; // Loan has unpaid dues
    // } else {
    //   loan.status = "active"; // Loan is active with no dues
    // }

    // // Save the loan after all updates
    // await loan.save();
    // res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const { loanId, amountPaid, loanType } = payment;
    let loan;

    await Payment.findByIdAndDelete(paymentId);

    res.status(200).json({ message: "Payment deleted successfully" });

    // // Dynamically load the loan based on loanType
    // if (loanType === "Type1") {
    //   loan = await LoanType1.findById(loanId);
    // } else if (loanType === "Type2") {
    //   loan = await LoanType2.findById(loanId);
    // }

    // if (!loan) {
    //   return res.status(404).json({ message: "Loan not found" });
    // }

    // let remainingRefund = amountPaid;

    // // Handle refunds and interest/fees calculations for loanType1
    // if (loanType === "Type1") {
    //   // Refund current month's interest
    //   if (loan.monthlyInterest < loan.originalMonthlyInterest) {
    //     const refundAmount =
    //       loan.originalMonthlyInterest - loan.monthlyInterest;
    //     if (remainingRefund >= refundAmount) {
    //       remainingRefund -= refundAmount;
    //       loan.monthlyInterest = loan.originalMonthlyInterest;
    //     } else {
    //       loan.monthlyInterest += remainingRefund;
    //       remainingRefund = 0;
    //     }
    //   }

    //   // Refund late fees
    //   if (loan.lateFee < loan.originalLateFee) {
    //     const refundAmount = loan.originalLateFee - loan.lateFee;
    //     if (remainingRefund >= refundAmount) {
    //       remainingRefund -= refundAmount;
    //       loan.lateFee = loan.originalLateFee;
    //     } else {
    //       loan.lateFee += remainingRefund;
    //       remainingRefund = 0;
    //     }
    //   }

    //   // Refund unpaid interest
    //   if (remainingRefund > 0) {
    //     loan.unpaidInterest += remainingRefund;
    //   }

    //   // Calculate new late fee and total due
    //   loan.lateFee =
    //     loan.monthlyInterest > 0 ? (loan.monthlyInterest * 10) / 100 : 0;
    //   loan.totalDue = loan.unpaidInterest + loan.lateFee + loan.monthlyInterest;

    //   // Handle refunds and fees calculations for loanType2
    // } else if (loanType === "Type2") {
    //   // Refund current month's installment
    //   if (loan.monthlyInstallment < loan.originalMonthlyInstallment) {
    //     const refundAmount =
    //       loan.originalMonthlyInstallment - loan.monthlyInstallment;
    //     if (remainingRefund >= refundAmount) {
    //       remainingRefund -= refundAmount;
    //       loan.monthlyInstallment = loan.originalMonthlyInstallment;
    //     } else {
    //       loan.monthlyInstallment += remainingRefund;
    //       remainingRefund = 0;
    //     }
    //   }

    //   // Refund late fees
    //   if (loan.lateFee < loan.originalLateFee) {
    //     const refundAmount = loan.originalLateFee - loan.lateFee;
    //     if (remainingRefund >= refundAmount) {
    //       remainingRefund -= refundAmount;
    //       loan.lateFee = loan.originalLateFee;
    //     } else {
    //       loan.lateFee += remainingRefund;
    //       remainingRefund = 0;
    //     }
    //   }

    //   // Refund unpaid installment
    //   if (remainingRefund > 0) {
    //     loan.unpaidInstallment += remainingRefund;
    //   }

    //   // Calculate new late fee and total due
    //   loan.lateFee =
    //     loan.monthlyInstallment > 0 ? (loan.monthlyInstallment * 1) / 100 : 0;
    //   loan.totalDue =
    //     loan.unpaidInstallment + loan.lateFee + loan.monthlyInstallment;
    // }

    // // Save the loan after updates
    // await loan.save();

    // // Delete the payment
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const paymentCalculator = async (req, res) => {
  const { loanId, loanType } = req.params;
  const payments = await Payment.find({ loanId });
  let loan;
  console.log(loanId, loanType);

  // Dynamically load the loan based on loanType
  if (loanType === "Type1") {
    loan = await LoanType1.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    let lateFee = 0;
    let total_lateFee = 0;
    let total_unpaidInterest = 0;
    let principalAmount = loan.principalAmount;

    // Array to accumulate results
    const results = [];

    payments.forEach((payment) => {
      let remaining_payment = payment.amountPaid;
      let monthlyInterest = Math.round(principalAmount * (loan.interestRate / 100));
      let interest = Math.round(principalAmount * (loan.interestRate / 100));
      let calculation_steps = [];
      let lateFee = 0;

      calculation_steps.push(`Initial payment: LKR ${payment.amountPaid}`);

      // Pay off late fees first
      if (remaining_payment >= total_lateFee) {
        calculation_steps.push(`Paying off late fees: LKR ${total_lateFee}`);
        remaining_payment -= total_lateFee;
        total_lateFee = 0;

        // Pay off unpaid interest next
        if (remaining_payment >= total_unpaidInterest) {
          calculation_steps.push(`Paying off unpaid interest: LKR ${total_unpaidInterest}`);
          remaining_payment -= total_unpaidInterest;
          total_unpaidInterest = 0;

          // Pay off monthly interest next
          if (remaining_payment >= monthlyInterest) {
            calculation_steps.push(`Paying off full monthly interest: LKR ${monthlyInterest}`);
            remaining_payment -= monthlyInterest;
            monthlyInterest = 0;
            principalAmount -= remaining_payment;
            calculation_steps.push(`Remaining payment applied to principal: LKR ${remaining_payment}`);
          } else {
            calculation_steps.push(`Partial payment towards monthly interest: LKR ${remaining_payment}`);
            monthlyInterest -= remaining_payment;
            total_unpaidInterest += monthlyInterest;
            calculation_steps.push(`Remaining unpaid interest: LKR ${monthlyInterest}`);
            remaining_payment = 0;

            // Calculate late fee for unpaid monthly interest
            lateFee = Math.round(monthlyInterest * (loan.latefeeInterest / 100));
            total_lateFee += lateFee;
            calculation_steps.push(`Late fee applied: LKR ${lateFee}`);
          }
        } else {
          // Partial payment towards unpaid interest
          calculation_steps.push(`Partial payment towards unpaid interest: LKR ${remaining_payment}`);
          total_unpaidInterest -= remaining_payment;
          remaining_payment = 0;

          // Recalculate late fee for remaining unpaid interest
          lateFee = Math.round(total_unpaidInterest * (loan.latefeeInterest / 100));
          total_lateFee += lateFee;
          calculation_steps.push(`Late fee on remaining unpaid interest: LKR ${lateFee}`);
        }
      } else {
        // Partial payment towards late fees
        calculation_steps.push(`Partial payment towards late fee: LKR ${remaining_payment}`);
        total_lateFee -= remaining_payment;
        remaining_payment = 0;

        // Recalculate late fee for next period
        lateFee = Math.round(total_unpaidInterest * (loan.latefeeInterest / 100));
        total_lateFee += lateFee;
        calculation_steps.push(`Recalculated late fee: LKR ${lateFee}`);
      }

      // Accumulate the result for this payment
      results.push({
        payment: `LKR ${Math.round(payment.amountPaid)}`,
        lateFee: `LKR ${Math.round(lateFee)}`,
        total_lateFee: `LKR ${Math.round(total_lateFee)}`,
        total_unpaidInterest: `LKR ${Math.round(total_unpaidInterest)}`,
        interest: `LKR ${Math.round(interest)}`,
        principalAmount: `LKR ${Math.round(principalAmount)}`,
        calculation_steps,  // Include the step-by-step breakdown
      });
    });

    // Send all accumulated results
    return res.json(results);
  }
 else if (loanType === "Type2") {
    loan = await LoanType2.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

 
    let total_lateFee = 0;
    let total_unpaidInstallment = loan.unpaidInstallment || 0;
    const fixed_monthly_installment = Math.round((loan.principalAmount + ((loan.principalAmount * loan.interestRate * loan.loanDuration) / 100)) / loan.loanDuration);
    let total_due = Math.round(loan.principalAmount + ((loan.principalAmount * loan.interestRate * loan.loanDuration) / 100));

    const results = [];

    payments.forEach((payment) => {
      let remaining_payment = payment.amountPaid;
      let calculation_steps = [];
      let lateFee = 0;

      calculation_steps.push(`Initial payment: LKR ${payment.amountPaid}`);

      // First, pay off the late fees
      if (remaining_payment >= total_lateFee) {
        calculation_steps.push(`Paying off late fees: LKR ${total_lateFee}`);
        remaining_payment -= total_lateFee;
        total_lateFee = 0;

        // Then, pay off any unpaid installments
        if (remaining_payment >= total_unpaidInstallment) {
          calculation_steps.push(`Paying off unpaid installment: LKR ${total_unpaidInstallment}`);
          remaining_payment -= total_unpaidInstallment;
          total_due -= total_unpaidInstallment;
          total_unpaidInstallment = 0;

          // Now, apply the payment to the current month's installment
          if (remaining_payment >= fixed_monthly_installment) {
            calculation_steps.push(`Paying full monthly installment: LKR ${fixed_monthly_installment}`);
            remaining_payment -= fixed_monthly_installment;
            total_due -= fixed_monthly_installment;
            calculation_steps.push(`Remaining payment after full installment: LKR ${remaining_payment}`);
          } else {
            // Partial payment for the current month's installment
            calculation_steps.push(`Partial payment toward the current month's installment: LKR ${remaining_payment}`);
            total_unpaidInstallment += fixed_monthly_installment - remaining_payment;
            total_due -= remaining_payment;
            calculation_steps.push(`Unpaid portion of current month's installment: LKR ${fixed_monthly_installment - remaining_payment}`);
           

            // Late fee applies to the unpaid portion of the current installment
            lateFee = Math.round((fixed_monthly_installment - remaining_payment) * (loan.latefeeInterest / 100));
            total_lateFee += lateFee;
            remaining_payment = 0;
            calculation_steps.push(`Late fee added: LKR ${lateFee}`);
          }
        } else {
          // Partial payment toward unpaid installments
          calculation_steps.push(`Partial payment toward unpaid installment: LKR ${remaining_payment}`);
          total_unpaidInstallment -= remaining_payment;
          total_due -= remaining_payment;
          remaining_payment = 0;

          // Recalculate late fee on remaining unpaid installment
          lateFee = Math.round(fixed_monthly_installment* (loan.latefeeInterest / 100));
          total_lateFee += lateFee;
          calculation_steps.push(`Late fee on remaining unpaid installment: LKR ${lateFee}`);
        }
      } else {
        // Partial payment toward late fees
        calculation_steps.push(`Partial payment toward late fee: LKR ${remaining_payment}`);
        total_lateFee -= remaining_payment;
        remaining_payment = 0;

        // Late fee is recalculated for the next period
        lateFee = Math.round(fixed_monthly_installment * (loan.latefeeInterest / 100));
        total_lateFee += lateFee;
        calculation_steps.push(`Recalculated late fee: LKR ${lateFee}`);
      }

      // Accumulate the result for this payment
      results.push({
        payment: `LKR ${Math.round(payment.amountPaid)}`,
        lateFee: `LKR ${Math.round(lateFee)}`,
        total_lateFee: `LKR ${Math.round(total_lateFee)}`,
        total_unpaidInstallment: `LKR ${Math.round(total_unpaidInstallment)}`,
        fixed_monthly_installment: `LKR ${Math.round(fixed_monthly_installment)}`,
        total_due: `LKR ${Math.round(total_due)}`,
        calculation_steps,  // Include the step-by-step breakdown
      });
    });

    // Send all accumulated results
    return res.json(results);
  } else {
    return res.status(400).json({ message: "Invalid loan type" });
  }


};