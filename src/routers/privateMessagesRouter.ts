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

const privateMessagesRouter: Router = express.Router();

// Create | Post
privateMessagesRouter.post('/', privateMessagesPostController);

// Read | Get All 
privateMessagesRouter.get('/', privateMessagesGetAllController);

// Read | Get Specific (Conversation between two users)
privateMessagesRouter.get('/:userId/:otherUserId', privateMessagesGetSpecificController);

// Update | Put (by message ID)
privateMessagesRouter.put('/:id', privateMessagesPutController);

// Delete | Delete (by message ID)
privateMessagesRouter.delete('/:id', privateMessagesDeleteController);

export default privateMessagesRouter;