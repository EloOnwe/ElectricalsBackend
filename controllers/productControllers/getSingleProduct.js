const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel");

const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = getSingleProduct;
