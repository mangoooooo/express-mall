var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. 二级路由 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  var params = {
    userName: req.body.username,
    userPwd: req.body.password
  }

  User.findOne(params, function(err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })

    } else {
      if (doc) {
        //  存cookie
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000*60*60,   //  1小时
        })
        //  存session
        req.session.user = doc;

        res.json({
          status: 0,
          msg: '',
          result: doc
        })

      } else {
        res.json({
          status: 1,
          msg: '用户名或账号不正确'
        })
      }
    }
  })
})

router.post('/logout', function (req, res, next) {
  res.cookie("userId", "", {
    path: '/',
    maxAge: -1
  })
  req.session.user = null

  res.json({
    status: 0,
    msg: '',
    result: null
  })
})

router.post('/checkLogin', function (req, res, next) {
  if (req.session.user) {
    res.json({
      status: 0,
      msg: '',
      result: req.session.user
    })
  } else {
    res.json({
      status: 1,
      msg: '未登录',
    })
  }
  
})

router.get('/cartList', function (req, res, next) {
  var user = req.session.user;

  User.findOne({userId: user.userId}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })

    } else {
      if (doc) {
        res.json({
          status: 0,
          msg: '',
          result: doc.cartList
        })
      } else {
        res.json({
          status: 1,
          msg: '用户不存在'
        })
      }
    }
  })
});

router.post('/cart/del', function (req, res, next) {
  var user = req.session.user;
  var productId = req.body.productId;

  if (!productId) {
    res.json({
      status: 1,
      msg: '参数不正确'
    })
  }

  User.update({
    userId: user.userId
  }, {
    $pull: {
      'cartList': {'productId': productId}
    }
  }, function (err, doc) {
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
})

router.post('/cart/edit', function (req, res, next) {
  var user = req.session.user;
  var productId = req.body.productId;
  var num = req.body.num;

  User.update({
    "userId":user.userId,
    "cartList.productId": productId
  }, {
    "cartList.$.productNum": num
  }, function (err, doc) {
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
})

module.exports = router;
