var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var path = require('path');

//router.get('/home', function(req, res){
	//res.render('login/loginview');
//});

router.get('/home', function(req, res){

	if(req.session.personId == req.session.adminId){
		res.render('home/homeview' , { personId : req.session.personId });
	}
	else if(req.session.personId == req.session.adminId){
		res.render('home/home', { personId : req.session.personId });
	}
	else
		res.redirect('/login');
});

module.exports = router;
