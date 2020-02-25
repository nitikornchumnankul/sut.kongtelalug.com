let express = require('express');
let router  = express.Router();
let Product = require('../models/product');
let app = require('../server');
let Grid = require('gridfs-stream');






router.get('/', async (req, res) => {
    let products = await Product.find({})
    res.json(products)
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    console.log(req.params);
    console.log(id);
    
    try{
        let product = await Product.findById(id)
        res.json(product)
    }catch(error){
        res.status(400).json(error);
    }
});

router.post('/addProduct',async (req, res) => {  
    console.log(req)
    try{
        let product = new Product({
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