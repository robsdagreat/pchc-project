import { Router } from 'express';
import { createAdminUser, getAllAdmins, updateAdminUser, deleteAdminUser } from '../controllers/user.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

// Only Super Admins can manage other admins
router.use(protect);
router.use(restrictTo('super_admin'));

router.get('/', getAllAdmins);
router.post('/', createAdminUser);
router.put('/:id', updateAdminUser);
router.delete('/:id', deleteAdminUser);

export default router;
