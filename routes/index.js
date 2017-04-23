const express = require('express');
const router = express.Router();
const crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.send("hello weixin")
});


module.exports = router;