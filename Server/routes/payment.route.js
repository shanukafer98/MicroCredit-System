import express from 'express';
import { makePayment, getAllPayments, deletePayment, paymentCalculator } from '../controllers/payment.controller.js';
const router = express.Router();


router.get('/:loanId',getAllPayments)
router.post('/',makePayment)
router.delete('/:paymentId', deletePayment)
router.get('/:loanId/:loanType', paymentCalculator)


export default router

