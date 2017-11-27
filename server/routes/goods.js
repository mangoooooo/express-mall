var express = require('express');
var router = express.Router();
var Goods = require('../models/goods');
var User  = require('../models/user')

/* GET users listing. 二级路由 */
router.get('/list', function(req, res, next) {
  let sort      = parseInt(req.param("sort"));
  let page      = parseInt(req.param("page"));
  let pageSize  = parseInt(req.param("pageSize"));
  let priceFrom = parseInt(req.param("priceFrom"));
  let priceTo   = parseInt(req.param("priceTo"));

  let findParams = {};
  let sortParams = {};
  let skip = (page - 1) * pageSize;   //  分页

  //  价格范围查询
  if (priceFrom || priceTo) {
    findParams.salePrice = {
      $gt: priceFrom,
      $lte: priceTo,
    }
  }
  //  排序
  if (sort == 1) {
    sortParams['salePrice'] = -1;  //  价格由高到低
  }
  if (sort == 2) {
    sortParams['dateAdded'] = -1;  //  上架日期由近到远
  }

  let goodsModel = Goods.find(findParams).skip(skip).limit(pageSize);
  goodsModel.sort(sortParams);
  goodsModel.exec({}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc,
        }
      })
    }
  })
});

router.post('/addCart', function (req, res, next) {
  var user = req.session.user;

  // if (!user) {
  //   res.json({
  //     status: 1,
  //     msg: '未登录'
  //   });

  //   return false;
  // }

  var userId = user.userId;
  var productId = req.body.productId;

  if (!productId) {
    res.json({
      status: 1,
      msg: '无效的参数'
    })
    return false;
  }

  //  get user
  var userModel = User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else if (userDoc) {
      //  判断购物车中是否有该商品
      let goodsItem = false;
      userDoc.cartList.forEach(item => {
        if (item.productId === productId) {
          goodsItem = true;
          item.productNum++;
        }
      });

      if (goodsItem) {
        userDoc.save(function (err, doc) {
          if (err) {
            res.json({
              status: 1,
              msg: err.message
            })
          } else {
            res.json({
              status: 0,
              msg: '',
              result: ''
            })
          }
        })
        return false;
      }

      //  原来没有：get product
      Goods.findOne({productId: productId}, function (err, goodsDoc) {
        if (err) {
          res.json({
            status: 1,
            msg: err.message
          })
        } else if (goodsDoc) {
          goodsDoc.productNum = 1;
          goodsDoc.checked = 1;

          userDoc.cartList.push(goodsDoc);
          userDoc.save(function (err, doc) {
            if (err) {
              res.json({
                status: 1,
                msg: err.message
              })
            } else {
              res.json({
                status: 0,
                msg: '',
                result: ''
              })
            }
          })
        }
      })

    }
  })
});

module.exports = router;
