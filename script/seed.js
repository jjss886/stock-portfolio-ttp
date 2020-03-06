const db = require("../server/db");
const { User, Stock } = require("../server/db/models");

const userSeed = [
  {
    name: "Peter Parker",
    email: "peter@a.com",
    password: "123"
  },
  {
    name: "Steven Strange",
    email: "steve@a.com",
    password: "123"
  }
];

const stockSeed = [
  {
    ticker: "AAPL",
    name: "Apple, Inc.",
    quantity: 10,
    value: 290,
    action: "buy",
    date: Date(),
    userId: 1
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    quantity: 5,
    value: 720,
    action: "buy",
    date: Date(),
    userId: 1
  },
  {
    ticker: "AAPL",
    name: "Apple, Inc.",
    quantity: 2,
    value: 285,
    action: "buy",
    date: Date(),
    userId: 1
  },
  {
    ticker: "BX",
    name: "The Blackstone Group, Inc.",
    quantity: 8,
    value: 55,
    action: "buy",
    date: Date(),
    userId: 2
  }
];

const seed = async () => {
  await db.sync({ force: true });
  console.log("db synced!");

  await User.bulkCreate(userSeed);
  await Stock.bulkCreate(stockSeed);
  console.log("seeded successfully");
};

const runSeed = async () => {
  console.log("seeding...");
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await db.close();
    console.log("db connection closed");
  }
};

if (module === require.main) runSeed();
