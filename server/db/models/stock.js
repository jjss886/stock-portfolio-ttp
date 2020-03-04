const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  ticker: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  cost: {
    type: Sequelize.FLOAT
  },
  date: {
    type: Sequelize.DATE
  }
});

module.exports = Stock;
