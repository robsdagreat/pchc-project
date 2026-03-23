import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../middlewares/error.middleware.js';

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(new AppError('Please upload a file', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      url: req.file.path,
      format: req.file.mimetype,
      public_id: (req.file as any).filename,
    },
  });
};
