# mall

> 使用vue express mongoDB 构建的商城系统

> 十分简单甚至粗糙，只是为了把vue和express应用串联起来。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run server at localhost:3000
npm run start
```

## extra

1.  因为只是学习，所以服务端跟前端放在了一起，所以就共用了一个package.json

1.  如果不想用jade，可以安装ejs来使用html，具体见app.js的配置注释

1.  mongoDB 可视化管理工具用的mongochef 原本用mongoVUE 发现新建表报错但实际上能建成功，是mongoVUE的问题，换了工具就好了。

1.  使用PM2管理nodejs 进程

## 已完成部分
1.  登录、退出
1.  商品列表：分页加载、筛选、排序、加入购物车
1.  购物车列表: 删除、编辑