// Packages
import express, { Router } from 'express';

// Files
import { groupMembersPostController, 
    groupMembersGetAllController, 
    groupMembersGetSpecificController, 
    groupMembersPutController, 
    groupMembersDeleteController 
} from '../controllers/groupMembersController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import { adminMiddleware } from '../middlewares/adminMiddleware.ts';

const groupMembersRoute: Router = express.Router();

// Create (Post)
groupMembersRoute.post('/', authMiddleware, adminMiddleware, groupMembersPostController);

// Read (All Group)
groupMembersRoute.get('/', authMiddleware, groupMembersGetAllController);

// Read (Specific Group)
groupMembersRoute.get('/:groupId', authMiddleware, groupMembersGetSpecificController);

// Update (Put)
groupMembersRoute.put('/:memberId', authMiddleware, adminMiddleware, groupMembersPutController);

// Delete (Delete)
groupMembersRoute.delete('/:memberId', authMiddleware, adminMiddleware, groupMembersDeleteController);

export default groupMembersRoute;