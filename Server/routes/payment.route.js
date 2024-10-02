import express from 'express';
import { makePayment, getAllPayments } from '../controllers/payment.controller.js';
const router = express.Router();


router.get('/:loanId',getAllPayments)
router.post('/',makePayment)


export default router

