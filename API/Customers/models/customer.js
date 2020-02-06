const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name:String
});

var customer =module.exports = mongoose.model('customer',customerSchema);
module.exports = customer;

//Metthod CRUD