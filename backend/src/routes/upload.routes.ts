import { Router } from 'express';
import { uploadFile } from '../controllers/upload.controller.js';
import upload from '../services/upload.service.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', protect, upload.single('file'), uploadFile);

export default router;
