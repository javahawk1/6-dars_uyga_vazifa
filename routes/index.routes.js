const router = require("express").Router();

const users = require("./user.routes");
const districts = require("./district.routes");
const orders = require("./order.routes");
const shops = require("./shop.routes");
const shopTools = require("./shop_tool.routes");
const tools = require("./tool.routes");

router.use("/users", users);
router.use("/districts", districts);
router.use("/orders", orders);
router.use("/shops", shops);
router.use("/shop-tools", shopTools);
router.use("/tools", tools);

module.exports = router;