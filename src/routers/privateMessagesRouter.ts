// Packages
import express, { Router } from 'express';

// Files
import {
    privateMessagesPostController,
    privateMessagesGetAllController,
    privateMessagesGetSpecificController,
    privateMessagesPutController,
    privateMessagesDeleteController
} from '../controllers/privateMessagesController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const privateMessagesRouter: Router = express.Router();

// Create | Post
privateMessagesRouter.post('/', authMiddleware, privateMessagesPostController);

// Read | Get All 
privateMessagesRouter.get('/', authMiddleware, privateMessagesGetAllController);

// Read | Get Specific (Conversation between two users)
privateMessagesRouter.get('/:otherUserId', authMiddleware, privateMessagesGetSpecificController);

// Update | Put (by message ID)
privateMessagesRouter.put('/:id', authMiddleware, privateMessagesPutController);

// Delete | Delete (by message ID)
privateMessagesRouter.delete('/:id', authMiddleware, privateMessagesDeleteController);

export default privateMessagesRouter;