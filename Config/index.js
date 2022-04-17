const config = {
  developement: { port: process.env.port || 8080 },
  DB_connection: "mongodb://localhost:27017/crypto-worldDB",
  saltrounds: 9,
  secret: "Qq6feotXsomp&zPa222",
  cookie: "x_auth_token",
};
module.exports = config;
