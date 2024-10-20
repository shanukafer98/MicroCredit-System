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
        enum: ['Type1', 'Type2']  
    },
    amountPaid: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;