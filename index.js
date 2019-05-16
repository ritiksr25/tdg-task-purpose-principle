const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

require('dotenv').config();
require('./config/dbconnection');
require('./config/passport')(passport);


app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/principles', require('./routes/principles'));

const PORT = process.env.PORT;
app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error in running Server: ${err}`);
    } else{
        console.log(`Server is up and running on Port ${PORT}`);
    }});
        