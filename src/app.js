const express = require('express');
const app = express();
const { requestLogger, logger } = require('./middlewares/logger');
const userRoutes = require('./modules/users/users.routes');
const errorHandler = require('./middlewares/errorHandler');
app.use(express.json());
app.use(requestLogger);

app.use('/api/users', userRoutes);
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use(errorHandler);
module.exports = app;