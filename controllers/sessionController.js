const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getSessionData = catchAsync(async (req, res, next) => {
  const { sessionKey } = req.query;

  if (!sessionKey) {
    return next(new AppError(`'sessionKey' is required.`, 400));
  }

  const data = await req.session[sessionKey];

  res.json(data);
});

exports.getAllSessionData = catchAsync(async (req, res, next) => {
  const { session } = await req;
  const obj = {
    session,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    cookieSecret: process.env.COOKIE_SECRET,
    cookieExpireIn: process.env.COOKIE_EXPIPRE_IN_MIN,
    redisPort: process.env.REDIS_PORT,
    redisEndPoint: process.env.REDIS_END_POINT,
  };
  if (!session) {
    return next(new AppError(`'Session not established`, 400));
  }

  res.json(obj);
});

exports.setSessionData = catchAsync(async (req, res, next) => {
  const { data, sessionKey } = req.body;

  if (!sessionKey || !data) {
    return next(new AppError(`'sessionKey' or 'data' is missing`), 400);
  }

  req.session[sessionKey] = data;

  res.json({ message: 'successfully added to session' });
});

exports.deleteSessionData = catchAsync(async (req, res, next) => {
  const { sessionKey } = req.query;

  if (!sessionKey) {
    return next(new AppError(`'sessionKey' is required.`, 400));
  }

  await req.session.destroy();

  res.sendStatus(204);
});
