var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var path = require('path');



router.get('/signup', function(req, res){
	res.render('admin/signupview', { errors : [] });
});

router.post('/signup', function(req, res){

	req.checkBody('companyName', 'Company Name can not be empty').notEmpty();
	req.checkBody('firstName', 'First Name can not be empty').notEmpty();
	req.checkBody('lastName', 'Last Name can not be empty').notEmpty();
	req.checkBody('email', 'Email can not be empty').notEmpty();
	req.checkBody('email', 'Please enter a valid email address').isEmail();
	req.checkBody('password', 'password can not be empty').notEmpty();
	req.checkBody('password', 'passwords must be atleast 5 characters long').isLength({ min : 5 });
	req.checkBody('phone', 'Phone can not be empty').notEmpty();
	req.checkBody('address', 'address can not be empty').notEmpty();
	req.checkBody('city', 'city can not be empty').notEmpty();
	req.checkBody('state', 'state can not be empty').notEmpty();
	req.checkBody('zip', 'zip can not be empty').notEmpty();
	req.checkBody('country', 'Coutry can not be empty').notEmpty();

	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			data = { errors : result.array()};
			res.render('admin/signupview', data );
		}
		else{
			var user = {
				companyName : req.body.companyName,
				firstName	: req.body.firstName,
				lastName	: req.body.lastName,
				email		: req.body.email,
				password	: req.body.password,
				phone		: req.body.phone,
				address		: req.body.address,
				city		: req.body.city,
				state		: req.body.state,
				zip			: req.body.zip,
				country		: req.body.country,
				userType	: "admin",
			};

			userModel.insert(user, function(result){
				var id = result.insertId;
				res.redirect('/login/'+id);
			});	
		}
	});

});

router.get('/adminedit/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;
	if(id == adminId){
		userModel.get(id, function(result){
			res.render('admin/adminedit', { admin : result , errors : [] });
		});
	}
	else{
		req.session.destroy();
		res.redirect('/login');
	}
});

router.post('/adminedit/:id', function(req, res){
	var user = {
		personId	: req.body.personId,
		companyName : req.body.companyName,
		firstName	: req.body.firstName,
		lastName	: req.body.lastName,
		email		: req.body.email,
		password	: req.body.password,
		phone		: req.body.phone,
		address		: req.body.address,
		city		: req.body.city,
		state		: req.body.state,
		zip			: req.body.zip,
		country		: req.body.country,
		userType	: "admin",
		adminId 	: null
	};

	req.checkBody('companyName', 'Company Name can not be empty').notEmpty();
	req.checkBody('firstName', 'First Name can not be empty').notEmpty();
	req.checkBody('lastName', 'Last Name can not be empty').notEmpty();
	req.checkBody('email', 'Email can not be empty').notEmpty();
	req.checkBody('email', 'Please enter a valid email address').isEmail();
	req.checkBody('password', 'password can not be empty').notEmpty();
	req.checkBody('password', 'passwords must be atleast 5 characters long').isLength({ min : 5 });
	req.checkBody('phone', 'Phone can not be empty').notEmpty();
	req.checkBody('address', 'address can not be empty').notEmpty();
	req.checkBody('city', 'city can not be empty').notEmpty();
	req.checkBody('state', 'state can not be empty').notEmpty();
	req.checkBody('zip', 'zip can not be empty').notEmpty();
	req.checkBody('country', 'Coutry can not be empty').notEmpty();

	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			var id = req.params.id;
			data = { errors : result.array(), admin : user };
			res.render('admin/adminedit', data );
		}
		else{

			var id = req.params.id;

			userModel.update(user, function(result){
				res.render('home/homeview', { personId : req.session.personId });
			});
		}
	});

});

router.get('/changeimage/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;
	if(id == adminId){
		userModel.get(id, function(result){
			res.render('admin/changeimage', {personId : id, errors : []});
		});
	}
	else{
		req.session.destroy();
		res.redirect('/login');
	}
});


router.post('/changeimage/:id', function(req, res){
	var id = req.params.id;

	var imageUpload = typeof req.files['image'] !== "undefined" ? req.files.image.name : '';
	req.checkBody('image', 'Profile Picture - Please upload an image Jpeg, Png or Gif').isImage(imageUpload);

	req.getValidationResult().then(function(result){		
		if(!result.isEmpty()){
			var data = { errors : result.array()};
			userModel.get(id, function(result){
				data.personId = result[0].personId;
				res.render('admin/changeimage', data );
			});
		}
		else{
			filepath = path.join(__dirname, "/images/");
				let imageFile = req.files.image;
				imageFile.mv(filepath+req.params.id+'.jpg',function(err){
					if(err)
						return res.status(500).send(err);
				});


			var user = {
				personId	: req.params.id,
				userType  	: req.session.userType,
				image		: req.params.id+".jpg"
			};

			userModel.updateImage(user, function(result){
				res.redirect('/home');
			});
		}

	});

});



module.exports = router;
