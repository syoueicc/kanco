const express = require('express');
const router = express.Router();
const crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  const weixinConfig = {
    id: 'wx718b667be9b708b2',
    secret: 'd61cc9e73723f413ce3af3d2ebfe202a',
    token: 'CAIDAMAODEXIAODANGAO',
    encodingAESKey: 'aawOE2hSzsniM43AAU2WsZbEEWRMJEzSe33Dy0Jcy8a',
    checkSignature: true
  };
})
.get('/wxapi', function (req, res, next) {
  try {
    const params = req.query;
    const TOKEN = weixinConfig.token;
    const signature = params.signature;
    const timestamp = params.timestamp;
    const nonce = params.nonce;
    const echostr = params.echostr;
    const tmpArr = [TOKEN, timestamp, nonce];
    const hash = crypto.createHash('sha1');
    const tmpStr = hash.update(tmpArr.sort().join('')).digest('hex');
    console.log(tmpStr, signature, '////////////////')
    if (tmpStr === signature) {
      res.send(echostr);
    } else {
      res.send(false);
    }
  } catch (e) { res.send(e); }
});


module.exports = router;