const express = require('express');
const router = express.Router();
const vender =require('../models/vender');
// API CRUD

router.get('/',(req,res) =>{
    res.json({
        name:'Vender'
    })
});

module.exports = router;

