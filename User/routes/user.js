const express = require('express');
const router = express.Router();
const user =require('../models/user');
// API CRUD

router.get('/',(req,res) =>{
    res.json({
        name:'Customer'
    })
});

module.exports = router;

