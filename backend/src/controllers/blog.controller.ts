import type { Request, Response, NextFunction } from 'express';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: { blogs: result.rows },
    });
  } catch (err) {
    next(err);
  }
};

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM blogs WHERE id = $1', [id]);
    const blog = result.rows[0];

    if (!blog) {
      return next(new AppError('No blog found with that ID', 404));
    }

    const commentsResult = await db.query('SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC', [id]);

    res.status(200).json({
      status: 'success',
      data: {
        blog,
        comments: commentsResult.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, media_url, media_type, category, author } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO blogs (title, content, media_url, media_type, category, author) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, content, media_url, media_type, category, author]
    );

    res.status(201).json({
      status: 'success',
      data: { blog: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, content, media_url, media_type, category, author } = req.body;

  try {
    const result = await db.query(
      'UPDATE blogs SET title = $1, content = $2, media_url = $3, media_type = $4, category = $5, author = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [title, content, media_url, media_type, category, author, id]
    );

    if (result.rows.length === 0) {
      return next(new AppError('No blog found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { blog: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('No blog found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const likeBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await db.query('UPDATE blogs SET likes = likes + 1 WHERE id = $1 RETURNING likes', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('No blog found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { likes: result.rows[0].likes },
    });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, comment, parent_id } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO comments (blog_id, name, comment, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, comment, parent_id || null]
    );

    res.status(201).json({
      status: 'success',
      data: { comment: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params;
  try {
    const result = await db.query('DELETE FROM comments WHERE id = $1 RETURNING *', [commentId]);

    if (result.rows.length === 0) {
      return next(new AppError('No comment found with that ID', 404));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
