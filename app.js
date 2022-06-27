const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');

const redisClient = require('./services/redisServices');
const sessionRouter = require('./routes/sessionRouter');
const cacheRouter = require('./routes/cacheRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

redisClient.on('connect', () => console.log('Successfully connected to Redis'));
redisClient.on('error', () => console.log('unable to connect to redis'));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      expires: 1000 * 60 * +process.env.COOKIE_EXPIPRE_IN_MIN,
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
