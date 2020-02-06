const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
    Product.find(function (err, product) {
        try {
            res.json(product);
        } catch (err) {
            console.log(err);
        }
    });
});

// router.post('/addProduct', (req, res) => {
//     let newProduct = new Product({
//         //name: req.body.name,
//         // img: req.body.img,
//         // description: req.body.description,
//         // Catag: req.body.Catag
//     });
    
    
//      console.log(req.body)

//     // Product.addProduct(newProduct, (err, product) => {
//     //     if (err) {
//     //         res.json({
//     //             success: false,
//     //             msg: 'Failed to add new product'
//     //         })
//     //     }
//     //         res.json({
//     //             success: true,
//     //             msg: 'Product is added'
//     //         })
//     //     }
//     // );
// });

router.post('/addProduct',(req,res)=>{
    let newProduct = new Product({
        name: req.body.name
    });
    console.log(newProduct)
    console.log(req.body.name);
    console.log(req.body);
});
module.exports = router;