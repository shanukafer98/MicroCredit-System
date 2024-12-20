import mongoose, { Mongoose } from 'mongoose';

const loanType1Schema = new mongoose.Schema({
    loanID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,

        
    },

    loanType: {
        type: String,
        required: true,
        default: 'Type1'
    },

    weekLoan: {
        type: Boolean,
        default: false
    },

    interestRate: {
        type: Number,
        required: true
    },
    principalAmount: {
        type: Number,
        required: true
    },
    monthlyInterest: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'delay'],
        default: 'active'
    },
    unpaidInterest: {
        type: Number,
        default: 0
    },
    latefeeInterest:{
        type:Number,
        default:0,
       
    },
    
    lateFee: {
        type: Number,
        default: 0
    },
    totalDue: {
        type: Number,
        default: 0
    },
    bailType: {
        type: String,
        default: 'None'
    }
}, { timestamps: true });

const loan_type1 = mongoose.model('LoanType1', loanType1Schema);
export default loan_type1;