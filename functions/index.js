const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    user: functions.config().sql.user,
    password: functions.config().sql.password,
    server: functions.config().sql.host,
    database: functions.config().sql.dbname,
    port: 1433,
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  };
  

let pool;
async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  }
  return pool;
}

app.post('/golfers', async (req, res) => {
  try {
    const {
      uid,
      username,
      firstName,
      lastName,
      handicap
    } = req.body;

    if (!uid) {
      return res.status(400).json({ error: 'UID is required.' });
    }
    if (!/^[A-Za-z0-9]{6,20}$/.test(username)) {
      return res.status(400).json({
        error: 'Username must be 6–20 alphanumeric only.'
      });
    }
    if (!/^[A-Za-z]{2,20}$/.test(firstName)) {
      return res.status(400).json({
        error: 'First name must be 2–20 letters only.'
      });
    }
    if (!/^[A-Za-z]{2,20}$/.test(lastName)) {
      return res.status(400).json({
        error: 'Last name must be 2–20 letters only.'
      });
    }
    if (!/^\d+(\.\d)?$/.test(handicap)) {
      return res.status(400).json({
        error: 'Handicap must be a number with exactly one decimal place.'
      });
    }

    const db = await getPool();
    const request = db.request();
    request.input('uid', sql.VarChar, uid);
    request.input('username', sql.VarChar, username);
    request.input('firstName', sql.VarChar, firstName);
    request.input('lastName', sql.VarChar, lastName);
    request.input('handicap', sql.Decimal(4, 1), handicap);

    const insertQuery = `
      INSERT INTO golfers (uid, username, first_name, last_name, handicap)
      VALUES (@uid, @username, @firstName, @lastName, @handicap)
    `;

    await request.query(insertQuery);

    return res.status(201).json({ message: 'Golfer created successfully.' });
  } catch (err) {
    console.error(err);
    if (
      err.originalError &&
      err.originalError.info &&
      err.originalError.info.number === 2627
    ) {
      return res.status(400).json({ error: 'Username already taken.' });
    }
    return res.status(500).json({ error: 'Database error.' });
  }
});

exports.api = functions.https.onRequest(app);
