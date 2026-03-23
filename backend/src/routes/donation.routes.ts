import { Router } from 'express';
import { getDonationTiers, createDonationTier, updateDonationTier, deleteDonationTier } from '../controllers/donation.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/tiers', getDonationTiers);
router.post('/tiers', protect, createDonationTier);
router.put('/tiers/:id', protect, updateDonationTier);
router.delete('/tiers/:id', protect, deleteDonationTier);

export default router;
