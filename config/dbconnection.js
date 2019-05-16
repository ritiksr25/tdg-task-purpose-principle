const mongoose = require('mongoose');
require('dotenv').config();

//Database URL 
const dburl = process.env.MONGO_URI;
//Map global Promise
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose.connect(dburl, {useNewUrlParser : true})
    .then(()=> {
        console.log('MongoDB Connected...');
    })
    .catch(err => {
        console.log(`Error in Database connectivity: ${err}`);
    });
