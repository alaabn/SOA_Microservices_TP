const express = require('express');

const router = new express.Router();

router.get('/', function (req, res, next) {
  res.send(`<h2> Health Check ✅ </h2>`);
});

module.exports = router;
