import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  try {
    const result = await db.query('SELECT * FROM admins WHERE username = $1', [username]);
    const admin = result.rows[0];

    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return next(new AppError('Invalid credentials', 401));
    }

    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        role: admin.role,
        permissions: admin.permissions || []
      },
      process.env.JWT_SECRET as string,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
    );

    res.status(200).json({
      status: 'success',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        permissions: admin.permissions || []
      },
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.admin?.id;

  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new passwords', 400));
  }

  // Strong password validation Regex
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!strongPasswordRegex.test(newPassword)) {
    return next(new AppError('New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.', 400));
  }

  try {
    const result = await db.query('SELECT * FROM admins WHERE id = $1', [adminId]);
    const admin = result.rows[0];

    if (!admin || !(await bcrypt.compare(currentPassword, admin.password_hash))) {
      return next(new AppError('Invalid current password verified', 401));
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE admins SET password_hash = $1 WHERE id = $2', [password_hash, adminId]);

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

