const express = require('express');
const router = express.Router();
const { uploadCSV } = require('./users.controller');

router.post('/upload', uploadCSV);

module.exports = router;