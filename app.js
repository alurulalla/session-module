const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = require('./services/redisServices');
const sessionRouter = require('./routes/sessionRouter');
const cacheRouter = require('./routes/cacheRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

app.use(cors());
app.use(express.json());

redisClient.on('connect', () => console.log('Successfully connected to Redis'));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === 'production' ? 'true' : 'auto',
      httpOnly: true,
      expires: 1000 * 60 * +process.env.COOKIE_EXPIPRE_IN_MIN,
      sameSite: true,
    },
  })
);

app.use('/api/v1/session', sessionRouter);
app.use('/api/v1/cache', cacheRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Unable to resolve the request: ${req.originalUrl}`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
