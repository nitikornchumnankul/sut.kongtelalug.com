const express = require('express');
const router  = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const app = require('../server');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'../products/uploads/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});
    
const upload = multer({ 
    storage: storage 
});

router.get('/', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    console.log(id);
    
    try{
        const product = await Product.findById(id)
        res.json(product)
    }catch(error){
        res.status(400).json(error);
    }
});

router.post('/addProduct', upload.single('image') ,async (req, res) => {  
    console.log(req)
    try{
        const product = new Product({
            name:req.body.name,
            image: req.file.filename
        });
        product.save();
        res.status(201).end();
    }catch(error){
        res.status(400).json(error)
    }  
});

module.exports = router;