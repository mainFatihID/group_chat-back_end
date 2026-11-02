// Packages
import express, { Router } from 'express';

// Files
import { 
    usersRegisterPostController, 
    usersLoginPostController, 
    usersGetAllController, 
    usersGetSpecificController, 
    usersGetCurrentController, 
    usersPutController, 
    usersDeleteController 
} from '../controllers/usersController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import upload from '../middlewares/uploadMiddleware.ts';

const usersRouter: Router = express.Router();

// Create (Register)
usersRouter.post('/register', upload.single('profile_picture'), usersRegisterPostController);

// Create (Login)
usersRouter.post('/login', usersLoginPostController);

// Read (Get All)
usersRouter.get('/', authMiddleware, usersGetAllController);

// Read (Get Current)
usersRouter.get('/me', authMiddleware, usersGetCurrentController);

// Get (Specific)
usersRouter.get('/:userId', authMiddleware, usersGetSpecificController);

// Update Put
usersRouter.put('/:userId', authMiddleware, upload.single('profile_picture'), usersPutController);

// Delete (Delete)
usersRouter.delete('/:userId', authMiddleware, usersDeleteController);

export default usersRouter;