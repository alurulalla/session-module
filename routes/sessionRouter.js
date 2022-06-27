const express = require('express');

const {
  getSessionData,
  setSessionData,
  getAllSessionData,
  deleteSessionData,
} = require('../controllers/sessionController');

const router = express.Router();

router
  .route('/')
  .get(getSessionData)
  .post(setSessionData)
  .delete(deleteSessionData);
router.route('/getall').get(getAllSessionData);

module.exports = router;
