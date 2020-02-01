const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const cors = require('cors');
const port = process.env.PORT || 8080;

const product = require('./routes/product');

app.use('/product',product);
app.use(cors());
app.use(bodyParser.json());


mongoose.connection.on('error',(err)=>{
    console.log('Database error' + err);
})

mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log('Connected to database' + config.database);
});

app.listen(port,() =>{
    console.log('Server start on port')
});