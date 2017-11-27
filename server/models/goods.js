var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "productId":{type:String},
    "productName":String,
    "salePrice":Number,
    "checked":String,
    "productNum":Number,
    "productImage":String,
    "dateAdded": {type: Date, default: Date.now}
})

module.exports = mongoose.model('Goods', productSchema);