import type { Request, Response, NextFunction } from 'express';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const getDonationTiers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query('SELECT * FROM donation_tiers WHERE is_active = TRUE ORDER BY amount ASC NULLS LAST');
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: { tiers: result.rows },
    });
  } catch (err) {
    next(err);
  }
};

export const createDonationTier = async (req: Request, res: Response, next: NextFunction) => {
  const { name, amount, impact_description } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO donation_tiers (name, amount, impact_description) VALUES ($1, $2, $3) RETURNING *',
      [name, amount, impact_description]
    );

    res.status(201).json({
      status: 'success',
      data: { tier: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const updateDonationTier = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, amount, impact_description, is_active } = req.body;

  try {
    const result = await db.query(
      'UPDATE donation_tiers SET name = $1, amount = $2, impact_description = $3, is_active = $4 WHERE id = $5 RETURNING *',
      [name, amount, impact_description, is_active, id]
    );

    if (result.rows.length === 0) {
      return next(new AppError('No donation tier found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { tier: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteDonationTier = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM donation_tiers WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('No donation tier found with that ID', 404));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
