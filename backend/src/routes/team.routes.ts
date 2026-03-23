import { Router } from 'express';
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/team.controller.js';
import { protect, hasPermission } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getTeam);
router.post('/', protect, hasPermission('manage_team'), createTeamMember);
router.put('/:id', protect, hasPermission('manage_team'), updateTeamMember);
router.delete('/:id', protect, hasPermission('manage_team'), deleteTeamMember);

export default router;
