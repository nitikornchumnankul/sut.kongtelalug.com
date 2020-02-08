const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    image: {
       type: String
    } 
});

var ProductModel = module.exports = mongoose.model('Product',productSchema);
module.exports = ProductModel;

