const express = require('express');
const router = express.Router();
const product = require('../models/product');

router.get('/',(req,res) =>{
    res.json({
        name:'Product'
    });
});

module.exports = router;