var mongoose = require('mongoose');
var host = '127.0.0.1'
var port = '27017'
var dbName = 'mall'

//连接MongoDB数据库
mongoose.connect(`mongodb://${host}:${port}/${dbName}`);
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});