var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const weixinConfig = {
    id: 'wx718b667be9b708b2',
    secret: 'd61cc9e73723f413ce3af3d2ebfe202a',
    token: 'CAIDAMAODEXIAODANGAO'
  };
  try {
    const params = req.query;
    const TOKEN = weixinConfig.token;
    const signature = params.signature;
    const timestamp = params.timestamp;
    const nonce = params.nonce;
    const echostr = params.echostr;
    const tmpArr = [TOKEN, timestamp, nonce];
    const tmpStr = new Hashes.SHA1().hex(tmpArr.sort().join(''));
    if (tmpStr === signature) {
      return echostr;
    } else {
      return false;
    }
  } catch (e) { return e; }
});

module.exports = router;