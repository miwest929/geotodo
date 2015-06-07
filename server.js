// Require our dependencies
var express = require('express'),
  http = require('http'),
  pg = require('pg'),
  q = require('q'),
  config = require('./config'),
  bodyParser = require('body-parser');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;
var connectionString = process.env.DATABASE_URL || 'postgres://mwest@localhost/geotodo';

// Disable etag headers on responses
app.disable('etag');

app.use(bodyParser());

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

app.post('/todos.json', function(req, res, next) {
  var data = req.body;
  pg.connect(connectionString, function(err, client, done) {
    client.query("INSERT INTO todos(todo_text, place) values($1, $2)", [data.todo, data.location]);

    // Handle Errors
    if(err) {
      console.log(err);
    }
  });
  res.status(201).send("Success");
});

// Fire it up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});
