import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import httpStatus from 'http-status';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';

import routes from './routes/v1/index.js';
import viewRoutes from './routes/views/view.routes.js';
import { errorMiddleware, rateLimiter } from './middlewares/index.js';
import { morgan, envConfig } from './config/index.js';
import { ApiError } from './utils/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARES
app.use(cors());
// Access-Control-Allow *
app.options('*', cors());

// Serving  static files
app.use(express.static(path.join(__dirname, '../public')));

// Security HTTP headers
app.use(helmet());

// morgan : HTTP request LOGGING middleware
if (envConfig.NODE_ENV !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// LIMIT request from auth endpoints
if (envConfig.NODE_ENV === 'production') {
  app.use('/api/v1/users/login', rateLimiter);
}

// Body Parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// Compress response text or json
app.use(compression());
// Prevent http parameter polution
app.use(
  hpp({
    whitelist: ['name', 'price', 'duration', 'tourGroupSize', 'ratingsAverage'],
  }),
);

// ROUTES
app.use('/', viewRoutes);
app.use('/api/v1', routes);

// Catch-all route for handling unknown endpoints
app.all('*', (req, res, next) => {
  const err = new ApiError(httpStatus.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`);
  next(err);
});

//error converter
app.use(errorMiddleware.errorConverter);
// error handler
app.use(errorMiddleware.errorHandler);

export default app;
