var db = require('./db');
module.exports = {
	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM person";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	get: function(id, callbackFromController){
		var sql = "SELECT * FROM person WHERE personId=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(user, callbackFromController){
		var sql = "INSERT INTO person VALUES (null, ?, ?, ?, ?, ?, ?, null, ?, ?, ?, ?, ?, ?, null)";
		db.execute(sql, [user.companyName, user.firstName, user.lastName, user.email, user.password, user.phone, user.address, user.city, user.state, user.zip, user.country, user.userType], function(result){
			callbackFromController(result);
		});
	},
	update: function(user, callbackFromController) {
		var sql = "UPDATE person SET companyName=?, firstName=?, lastName=?, email=?, password=?, phone =?, address=?, city=?, state=?, zip=?, country=?, userType=? WHERE personId=?";
		db.execute(sql, [user.companyName, user.firstName, user.lastName, user.email, user.password, user.phone, user.address, user.city, user.state, user.zip, user.country, user.userType, user.personId], function(result){
			callbackFromController(result);
		});
	},
	updateImage: function(user, callbackFromController) {
		var sql = "UPDATE person SET image=? WHERE personId=?";
		db.execute(sql, [user.image, user.personId], function(result){
			callbackFromController(result);
		});
	},
	verifyUser: function(user, callbackFromController){
		var sql = "SELECT * FROM person WHERE personId=? AND password=?"; 
		db.execute(sql, [user.id, user.password], function (result){
			callbackFromController(result);
		});
		 
		//connection.end();
	}
};