const router = require("express").Router();

const getOrders = require("../controllers/orderControllers/getOrders");
const protect = require("../middlewares/authMiddleware");

router.get("/api/order", protect, getOrders);

module.exports = router;
