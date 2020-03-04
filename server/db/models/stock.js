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
  value: {
    type: Sequelize.FLOAT
  },
  action: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["buy", "sell"]]
    }
  },
  date: {
    type: Sequelize.DATE
  }
});

module.exports = Stock;
