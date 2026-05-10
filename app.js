const express = require('express');
require('dotenv').config();
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/workouts', require('./src/routes/workoutRoutes'));
app.use('/api/exercises', require('./src/routes/exerciseRoutes'));
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.url} not found`,
  });
});
app.use(errorHandler);

module.exports = app;