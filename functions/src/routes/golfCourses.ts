import { Router, Request, Response } from 'express';
import * as sql from 'mssql';
import { getPool } from '../db/pool';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { course_name, location } = req.body;

    if (!course_name) {
      return res.status(400).json({ error: 'Course name is required.' });
    }

    const db = await getPool();
    await db.request()
      .input('courseName', sql.NVarChar, course_name)
      .input('location', sql.NVarChar, location || null)
      .query(`
        INSERT INTO golf_courses (course_name, location)
        VALUES (@courseName, @location)
      `);

    return res.status(201).json({ message: 'Golf course created successfully.' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Database error.' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const db = await getPool();
    const result = await db.request().query('SELECT * FROM golf_courses');

    return res.json(result.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch golf courses.' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const db = await getPool();
    const result = await db.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM golf_courses WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Golf course not found.' });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch golf course.' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { course_name, location } = req.body;

    if (!course_name) {
      return res.status(400).json({ error: 'Course name is required.' });
    }

    const db = await getPool();
    const result = await db.request()
      .input('id', sql.Int, id)
      .input('courseName', sql.NVarChar, course_name)
      .input('location', sql.NVarChar, location || null)
      .query(`
        UPDATE golf_courses
        SET course_name = @courseName, location = @location
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Golf course not found.' });
    }

    return res.json({ message: 'Golf course updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update golf course.' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const db = await getPool();
    const result = await db.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM golf_courses WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Golf course not found.' });
    }

    return res.json({ message: 'Golf course deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete golf course.' });
  }
});

export default router;
