const winston = require('winston');
const path = require('path');


const logFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/info.log'),
      level: 'info'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error'
    }),
  ],
});

/**
 * Middleware to log requests
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = {
  logger,
  requestLogger
};