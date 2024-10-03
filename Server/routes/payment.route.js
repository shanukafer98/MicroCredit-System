import express from 'express';
import { makePayment, getAllPayments,deletePayment } from '../controllers/payment.controller.js';
const router = express.Router();


router.get('/:loanId',getAllPayments)
router.post('/',makePayment)
router.delete('/:paymentId', deletePayment)


export default router

