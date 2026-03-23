import { Router } from 'express';
import { getGallery, createGalleryItem, deleteGalleryItem } from '../controllers/gallery.controller.js';
import { protect, hasPermission } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getGallery);
router.post('/', protect, hasPermission('manage_gallery'), createGalleryItem);
router.delete('/:id', protect, hasPermission('manage_gallery'), deleteGalleryItem);

export default router;
