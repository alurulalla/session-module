const express = require('express');
const {
  getCacheData,
  setCacheData,
} = require('../controllers/cacheController');

const router = express.Router();

router.route('/').get(getCacheData).post(setCacheData);

module.exports = router;
