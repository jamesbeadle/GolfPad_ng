import express = require('express');
import cors = require('cors');

import golfersRouter from './routes/golfers';
import coursesRouter from './routes/golfCourses';
import golferShotsRouter from './routes/golferShots';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/golfers', golfersRouter);
app.use('/golfCourses', coursesRouter);
app.use('/golferShots', golferShotsRouter);

export default app;
