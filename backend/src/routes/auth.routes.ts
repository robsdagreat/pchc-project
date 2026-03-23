import { Router } from 'express';
import { login, changePassword } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.put('/change-password', protect, changePassword);

export default router;
