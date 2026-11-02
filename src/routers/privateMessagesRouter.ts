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

// Create (Post)
privateMessagesRouter.post('/', authMiddleware, privateMessagesPostController);

// Read (Get All) 
privateMessagesRouter.get('/', authMiddleware, privateMessagesGetAllController);

// Read (Get Specific)
privateMessagesRouter.get('/:otherUserId', authMiddleware, privateMessagesGetSpecificController);

// Update (Put)
privateMessagesRouter.put('/:id', authMiddleware, privateMessagesPutController);

// Delete (Delete)
privateMessagesRouter.delete('/:id', authMiddleware, privateMessagesDeleteController);

export default privateMessagesRouter;