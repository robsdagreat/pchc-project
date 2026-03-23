import type { Request, Response, NextFunction } from 'express';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const getTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query('SELECT * FROM team_members ORDER BY display_order ASC');
    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: { team: result.rows },
    });
  } catch (err) {
    next(err);
  }
};

export const createTeamMember = async (req: Request, res: Response, next: NextFunction) => {
  const { name, position, bio, photo_url, display_order } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO team_members (name, position, bio, photo_url, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, position, bio, photo_url, display_order]
    );

    res.status(201).json({
      status: 'success',
      data: { member: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const updateTeamMember = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, position, bio, photo_url, display_order } = req.body;

  try {
    const result = await db.query(
      'UPDATE team_members SET name = $1, position = $2, bio = $3, photo_url = $4, display_order = $5 WHERE id = $6 RETURNING *',
      [name, position, bio, photo_url, display_order, id]
    );

    if (result.rows.length === 0) {
      return next(new AppError('No team member found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { member: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTeamMember = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM team_members WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('No team member found with that ID', 404));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
