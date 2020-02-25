let express = require('express');
let router  = express.Router();
let Product = require('../models/product');
let multer = require('multer');
let app = require('../server');

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
    console.log(req.image)
    try{
        let product = new Product({
            name:req.body.name,
            image:req.body.image
        });
        product.save();
        res.status(201).end();
    }catch(error){
        res.status(400).json(error)
    }  
});

module.exports = router;