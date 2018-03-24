var db = require('./db');
module.exports = {
	getAll: function(adminId, callbackFromController) {
		var sql = "SELECT * FROM product WHERE adminId = ?";
		db.execute(sql, [adminId] ,function(result){
			callbackFromController(result);
		});
	},
	get: function(id,  callbackFromController){
		var sql = "SELECT * FROM product WHERE productId=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(product, callbackFromController){
		var sql = "INSERT INTO product VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [product.itemName, product.category, product.supplier, product.manufacturer, product.buyingPrice, product.sellingPrice, product.quantity, product.adminId], function(result){
			callbackFromController(result);
		});
	},
	update: function(product, callbackFromController) {
		var sql = "UPDATE product SET itemName=?, category=?,supplier=?, manufacturer=?, buyingPrice=?, sellingPrice=?, quantity=? WHERE productId=?";
		db.execute(sql, [product.itemName, product.category, product.supplier, product.manufacturer, product.buyingPrice, product.sellingPrice, product.quantity, product.productId], function(result){
			callbackFromController(result);
		});
	},
	updateQuantity: function(productId, quantity, callbackFromController) {
		var sql = "UPDATE product SET quantity=? WHERE productId=?";
		db.execute(sql, [quantity, productId], function(result){
			callbackFromController(result);
		});
	},
	delete: function(id,  callbackFromController){
		var sql = "delete FROM product WHERE productId=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result);
		});
	}
};