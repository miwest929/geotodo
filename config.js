module.exports = {
  databaseEndpoint: process.env.DATABASE_URL || "postgres://mwest@localhost/geotodo",
  express: {
    port: 3000
  }
}
