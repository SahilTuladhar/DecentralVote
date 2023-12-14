require('dotenv').config({path: "./vars/.env"})
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const port = 4000;
//const router = require( './routes/user-routes')
//const Sellerrouter = require('./routes/seller-routes')
const Userrouter = require('../Server/routes/ user-routes')
const Electionrouter = require('../Server/routes/election-routes')
//const Candidaterouter = require('./routes/candidate-routes')
const Voterrouter = require('../Server/routes/voter-routes');
const Candidaterouter = require('./routes/candidate-routes');
app.use(cookieParser())
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

app.use(cors(
    {
        credentials: true,
         origin:'http://localhost:3000',
        
        },
    
));





app.use('/user',Userrouter)
app.use ('/election',Electionrouter)
app.use('/voter',Voterrouter)
app.use('/candidate',Candidaterouter)

mongoose.connect(
    process.env.conn_str,
    { 
  
    useNewUrlParser: true, 
    useUnifiedTopology: true ,

    },(err) => {
    if (err) {
    console.log(err);
    } else {
    console.log("mongodb is connected");
}});





mongoose.connection.once('open',() => { 
    app.emit('ready'); 
});

app.on('ready', function() { 
    app.listen(port, () => {
    console.log(`Server started at port ${port}`); 
  });
});