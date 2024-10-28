import express from 'express';
import { makePayment, getAllPayments, deletePayment, paymentCalculator ,dashboard} from '../controllers/payment.controller.js';
const router = express.Router();


router.get('/:loanId',getAllPayments)
router.post('/',makePayment)
router.delete('/:paymentId', deletePayment)
router.get('/:loanId/:loanType', paymentCalculator)
router.get('/dashboard/:loanId/:loanType', dashboard)



export default router

