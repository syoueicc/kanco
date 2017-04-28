const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const wechat = require('wechat');
const WechatAPI = require('wechat-api');
const _ = require('lodash');

const mall = require('./mall');

module.exports = function (app) {
  const weixinConfig = {
    appid: 'wx718b667be9b708b2',
    secret: 'd61cc9e73723f413ce3af3d2ebfe202a',
    token: 'CAIDAMAODEXIAODANGAO',
    encodingAESKey: 'aawOE2hSzsniM43AAU2WsZbEEWRMJEzSe33Dy0Jcy8a',
    checkSignature: true
  };

  const api = new WechatAPI(weixinConfig.appid, weixinConfig.secret);
  app.use('/mall', mall(api));
  app.use('/wxapi', wechat(weixinConfig)
    .text(function(message, req, res, next) {
      console.log(message);
      res.reply("康康不明白客人在说什么哦，不如点击订购买一波蛋糕吧~")
    })
    .event(function(message, req, res, next) {
      switch(message.Event) {
        case "CLICK":
        case "SCAN":
        case "subscribe":
          // if(_.get(message, 'EventKey')) {
          //   res.reply("event subscribe saoma");
          // }else {
            api.getMaterialCount((err, result, response) => {
              const offset = _.get(result, 'news_count') - 1;
              console.log(offset);
              api.getMaterials('news', offset, 1, (err, news) => {
                res.reply([
                  {
                    title: _.get(news, 'item.0.content.news_item.0.title'),
                    description: _.get(news, 'item.0.content.news_item.0.digest'),
                    picurl: _.get(news, 'item.0.content.news_item.0.thumb_url'),
                    url: _.get(news, 'item.0.content.news_item.0.url')
                  }
                ])
              })
            })
          //}
          break;
        case "unsubscribe":
          res.reply("unsubscribe");
          break;
        case "LOCATION":
          res.reply("康康不明白客人在说什么哦，不如点击订购买一波蛋糕吧~");
          break;
        //case "CLICK":
          //res.reply("event caidan", _.get(message, 'EventKey'));
          //break;
        case 'VIEW':
          //res.reply("event view", _.get(message, 'EventKey'));
      }
    })
    .middlewarify()
  );

};