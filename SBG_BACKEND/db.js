var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sbg_daiict'
});

connection.connect(function(err) {
    if (err){
        console.log(err);
        throw err;
    }
});

module.exports = connection;