import { Router } from 'express';
import { submitContactMessage, getAllMessages, updateMessageStatus, deleteMessage } from '../controllers/contact.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', submitContactMessage);
router.get('/', protect, getAllMessages);
router.patch('/:id/status', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

export default router;
