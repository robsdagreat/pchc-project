import { Router } from 'express';
import { 
  getAllBlogs, 
  getBlog, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  likeBlog, 
  addComment,
  deleteComment
} from '../controllers/blog.controller.js';
import { protect, hasPermission } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlog);
router.post('/:id/like', likeBlog);
router.post('/:id/comments', addComment);

// Protected admin routes
router.post('/', protect, hasPermission('manage_blogs'), createBlog);
router.put('/:id', protect, hasPermission('manage_blogs'), updateBlog);
router.delete('/:id', protect, hasPermission('manage_blogs'), deleteBlog);

// Comment moderation
router.delete('/comments/:commentId', protect, hasPermission('manage_blogs'), deleteComment);

export default router;
