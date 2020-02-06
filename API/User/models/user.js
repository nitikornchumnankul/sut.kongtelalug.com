const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String
});

var user =module.exports = mongoose.model('user',userSchema);
module.exports = user;

//Metthod CRUD