const mongoose = require('mongoose');
const venderSchema = new mongoose.Schema({
    name:String
});

var vender =module.exports = mongoose.model('vender',venderSchema);
module.exports = vender;

//Metthod CRUD