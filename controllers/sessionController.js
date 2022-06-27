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

  if (!session) {
    return next(new AppError(`'Session not established`, 400));
  }

  res.json(session);
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
