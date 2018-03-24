var express = require('express');
var router = express.Router();
var customerModel = require.main.require('./models/customer-model');
var path = require('path');

router.get('/addcustomer', function(req, res){
	if(req.session.adminId = req.session.personId)
		res.render('customer/customeradd', { errors : [] });
	else
		res.redirect('/login');
});

router.post('/addcustomer', function(req, res){
	req.checkBody('firstName', 'First Name can not be empty').notEmpty();
	req.checkBody('lastName', 'Last Name can not be empty').notEmpty();
	req.checkBody('email', 'Email can not be empty').notEmpty();
	req.checkBody('email', 'Please enter a valid email address').isEmail();
	req.checkBody('phone', 'Phone can not be empty').notEmpty();
	req.checkBody('address', 'address can not be empty').notEmpty();
	req.checkBody('city', 'city can not be empty').notEmpty();
	req.checkBody('state', 'state can not be empty').notEmpty();
	req.checkBody('zip', 'zip can not be empty').notEmpty();
	req.checkBody('country', 'Coutry can not be empty').notEmpty();

	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			data = { errors : result.array()};
			res.render('customer/customeradd', data );
		}
		else{
				
			var user = {
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
				userType	: "customer",
				adminId		: req.session.adminId
			};

			customerModel.insert(user, function(result){
				var adminId = req.session.adminId;
				customerModel.getAll(adminId, function(result){
					res.render('customer/customerlist', { customerList : result });
				});
			});	
		}
	});

});

router.get('/customerlist',function(req, res){
	var adminId = req.session.adminId;
	customerModel.getAll(adminId, function(result){
		res.render('customer/customerlist', { customerList : result });
	});
});

router.get('/customeredit/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	customerModel.get(id, function(result){
		if(result.adminId == adminId){
			customerModel.get(id, function(result){
				res.render('customer/customeredit', { customer : result, errors : [] });
			});
		}
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});
});

router.post('/customeredit/:id', function(req, res){
	var user = {
		personId	: req.body.personId,
		firstName	: req.body.firstName,
		lastName	: req.body.lastName,
		email		: req.body.email,
		phone		: req.body.phone,
		address		: req.body.address,
		city		: req.body.city,
		state		: req.body.state,
		zip			: req.body.zip,
		country		: req.body.country,
		userType	: "customer",
		adminId 	: req.session.adminId
	};

	req.checkBody('firstName', 'First Name can not be empty').notEmpty();
	req.checkBody('lastName', 'Last Name can not be empty').notEmpty();
	req.checkBody('email', 'Email can not be empty').notEmpty();
	req.checkBody('email', 'Please enter a valid email address').isEmail();
	req.checkBody('phone', 'Phone can not be empty').notEmpty();
	req.checkBody('address', 'address can not be empty').notEmpty();
	req.checkBody('city', 'city can not be empty').notEmpty();
	req.checkBody('state', 'state can not be empty').notEmpty();
	req.checkBody('zip', 'zip can not be empty').notEmpty();
	req.checkBody('country', 'Coutry can not be empty').notEmpty();

	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			data = { errors : result.array(), customer : user };
			res.render('customer/customeredit', data );
		}
		else{

			var id = req.params.id;

			customerModel.update(user, function(result){
				res.redirect('/customerList');
			});
		}
	});

});

router.get('/customerdelete/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	customerModel.get(id, function(result){
		if(result.adminId == adminId){
			customerModel.get(id, function(result){
				res.render('customer/customerdelete', { customer : result });
			});
		}
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});
});

router.post('/customerdelete/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	customerModel.delete(id, adminId, function(result){
		res.redirect('/customerlist');
	});
});


router.get('/changecustomerimage/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	customerModel.get(id, function(result){
		if(result.adminId == adminId){
			customerModel.get(id, function(result){
				res.render('customer/changeimage', {personId : id, errors : []});
			});
		}
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});

});


router.post('/changecustomerimage/:id', function(req, res){
	var id = req.params.id;

	var imageUpload = typeof req.files['image'] !== "undefined" ? req.files.image.name : '';
	req.checkBody('image', 'Profile Picture - Please upload an image Jpeg, Png or Gif').isImage(imageUpload);

	req.getValidationResult().then(function(result){		
		if(!result.isEmpty()){
			var data = { errors : result.array()};
			customerModel.get(id, function(result){
				data.personId = result[0].personId;
				res.render('customer/changeimage', data );
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

			customerModel.updateImage(user, function(result){
				res.redirect('/customerlist');
			});
		}

	});

});

module.exports = router;