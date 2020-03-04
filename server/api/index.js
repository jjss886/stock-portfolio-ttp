const router = require("express").Router();
const { Stock } = require("../db/models");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
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
