var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var http = require('http').Server(app);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

/* Creating MySQL connection.*/
var con = mysql.createPool({
  host : 'localhost',
  user : 'denis',
  password : 'woot',
  database : 'test1'
});



app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.post('/get_data', function (req, res) {
  var key=req.body.Firstname;
  con.getConnection(function(err,connection){
    if(err){
      connection.release();
    }else{
      var query="select * from users where Firstname like '%"+key+"%'";
      con.query(String(query),function(err,rows){
        connection.release();
        if(!err) {
          if(rows.length > 0){
              res.write(JSON.stringify(rows));
              console.log(JSON.stringify(rows));
              res.end();
          }else{
              rows=[];
              res.write(JSON.stringify(rows));
              res.end();
          } 
        } else {
          console.log("Query failed");  
        }        
      });
    }
  });  
});
http.listen(3000);
console.log('app listening on *localhost:3000');
