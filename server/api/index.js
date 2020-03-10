const router = require("express").Router();
const { User, Stock } = require("../db/models");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    // RETRIEVE PORTFOLIO FOR SPECIFIC USER
    const userPortfolio = await Stock.findAll({
      where: {
        userId: req.params.userId
      }
    });

    if (!userPortfolio) res.json([]);
    else res.json(userPortfolio);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, ticker, name, quantity, value, date, action } = req.body,
      totalCost = quantity * value;

    // CREATE NEW STOCK TRANSACTION FOR USER
    await Stock.create({ userId, ticker, name, quantity, value, date, action });

    // NEED TO REDUCE USER'S CASH AMOUNT
    const userProfile = await User.findByPk(userId);

    if (action === "buy") {
      await userProfile.update({
        cash: userProfile.cash - totalCost
      });
    } else if (action === "sell") {
      await userProfile.update({
        cash: userProfile.cash + totalCost
      });
    }

    res.json(userProfile);
  } catch (error) {
    next(error);
  }
});
