import express from 'express';

import { createLoan, getAllLoans, deleteLoan } from '../controllers/loan.controller.js';
const router = express.Router();


router.post('/',createLoan);
router.get('/:clientID',getAllLoans)
router.delete('/', deleteLoan)


export default router