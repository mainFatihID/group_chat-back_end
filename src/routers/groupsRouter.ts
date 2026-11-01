import express, { Router } from 'express';
import { groupsPostController, groupsGetAllController, groupsGetSpecificController, groupsPutController, groupsDeleteController } from '../controllers/groupsController.ts';

const groupsRouter: Router = express.Router();

// Create | Post
groupsRouter.post('/', groupsPostController);

// Read | Get
// Get All
groupsRouter.get('/', groupsGetAllController);

// Get Specific
// Add this under Read | Get in groupsRoute.ts
groupsRouter.get('/:groupsId', groupsGetSpecificController);

// Update | Put
groupsRouter.put('/:groupsId', groupsPutController);

// Delete | Delete
groupsRouter.delete('/:groupsId', groupsDeleteController);

export default groupsRouter;