var db = require('./db');
module.exports = {
	getAll: function(invoiceNumber, callbackFromController) {
		var sql = "SELECT *FROM sales JOIN sold ON (sold.invoiceNumber = sales.invoiceNumber) JOIN product ON (product.productId = sold.productId) JOIN person ON (person.personId = sold.customerId) where sales.invoiceNumber = ?";
		db.execute(sql, [invoiceNumber] ,function(result){
			callbackFromController(result);
		});
	},
	getInvoices: function(id, callbackFromController){
		var sql = "SELECT * FROM sales WHERE adminId=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result);
		});
	},
	insertSales: function(date, time, adminId, callbackFromController){
		var sql = "INSERT INTO sales VALUES (null, ?, ?, ?)";
		db.execute(sql, [date, time, adminId], function(result){
			callbackFromController(result);
		});
	},
	insertSold: function(productId, customerId, quantity, invoiceNumber, callbackFromController){
		var sql = "INSERT INTO sold VALUES (?, ?, ?, ?)";
		db.execute(sql, [productId, customerId, quantity, invoiceNumber], function(result){
			callbackFromController(result);
		});
	}
};