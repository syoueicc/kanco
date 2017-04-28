var express = require('express');
var router = express.Router();
var _ = require('lodash');

module.exports = function(api) {
  router.get('/', function(req, res, next) {
    api.getGoodsByStatus(1, (err, result)=>{
      res.render('index', { goods: _.get(result, 'products_info')});
    })
    
  });

  return router;
}