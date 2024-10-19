const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");

const getOrders = asyncHandler(async (req, res) => {
  const currentUser = req.user._id;
  try {
    const orders = await Order.find({ userId: currentUser }).sort("-createdAt");
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = getOrders;
