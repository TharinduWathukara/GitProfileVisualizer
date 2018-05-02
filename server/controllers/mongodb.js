const User = require('../mongodb/userschema');
const request = require('request');
const {githubConfig} = require ('../config');

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
          req.session.cookie.expires = new Date(Date.now() + 3600000);
          req.session.cookie.maxAge = 3600000;
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
          req.session.cookie.expires = new Date(Date.now() + 3600000);
          req.session.cookie.maxAge = 3600000;
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

    if(req.session.user.authBy == 'viaGithub'){
      let usr = req.session.user;
      res.json({username:usr.gitusername});
    }
    
    else {
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
    }
  },

  signOut:(req,res,next)=>{
    if (req.session.user) {
      // delete session object
      // req.session.destroy(function (err) {
      //   if (err) {
      //     return next(err);
      //   }
      //    else {
      //     // return res.redirect('/');
      //     res.json({"message":"Successfully SignOut"});
      //   }
      // });
      req.session.user=null;
      res.json({"message":"Successfully SignOut"});
    }
  },


  signInWithGithub:(req,res)=>{

    const { query } = req;
    const { code } = query;

    if(!code){
      res.json({
        'success':false,
        'message':"Error: no code"
      });
    }

    request.post('https://github.com/login/oauth/access_token?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret + '&code=' + code, {headers: {'User-Agent':'GIT Profile Visualizer', 'Accept':'application/json'}},
      (err,body,response) => {
        if(err) console.log(err);
        else{

          const accessToken = (JSON.parse(body.body)).access_token;
          
          request.get('https://api.github.com/user' ,{headers: {'User-Agent':'GIT Profile Visualizer', 'Authorization': 'token ' + accessToken }},
          (err1,body1,response1) => {
            let data = (JSON.parse(body1.body));
            let user = {
              'email': data.email,
              'gitusername': data.login,
              'fullname': data.name,
              'authBy': 'viaGithub'
            }

            req.session.user = user;
            req.session.cookie.expires = new Date(Date.now() + 3600000);
            req.session.cookie.maxAge = 3600000;

            res.redirect('http://localhost:4200/profile');
          });
        }
    });
  }
}

module.exports = mongodbFunction;