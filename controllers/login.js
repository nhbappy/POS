var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model')

router.get('/login', function(req, res){
	res.render('login/loginview', {message : ""});
});

router.post('/login', function (req, res){
	var user = {
		id: req.body.id,
		password: req.body.password
	};
	userModel.verifyUser(user, function(result){
		if(result.length == 1)
		{
			if(result[0].userType == "admin" ){
				req.session.personId = result[0].personId;
				req.session.userType = result[0].userType;
				req.session.adminId = result[0].personId;
				//console.log(req.session.adminId);
				res.render('home/homeview', { personId : req.session.personId });
			}
			else if( result[0].userType == "employee"){
				req.session.personId = result[0].personId;
				req.session.userType = result[0].userType;
				req.session.adminId = result[0].adminId;
				res.render('home/home', { personId : req.session.personId });
			}
			else{
				res.render('login/loginview', {message: 'Only admin or employees can login'});
			}
		}
		else
		{
			res.render('login/loginview', {message: 'Invalid id or password'});
		}
	});

});

router.get('/login/:id', function(req, res){
	var message = "Signup Success ! Your user id is : "+ req.params.id;
	res.render('login/loginview', {message});
});

router.get('/logout', function(req, res){
	req.session.destroy();
	res.redirect('/login');
});

module.exports = router;
