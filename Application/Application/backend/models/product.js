const mongoose = require('mongoose');
const regex    = /\w/;
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        validate: {
            validator: function(valid){
                return regex.test(valid);
            }
        },
       message: props => `${props.value} is not a valid special charactor`
    },
    // image:{
    //    type:String
     
    // },
    description:{
        type:String,
        validate: {
            validator: function(valid){
                return regex.test(valid);
            }
        },
        message: props => `${props.value} is not a valid special charactor`
    },
    Catag:{
        type: String,
        required: true,
        validate: {
            validator: function(valid){
                return regex.test(valid);
            }
        },
        message: props => `${props.value} is not a valid special charactor`
    },
});

var Product = module.exports = mongoose.model('Product',productSchema);
module.exports = Product;

module.exports.addProduct = function(newPorduct,callback){
    newPorduct.save(callback);
}
module.exports.editProduct = function(oldProductID,newProduct,callback){
    const query ={_id:oldProductID}
    Product.findByIdAndUpdate(query,newProduct,callback);
}
module.exports.removeProduct = function(productID,callback){
    const query = {_id: productID};
    Product.remove(query,callback);
}




