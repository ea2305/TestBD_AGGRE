//Mysql Configuracion
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'equipo23'
});

//Modulos de ruteo
var express = require('express');
var app = express();

//Definicion de carpeta statica
app.use('/react', express.static(__dirname + '/dist'));

//Inicio de conexion
connection.connect();

//Redireccionamiento
//Main page
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/main.html");
});

//Llamado de sentencia SQL
app.post('/test', function( req, res ){

	connection.query('CALL getInformation()', function(err, rows, fields) {
	  if (!err){
	  	console.log('The solution is: ');
		res.send( rows[0] );
	  }
	  else
	    console.log('Error while performing Query.');
	});
})

app.listen(3000, function () {
  console.log('All are runing 3000!');
});
