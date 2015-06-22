var pg = require('pg'),
     q = require('q'),
     config = require('./config'),
     csv = require('csv'),
     fs = require('fs');

var countrycodes = {};
fs.readFile(__dirname + '/data/countrycodes.txt', function (err, data) {
  if (err) { throw err; }

  data.toString().split("\n").forEach(function(line) {
    parts = line.split(' ');
    code = parts.shift();
    country = parts.join(' ').trim();
    countrycodes[code] = country;
  });
});

var getFullCountry = function(countryCode) {
  var ccode = countrycodes[city[1].toLowerCase()];

  if (ccode === undefined)
    ccode = countryCode;

  return ccode;
}

var connectionString = process.env.DATABASE_URL || 'postgres://mwest@localhost/geotodo';
var client = new pg.Client(connectionString);
var parser = csv.parse({delimiter: ','}, function(err, data){
  client.connect(function(err) {
    // Truncate 'locations' table
    client.query("TRUNCATE locations");

    data.forEach(function(city) {
      // TODO: For performance reasons, look into INSERTing multiple locations in one statement.
      client.query("INSERT INTO locations(name, country, lat, lon) values($1, $2, $3, $4)",
        [city[3].toLowerCase(), getFullCountry(city[1]), city[5], city[6]]);

      // Handle Errors
      if(err) {
        console.log(err);
      }
      else {
        console.log("Stored location information for the city '" + city[3] + "'");
      }
    });
  });
});

fs.createReadStream(__dirname + '/data/geocities/GeoLiteCity-Location.csv')
  .pipe(parser);

client.end();
