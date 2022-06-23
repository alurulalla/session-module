const redisClient = require('../services/redisServices');

exports.getCacheData = async (req, res) => {
  const { cacheKey } = req.query;
  const data = await redisClient.get(cacheKey);

  res.send(JSON.parse(data));
};

exports.setCacheData = async (req, res) => {
  const { cacheKey, data } = req.body;

  await redisClient.set(cacheKey, JSON.stringify(data));

  res.json({ messag: 'Successfully cached the data' });
};
