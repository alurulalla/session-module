const express = require('express');

const {
  getSessionData,
  setSessionData,
  getAllSessionData,
} = require('../controllers/sessionController');

const router = express.Router();

router.route('/').get(getSessionData).post(setSessionData);
router.route('/getall').get(getAllSessionData);

module.exports = router;
