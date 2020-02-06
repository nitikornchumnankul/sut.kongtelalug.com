const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  
const dotenv = require('dotenv');
const product = require('./routes/product');
const routers = require('./routes/product')
dotenv.config();
app.use('/product',product);
app.use(cors());

app.use(bodyParser.json());
//parse application/json

app.use(bodyParser.urlencoded({
    extended: true
}))


mongoose.connection.on('error',(err)=>{
    console.log('Database error' + err);
})

mongoose.connect(process.env.DATABASE);
mongoose.connection.on('connected',()=>{
    console.log('Connected to database ' + process.env.DATABASE);
});

app.listen(process.env.PORT,() =>{
    console.log('Server start on port ' + process.env.PORT)
});