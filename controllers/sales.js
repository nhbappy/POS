var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var salesModel = require.main.require('./models/sales-model');
var productModel = require.main.require('./models/product-model');
var path = require('path');

router.get('/sales', function(req, res){
	var adminId = req.session.adminId;
	if(!adminId){
		res.redirect('/login');
	}	
	else{
		productModel.getAll(adminId, function(result){
			res.render('sales/sales', { itemList : result, errors : [] });	
		});
	}
});

router.post('/sales', function(req, res){
	req.checkBody('productId', 'You must select atleast one item').notEmpty();
	req.checkBody('customerId', 'You must enter customerId').notEmpty();

	req.getValidationResult().then(function(result){
		var adminId = req.session.adminId;
		var customerId = req.body.customerId;
		var errors = result.array();

		if(!result.isEmpty()){
			productModel.getAll(adminId, function(result){
				res.render('sales/sales', { itemList : result, errors });	
			});
		}
		else{
			var selected = req.body.productId;
			var customerId = req.body.customerId;

			userModel.get(customerId, function(result){
				if(adminId != result.adminId ){
					console.log("Doesn't match");
					res.redirect('/login');
				}
				else{
					console.log("match");
				}
			});

			if(selected){
				var date = new Date();
				var month = parseInt(date.getMonth()) + 1;
				var currentDate = date.getDate()+"-"+month+"-"+date.getFullYear();
				var currentTime = date.getHours() +" : "+date.getMinutes();
				var quantity = 1;

				if(selected instanceof Array){
					salesModel.insertSales(currentDate, currentTime, adminId, function(result){
						var invoiceNumber = result.insertId;
						for(var i = 0; i<selected.length ; i++){
							var productId = selected[i];
							salesModel.insertSold(productId, customerId, quantity, invoiceNumber, function(result){
								
							});
						}
					});
				/* for(var i = 0; i<selected.length ; i++){
					var productId = selected[i];
					productModel.get(productId, function(result){
						var newQuantity = result.quantity;
						if(newQuantity > 1){
							console.log(newQuantity);
							newQuantity = newQuantity-1;
							productModel.updateQuantity(productId, newQuantity, function(result){
								console.log("update " + newQuantity);
							});
						}
						else{
							productModel.delete(productId, function(result){
											
							});
						}
					});
				} */
						res.redirect('/itemList');
			}
		else{
			salesModel.insertSales(currentDate, currentTime, adminId, function(result){
				var invoiceNumber = result.insertId;
				var productId = selected;
				salesModel.insertSold(productId, customerId, quantity, invoiceNumber, function(result){
					productModel.get(productId, function(result){
						var newQuantity = result.quantity;
						if(newQuantity > 1){
							newQuantity = newQuantity-1;
							productModel.updateQuantity(productId, newQuantity, function(result){

							});
						}
						else{
							productModel.delete(productId, function(result){

							});
						}
					}); 
				});

			});	
			res.redirect('/itemList');
		}
	}
	else
		productModel.getAll(adminId, function(result){
			res.render('sales/sales', { itemList : result, errors : []  });	
		});
	}

	});
});

//router.get('/report/:invoiceNumber', function(req, res){
//	salesModel.getAll(invoiceNumber, function(result){
//		res.send(result);
//	});
//});

router.get('/invoicelist', function(req, res){
	adminId = req.session.adminId;
	if(!adminId)
	{
		res.redirect('/login');
	}
	else
		salesModel.getInvoices(adminId, function(result){
			res.render('sales/invoicelist', { invoiceList : result, message : " "});
		});
});

router.post('/invoicelist', function(req, res){
	var invoiceNumber = req.body.invoiceNumber;
	if(!invoiceNumber)
		res.redirect('/invoicelist');
	else{

		adminId = req.session.adminId;
		if(!adminId)
		{
			res.redirect('/login');
		}
		else
			salesModel.getAll(invoiceNumber, function(result){
				res.render('sales/invoice', { invoice : result });
			});
	}
});



module.exports = router;
