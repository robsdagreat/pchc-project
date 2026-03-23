import { Router } from 'express';
import { getHomepageData, getSectionContent, updateSectionContent } from '../controllers/content.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

// Unified homepage data
router.get('/homepage', getHomepageData);

// Section specific content
router.get('/:section', getSectionContent);
router.put('/:section', protect, updateSectionContent);

export default router;
