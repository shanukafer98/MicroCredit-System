import mongoose from 'mongoose';

const loanType2Schema = new mongoose.Schema({

    loanID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,

        
    },
    
    loanType: {
        type: String,
        required: true,
        default: 'Type2'
    },

    interestRate: {
        type: Number,
        required: true
    },
    principalAmount: {
        type: Number,
        required: true
    },
    monthlyInstallment: {
        type: Number,
        required: true
    },
    loanDuration: {
        type: Number,
        required: true
    },
    latefeeInterest:{
        type:Number,
        default:0
    },
    
    status: {
        type: String,
        enum: ['active', 'completed', 'delay'],
        default: 'active'
    },
    unpaidInstallment: {
        type: Number,
        default: 0
    },
    lateFee: {
        type: Number,
        default: 0
    },
    totalDue: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const loan_type2 = mongoose.model('LoanType2', loanType2Schema);
export default loan_type2;