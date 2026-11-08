// Packages
import express, { Router } from 'express';

// Files
import { 
    messagesPostController, 
    messagesGetAllController, 
    messagesGetSpecificController, 
    messagesPutController, 
    messagesDeleteController 

} from '../controllers/messagesController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const messagesRoute: Router = express.Router();

// Create (Post)
messagesRoute.post('/', authMiddleware, messagesPostController);

// Read (Get All)
messagesRoute.get('/', authMiddleware, messagesGetAllController);

// Read (Get Specific)
messagesRoute.get('/:groupId', authMiddleware, messagesGetSpecificController);

// Update (Put)
messagesRoute.put('/:id', authMiddleware, messagesPutController);

// Delete (Delete)
messagesRoute.delete('/:id', authMiddleware, messagesDeleteController);

export default messagesRoute;