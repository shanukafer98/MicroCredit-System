import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'loanType'  
    },
    loanType: {
        type: String,
        required: true,
        enum: ['LoanType1', 'LoanType2']  
    },
    amountPaid: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;