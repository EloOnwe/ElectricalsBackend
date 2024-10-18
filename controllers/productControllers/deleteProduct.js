const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel");

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404).send("Product not found");
    throw new Error("Product not found");
  }
  res.status(200).send("deleted successfully");
});

module.exports = deleteProduct;
