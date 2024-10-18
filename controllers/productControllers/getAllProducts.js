const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel");

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort("-createdAt");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = getAllProducts;
