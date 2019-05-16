const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


require('dotenv').config();
const User = require('../models/User');

module.exports = (passport)=>{
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email:{ $regex: email, $options: 'i'  }}).then(user => {
      if(!user){
        return done(null, false, {message: "User not found!!"});
      } 
     bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
           return done(null, user);
        } else {
          return done(null, false, {message: "Incorrect Credentials"});
        }
      })
    })
  }));

  passport.serializeUser((user, done)=> {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}