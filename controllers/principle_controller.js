
require("dotenv").config();

//import schemas
const User = require("../models/User");
const Principle = require("../models/Principle");


module.exports.add = (req, res) => {
  res.render('principles/add');
};

module.exports.addProcess = (req, res) => {
  const { title, category } = req.body;
  if (!category || !title) {
    req.flash('error_msg', 'Field is mandatory!!');
    res.redirect('/principles/add');
  }
  else{
    Principle.create({ title, category, user: req.user.id }).then(principle =>{
      req.flash('success_msg', 'Added Successfully!!');
      res.redirect('/users/dashboard');
    }).catch(err => console.log(err));
  }
}
    
module.exports.update = (req, res) => {
  Principle.findOne({_id: req.params.id}).then(principle => {
    if(principle.user != req.user.id){
      req.flash('error_msg', 'Access Denied!');
      res.redirect('/users/dashboard');
    } else {
      res.render('principles/update', { principle });
    }
  }).catch(err => console.log(err));
}


module.exports.updateProcess = (req, res) => {
  Principle.findOne({ _id: req.params.id }).then(principle => {
    principle.title = req.body.title;
    principle.save().then(principle => {
      req.flash('success_msg', 'Updated Successfully!!');
      res.redirect('/users/dashboard');
    });
  });
};


module.exports.delete = (req, res) => {
  Principle.findOne({ _id: req.params.id }).then(principle => {
    if(principle.user !== req.user.id){
      req.flash('error_msg', 'Access Denied!');
      res.redirect('/users/dashboard');
    }
    else{
      Principle.deleteOne({ _id: req.params.id }).then(principle => {
        req.flash('success_msg', 'Deleted Successfully!!');
        res.redirect('/users/dashboard');
      }).catch(err => console.log(err));
    }
  });
}
 