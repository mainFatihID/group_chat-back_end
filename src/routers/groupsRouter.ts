// Packages
import express, { Router } from 'express';

// Files
import { groupsPostController, 
    groupsGetAllController, 
    groupsGetSpecificController, 
    groupsPutController, 
    groupsDeleteController 
} from '../controllers/groupsController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const groupsRouter: Router = express.Router();

// Create (Post)
groupsRouter.post('/', authMiddleware, groupsPostController);

// Read (Get All)
groupsRouter.get('/', authMiddleware, groupsGetAllController);

// Read (Get Specific)
groupsRouter.get('/:groupId', authMiddleware, groupsGetSpecificController);

// Update (Put)
groupsRouter.put('/:groupId', authMiddleware, groupsPutController);

// Delete (Delete)
groupsRouter.delete('/:groupId', authMiddleware, groupsDeleteController);

export default groupsRouter;