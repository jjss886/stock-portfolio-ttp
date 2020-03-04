const db = require("../db");
const User = require("./user");
const Stock = require("./stock");

User.hasMany(Stock);

module.exports = {
  db,
  User,
  Stock
};
