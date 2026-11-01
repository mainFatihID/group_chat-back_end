// Packages
import express, { Router } from 'express';

// Files
import { messagesPostController, messagesGetAllController, messagesGetSpecificController, messagesPutController, messagesDeleteController } from '../controllers/messagesController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const messagesRoute: Router = express.Router();

// Create | Post
messagesRoute.post('/', authMiddleware, messagesPostController);

// Read | Get
// Get All
messagesRoute.get('/', messagesGetAllController);

// Get Specific
messagesRoute.get('/:groupId', messagesGetSpecificController);

// Update | Put
messagesRoute.put('/:id', authMiddleware, messagesPutController);

// Delete | Delete
messagesRoute.delete('/:id', authMiddleware, messagesDeleteController);

export default messagesRoute;