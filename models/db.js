var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'pos_db'
});
connection.connect();

module.exports = {
	execute: function(sql, param, callbackFromModel)
	{
		if(param == null)
		{
			connection.query(sql, function(err, result){
				if(err)
				{
					console.log(err);
				}
				else
				{
					callbackFromModel(result);
				}
			});
		}
		else
		{
			connection.query(sql, param, function(err, result){
				if(err)
				{
					console.log(err);
				}
				else
				{
					callbackFromModel(result);
				}
			});
		}
	}
};