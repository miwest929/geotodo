var pg = require('pg'),
     q = require('q'),
     config = require('./config'),
     csv = require('csv'),
     fs = require('fs');

var connectionString = process.env.DATABASE_URL || 'postgres://mwest@localhost/geotodo';
var client = new pg.Client(connectionString);
var parser = csv.parse({delimiter: ','}, function(err, data){
  client.connect(function(err) {
  //pg.connect(connectionString, function(err, client, done) {
    // Truncate 'locations' table
    client.query("TRUNCATE locations");

    data.forEach(function(city) {
      client.query("INSERT INTO locations(name, lat, lon) values($1, $2, $3)",
        [city[3].toLowerCase(), city[5], city[6]]);

      // Handle Errors
      if(err) {
        console.log(err);
      }
      else {
        console.log("Stored location information for the city '" + city[3] + "'");
      }
    });

    // close the connection
    //
  });
});

fs.createReadStream(__dirname + '/data/geocities/GeoLiteCity-Location.csv')
  .pipe(parser);

client.end();
