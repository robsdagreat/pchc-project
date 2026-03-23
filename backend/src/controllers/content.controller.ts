import type { Request, Response, NextFunction } from 'express';
import db from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

export const getHomepageData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const heroResult = await db.query('SELECT * FROM home_content WHERE section_name = $1', ['hero']);
    const aboutResult = await db.query('SELECT * FROM home_content WHERE section_name = $1', ['about']);
    const whatWeDoResult = await db.query('SELECT * FROM home_content WHERE section_name = $1', ['whatWeDo']);
    const impactResult = await db.query('SELECT * FROM home_content WHERE section_name = $1', ['impact']);
    const achievementsResult = await db.query('SELECT * FROM home_content WHERE section_name = $1', ['achievements']);
    const getInvolvedResult = await db.query('SELECT * FROM home_content WHERE section_name = $1', ['getInvolved']);
    
    // Fetch latest 3 blogs for the homepage
    const storiesResult = await db.query('SELECT * FROM blogs ORDER BY created_at DESC LIMIT 3');
    
    // Fetch all team members
    const teamResult = await db.query('SELECT * FROM team_members ORDER BY display_order ASC');

    res.status(200).json({
      status: 'success',
      data: {
        hero: heroResult.rows[0],
        about: aboutResult.rows[0],
        whatWeDo: whatWeDoResult.rows[0],
        impact: impactResult.rows[0],
        achievements: achievementsResult.rows[0],
        getInvolved: getInvolvedResult.rows[0],
        stories: storiesResult.rows,
        team: teamResult.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getSectionContent = async (req: Request, res: Response, next: NextFunction) => {
  const { section } = req.params;
  try {
    const result = await db.query('SELECT * FROM home_content WHERE section_name = $1', [section]);
    const content = result.rows[0];

    if (!content) {
      return next(new AppError('No content found for that section', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { content },
    });
  } catch (err) {
    next(err);
  }
};

export const updateSectionContent = async (req: Request, res: Response, next: NextFunction) => {
  const { section } = req.params;
  const { title, subtitle, description, image_url, cta_text, cta_link, is_active } = req.body;

  try {
    const result = await db.query(
      'UPDATE home_content SET title = $1, subtitle = $2, description = $3, image_url = $4, cta_text = $5, cta_link = $6, is_active = $7, updated_at = CURRENT_TIMESTAMP WHERE section_name = $8 RETURNING *',
      [title, subtitle, description, image_url, cta_text, cta_link, is_active, section]
    );

    if (result.rows.length === 0) {
      // If section doesn't exist, create it
      const createResult = await db.query(
        'INSERT INTO home_content (section_name, title, subtitle, description, image_url, cta_text, cta_link, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [section, title, subtitle, description, image_url, cta_text, cta_link, is_active]
      );
      return res.status(201).json({
        status: 'success',
        data: { content: createResult.rows[0] },
      });
    }

    res.status(200).json({
      status: 'success',
      data: { content: result.rows[0] },
    });
  } catch (err) {
    next(err);
  }
};
