// Require our dependencies
var express = require('express'),
  http = require('http'),
  pg = require('pg'),
  q = require('q'),
  config = require('./config'),
  bodyParser = require('body-parser'),
  paginate = require('express-paginate');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 3000;
var connectionString = process.env.DATABASE_URL || 'postgres://mwest@localhost/geotodo';

// Disable etag headers on responses
app.disable('etag');

app.use(bodyParser());

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

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

app.get('/cities', function(req, res, next) {
  var prefix = req.query.city;

  console.log("Cities route with city='" + prefix + "' has been invoked.");

  pg.connect(connectionString, function(err, client, done) {
    client.query("SELECT DISTINCT * FROM locations WHERE name LIKE '" + prefix.toLowerCase() + "%';",
    function(err, result) {
      if (err) { console.log(err); }
      else {
        var filteredMatches = result.rows.slice(0, 10);
        filteredMatches = filteredMatches.map(function(record) {
          return {name: record.name, country: record.country, id: record.id};
        });

        console.log(filteredMatches);

        res.setHeader('content-type', 'application/json');
        res.status(200).send({data: filteredMatches});
      }

      // This call releasing the client back to the cinnection pool
      done();
    });
  });
});

// Fire it up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});
