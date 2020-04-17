// import mongoose ,bcrypejs, config database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const regex    = /\w/;
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


// User Schema
const UserSchema = mongoose.Schema({
    name: {
      type: String,
      validate: {
        validator: function(valid){
            return regex.test(valid);
        }
    },
        message: props => `${props.value} is not a valid special charactor`
    },
    email: {
      type: String,
      required: true,
      validate:{
        validator: function(valid){
          return emailRegex.test(valid);
        }
      }

    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type:String,
      required:true
    }
  });
  
  
  const User = module.exports = mongoose.model('User', UserSchema);
  
  module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }
  
  module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
  }
  
  module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
     
      callback(null, isMatch);
    });
  }
  