import express from 'express';

import { createLoan, getAllLoans } from '../controllers/loan.controller.js';
const router = express.Router();


router.post('/',createLoan);
router.get('/',getAllLoans)


export default router