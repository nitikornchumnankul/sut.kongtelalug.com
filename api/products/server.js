let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');  
let dotenv = require('dotenv');
let product = require('./routes/product');

dotenv.config();

app.use(bodyParser.json())
app.use('/product',product);
app.use(cors());
app.use((req, res,next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connection.on('error',(err)=>{
    console.log('Database error' + err);
})

mongoose.connect(process.env.DATABASE,{useNewUrlParser: true});
mongoose.connection.on('connected',()=>{
    console.log('Connected to database ' + process.env.DATABASE);
});

app.listen(process.env.PORT,() =>{
    console.log('Server start on port ' + process.env.PORT)
});

module.exports = app