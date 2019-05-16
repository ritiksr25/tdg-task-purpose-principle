const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Import Models
const User = require('../models/User');
const Principle = require('../models/Principle');


module.exports.register = (req, res) =>{
	res.render('users/register');
}


module.exports.registerProcess = (req, res) => {
  const { name, email, password, password2 } = req.body;

 if (name !== "" || email !== "" || password !== "" || password2d !== "") {
    const nameRegEx = /[A-Za-z]/;
    const emailRegEx = /\S+@\S+/;
    if (nameRegEx.test(String(name))) {
      if (emailRegEx.test(String(email).toLowerCase())) {
        if (String(password).length >=5 && String(password).length <=20) {
         if(password === password2){
         	User.findOne({ email: email }).then(user => {
      			if (user) {
        			req.flash('error_msg', 'EmailID already registered!!');
         			res.redirect('/users/register');
      			} else {
        			const newUser = new User({
          				name,
          				email,
          				password
        			});

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                req.flash('success_msg','You are now registered and can log in');
                res.redirect('/users/login');
              }).catch(err => console.log(err));
          });
        });
      }
    }).catch(err => console.log(err));

         } else{
         	req.flash('error_msg', 'Confirm Password not matched!!');
         	res.redirect('/users/register');
         }
        } else {
          req.flash('error_msg', 'Password should be 5-20 characters long!!');
          res.redirect('/users/register');
        }
      } else {
          req.flash('error_msg', 'Email is not valid');
          res.redirect('/users/register');
      }
    } else {
      		req.flash('error_msg', 'Name is not valid');
         	res.redirect('/users/register');
    }
  } else {
    		req.flash('error_msg', 'Oops! Something went wrong!!');
         	res.redirect('/users/register');
  }

}


module.exports.login = (req, res) =>{
	res.render('users/login');
}

module.exports.loginProcess =  (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}



module.exports.logout = (req, res) =>{
    req.logout();
    req.flash('success_msg', 'Logged out Successfully!!');
    res.redirect('/users/login');
}


module.exports.dashboard = (req, res) =>{
	console.log(req.user);
	User.find({_id: req.user.id}).then(user =>{
		Principle.find({user: req.user.id}).then(principles =>{
			res.render('users/dashboard', {user, principles})
		}).catch(err => console.log(err));
	}).catch(err => console.log(err));
}

