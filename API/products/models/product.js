const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:String
    
    // img:{
    //     type:String
    // },
    // description:{
    //     type: String
    // },
    // Catag:{
    //     type:String
    // }
});

var product = module.exports = mongoose.model('product',productSchema);
module.exports = product;

module.exports.addProduct = function(newProduct,callback){
    newProduct.save(callback);
}
module.exports.editProduct = function(oldProductID,newProduct,callback){
    const query = {_id:oldProductID}
    product.findByIdAndUpdate(query,newProduct,callback);
}
module.exports.removeProduct = function(productID,callback){
    const query = {_id:productID}
    product.remove(query,callback);
}