import express from 'express';
import { createClient, getallClients, updateClient, deleteClient, getClient } from '../controllers/client.controller.js';

const router = express.Router();

router.post('/', createClient);
router.get('/', getallClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/:id', getClient);




export default router   