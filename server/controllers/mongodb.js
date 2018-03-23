const User = require('../mongodb/userschema');

mongodbFunction = {
  signUp:(req,res,next)=>{
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
    }
    if (req.body.email && req.body.gitusername && req.body.fullname && req.body.password) {
  
      var userData = {
        email: req.body.email,
        gitusername: req.body.gitusername,
        fullname: req.body.fullname,
        password: req.body.password,
      }
  
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.user = user;
          return res.redirect('/profile');
        }
      });
  
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  },
  signIn :(req,res,next)=>{
    if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.user = user;
          // console.log(req.session.user);
          return res.redirect('/profile');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  },

  getProfile:(req,res,next)=>{
    // console.log(req.session.user);
    User.findById(req.session.user._id)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // res.json(JSON.parse(body.body));
          res.json({username: user.gitusername});
        }
      }
    });
  },

  logout:(req,res,next)=>{
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }
        //  else {
        //   return res.redirect('/');
        // }
      });
    }
  }
}

module.exports = mongodbFunction;