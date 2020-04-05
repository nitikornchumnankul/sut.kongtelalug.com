const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Product = require('../models/product');
const multer = require('multer');
const fs     = require('fs');
const app = require('../app');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'../uploads')
    },
    filename: function(req,file,cb){
      cb(null,file.originalname);
    }
});
const uploads = multer({
  storage: storage
});

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: 'users'
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to register user'
      });
    } else {
      res.json({
        success: true,
        msg: 'User registered'
      });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {

      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({
          data: user
        }, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});


//Product rereive
router.get('/product', (req, res, next) => {
  Product.find(function (err, product) {
    if (err)
      res.send(err)
    Product.find({}).lean().exec((err,product)=>{
      res.end(JSON.stringify(product))
    })
  });

});


router.post('/addproduct',passport.authenticate('jwt', {
  session: false
}),uploads.single('image'),(req, res, next) => {
  // console.log(req.file.path)

  // const buff = fs.readFileSync(req.file.path);
  // const imageBase64 = buff.toString('base64');

  let newProduct = new Product();
  newProduct.name = req.body.name;
  newProduct.description = req.body.description;
  newProduct.Catag= req.body.Catag;
  newProduct.save();

});

router.put('/editproduct', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  let newProduct = {
    name: req.body.name,
    img: req.body.img,
    description: req.body.description,
    Catag: req.body.Catag
  };

  let oldProductID = req.body.oldId;

  Product.editProduct(oldProductID, newProduct, (err, product) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to update  product'
      });
    } else {
      res.json({
        success: true,
        msg: 'Product is updated '
      });
    }
  });
});

router.delete('/deleteproduct/:productId', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {

  let productID= req.params.productId;

  Product.removeProduct(productID, (err, product) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to update  product'
      });
    } else {
      res.json({
        success: true,
        msg: 'Product is updated '
      });
    }
  });
});

router.get('/manageproduct', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  Product.find(function (err, product) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)
    res.json(product); // return all todos in JSON format
  });
});

module.exports = router;