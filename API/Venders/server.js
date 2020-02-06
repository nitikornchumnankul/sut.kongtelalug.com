const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/database');
const port = process.env.PORT || 8080;
const cors = require('cors');


const vender = require('./routes/vender');
app.use('/vender',vender);

//Connet To Database
mongoose.connect(config.database);
mongoose.connection.on('connected',() =>{
 console.log('Connected to database' + config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
  });

// CORS Middleware
app.use(cors());
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log('Server start on port' + port);
});