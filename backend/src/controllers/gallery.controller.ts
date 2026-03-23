import type { Request, Response, NextFunction } from 'express';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const getGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query('SELECT * FROM gallery ORDER BY created_at DESC');
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: { gallery: result.rows },
    });
  } catch (err) {
    next(err);
  }
};

export const createGalleryItem = async (req: Request, res: Response, next: NextFunction) => {
  const { title, url, category, media_type } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO gallery (title, url, category, media_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, url, category, media_type]
    );

    res.status(201).json({
      status: 'success',
      data: { item: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteGalleryItem = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM gallery WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('No item found with that ID', 404));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
