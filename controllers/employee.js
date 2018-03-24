var express = require('express');
var router = express.Router();
var employeeModel = require.main.require('./models/employee-model');
var userModel = require.main.require('./models/user-model');
var path = require('path');

router.get('/addemployee', function(req, res){
	if(req.session.userType != "admin")
			res.redirect('/login');
	else
		res.render('employee/employeeadd', { errors : [] });
});

router.post('/addemployee', function(req, res){
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
			res.render('employee/employeeadd', data );
		}
		else{
			var id = req.session.adminId;
			userModel.get(id , function(result){
				//console.log(result);
				var user = {
				companyName : result.companyName,
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
				userType	: "employee",
				adminId		: req.session.adminId
				};

				employeeModel.insert(user, function(result){
					res.redirect('/employeelist');
				});	
			});
				
		}
	});

});

router.get('/employeelist',function(req, res){
	var adminId = req.session.adminId;
	if(!adminId)
		res.redirect('/login');
	else
		employeeModel.getAll(adminId, function(result){
			res.render('employee/employeelist', { employeeList : result });
		});
});

router.get('/employeeedit/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	employeeModel.get(id, function(result){
		if(result.adminId == adminId){
			employeeModel.get(id, function(result){
				res.render('employee/employeeedit', { employee : result, errors : [] });
			});
		}
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});
});

router.post('/employeeedit/:id', function(req, res){
	var user = {
		personId	: req.body.personId,
		companyName : req.body.companyName,
		firstName	: req.body.firstName,
		lastName	: req.body.lastName,
		email		: req.body.email,
		image 		: req.body.image,
		password	: req.body.password,
		phone		: req.body.phone,
		address		: req.body.address,
		city		: req.body.city,
		state		: req.body.state,
		zip			: req.body.zip,
		country		: req.body.country,
		userType	: "employee",
		adminId 	: req.session.adminId
	};

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
			data = { errors : result.array(), employee : user };
			res.render('employee/employeeedit', data );
		}
		else{

			var id = req.params.id;

			employeeModel.update(user, function(result){
				res.redirect("/employeelist");
			});
		}
	});

});

router.get('/employeedelete/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	employeeModel.get(id, function(result){
		if(result.adminId == adminId){
			employeeModel.get(id, function(result){
				res.render('employee/employeedelete', { employee : result });
			});
		}
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});
});


router.post('/employeedelete/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	employeeModel.delete(id, adminId, function(result){
		res.redirect('/employeelist');
	});
});


router.get('/changeemployeeimage/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;

	employeeModel.get(id, function(result){
		if(result.adminId == adminId){
			employeeModel.get(id, function(result){
				res.render('employee/changeimage', {personId : id, errors : []});
			});
		}
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});

});


router.post('/changeemployeeimage/:id', function(req, res){
	var id = req.params.id;

	var imageUpload = typeof req.files['image'] !== "undefined" ? req.files.image.name : '';
	req.checkBody('image', 'Profile Picture - Please upload an image Jpeg, Png or Gif').isImage(imageUpload);

	req.getValidationResult().then(function(result){		
		if(!result.isEmpty()){
			var data = { errors : result.array()};
			employeeModel.get(id, function(result){
				data.personId = result[0].personId;
				res.render('employee/changeimage', data );
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

			employeeModel.updateImage(user, function(result){
				res.redirect('/employeelist');
			});
		}

	});

});

module.exports = router;