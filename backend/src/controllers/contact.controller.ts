import type { Request, Response, NextFunction } from 'express';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const submitContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, subject, message } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject, message]
    );

    res.status(201).json({
      status: 'success',
      data: { message: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: { messages: result.rows },
    });
  } catch (err) {
    next(err);
  }
};

export const updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body; // e.g., 'read', 'archived'

  try {
    const result = await db.query(
      'UPDATE contact_messages SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return next(new AppError('No message found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { message: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  try {
    const result = await db.query('DELETE FROM contact_messages WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('No message found with that ID', 404));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
