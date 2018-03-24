var express = require('express');
var router = express.Router();
var productModel = require.main.require('./models/product-model');

router.get('/additem', function(req, res){
	var userType = req.session.userType;
	if(userType == "admin" || userType == "employee")
		res.render('items/itemadd' , {errors : [] });
	else
	{
		req.session.destroy();
		res.redirect('/login');
	}
});

router.post('/additem', function(req, res){
		req.checkBody('itemName','Item Name is required').notEmpty();
		req.checkBody('category','Categoryis required').notEmpty();
		req.checkBody('supplier','Supplier is required').notEmpty();
		req.checkBody('manufacturer','Manufacturer is required').notEmpty();
		req.checkBody('buyingPrice','Buying Price is required').notEmpty();
		req.checkBody('sellingPrice','Selling Price is required').notEmpty();
		req.checkBody('quantity','Quantity is required').notEmpty();
		req.getValidationResult().then(function(result){
			
		if(!result.isEmpty()){
			var data = { errors : result.array()};
			res.render('items/itemadd', data);
		}
		else{
			var product = {
				itemName 		: req.body.itemName,
				category 		: req.body.category,
				supplier 		: req.body.supplier,
				manufacturer	: req.body.manufacturer,
				buyingPrice		: req.body.buyingPrice,
				sellingPrice	: req.body.sellingPrice,
				quantity		: req.body.quantity,
				adminId			: req.session.adminId
				};

			productModel.insert(product,function(result){
			res.redirect('/itemlist');
			});
		}

	});

});

router.get('/itemlist', function(req, res){
	adminId = req.session.adminId;
	if(!adminId){
		res.redirect('/login');
	}
	else
		productModel.getAll(adminId, function(result){
			res.render('items/itemlist', { itemList : result });	
		});
});

router.get('/edititem/:id',function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;
	productModel.get(id,  function(result){
		if(!adminId){
			res.redirect('/login');
		}	
		else if(adminId == result.adminId)
			res.render('items/itemedit', {item : result, errors : []});
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});
});


router.post('/edititem/:id', function(req, res){
		req.checkBody('itemName','Item Name is required').notEmpty();
		req.checkBody('category','Categoryis required').notEmpty();
		req.checkBody('supplier','Supplier is required').notEmpty();
		req.checkBody('manufacturer','Manufacturer is required').notEmpty();
		req.checkBody('buyingPrice','Buying Price is required').notEmpty();
		req.checkBody('sellingPrice','Selling Price is required').notEmpty();
		req.checkBody('quantity','Quantity is required').notEmpty();
		req.getValidationResult().then(function(result){
			
		if(!result.isEmpty()){
			var data = { errors : result.array()};
			var id = req.params.id;
			productModel.get(id, function(result){
				data.item = result;
				res.render('items/itemedit', data );
			});
		}
		else{
			var product = {
				productId		: req.body.productId,
				itemName 		: req.body.itemName,
				category 		: req.body.category,
				supplier 		: req.body.supplier,
				manufacturer	: req.body.manufacturer,
				buyingPrice		: req.body.buyingPrice,
				sellingPrice	: req.body.sellingPrice,
				quantity		: req.body.quantity,
				adminId			: req.session.adminId
				};

			productModel.update(product,function(result){
				res.redirect('/itemlist');
			});
		}

	});

});


router.get('/deleteitem/:id', function(req, res){
	var id = req.params.id;
	var adminId = req.session.adminId;
	productModel.get(id, function(result){
		if(!adminId)
			res.redirect('/login');
		else if(result.adminId == adminId)
			res.render('items/itemdelete', {item : result });
		else{
			req.session.destroy();
			res.redirect('/login');
		}
	});
});

router.post('/deleteitem/:id', function(req, res){
	var id = req.params.id;
	productModel.delete(id, function(result){
		res.redirect('/itemlist');
	});
});



module.exports = router;