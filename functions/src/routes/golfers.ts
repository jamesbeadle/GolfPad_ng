import { Router, Request, Response } from 'express';
import * as sql from 'mssql';
import { getPool } from '../db/pool';
import { Golfer } from '../models/Golfer';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { uid, username, first_name, last_name, handicap, home_golf_course_id } = req.body as Golfer;

    if (!uid || !username || !first_name || !last_name || handicap === undefined) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const db = await getPool();
    await db.request()
      .input('uid', sql.NVarChar, uid)
      .input('username', sql.NVarChar, username)
      .input('firstName', sql.NVarChar, first_name)
      .input('lastName', sql.NVarChar, last_name)
      .input('handicap', sql.Decimal(4, 1), handicap)
      .input('homeGolfCourseId', sql.Int, home_golf_course_id || null)
      .query(`
        INSERT INTO golfers (uid, username, first_name, last_name, handicap, home_golf_course_id)
        VALUES (@uid, @username, @firstName, @lastName, @handicap, @homeGolfCourseId)
      `);

    return res.status(201).json({ message: 'Golfer created successfully.' });
  } catch (err: any) {
    if (err.code === 'EREQUEST') {
      return res.status(400).json({ error: 'Invalid input data.' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getPool();
    const result = await db.request().query(`
      SELECT g.*, c.course_name, c.location
      FROM golfers g
      LEFT JOIN golf_courses c ON g.home_golf_course_id = c.id
    `);

    return res.json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch golfers.' });
  }
});

router.get('/:uid', async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const db = await getPool();
    const result = await db.request()
      .input('uid', sql.NVarChar, uid)
      .query(`
        SELECT g.*, c.course_name, c.location
        FROM golfers g
        LEFT JOIN golf_courses c ON g.home_golf_course_id = c.id
        WHERE g.uid = @uid
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Golfer not found.' });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch golfer.' });
  }
});

export default router;
