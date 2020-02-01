const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:String
});

var product = module.exports = mongoose.model('product',productSchema);
module.exports = product;