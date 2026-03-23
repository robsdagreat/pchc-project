import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const createAdminUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, role, permissions } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await db.query(
      'INSERT INTO admins (username, password_hash, role, permissions) VALUES ($1, $2, $3, $4) RETURNING id, username, role, permissions',
      [username, password_hash, role || 'admin', permissions || []]
    );

    res.status(201).json({
      status: 'success',
      data: {
        user: result.rows[0],
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return next(new AppError('Username already exists', 400));
    }
    next(err);
  }
};

export const getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query('SELECT id, username, role, permissions, created_at FROM admins ORDER BY created_at DESC');
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: { users: result.rows },
    });
  } catch (err) {
    next(err);
  }
};

export const updateAdminUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { role, permissions } = req.body;

  try {
    const result = await db.query(
      'UPDATE admins SET role = $1, permissions = $2 WHERE id = $3 RETURNING id, username, role, permissions',
      [role, permissions, id]
    );

    if (result.rows.length === 0) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { user: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAdminUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  // Prevent deleting self
  if (req.admin?.id === parseInt(id as string)) {
      return next(new AppError('You cannot delete yourself', 400));
  }

  try {
    const result = await db.query('DELETE FROM admins WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
