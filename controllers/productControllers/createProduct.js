const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      brand,
      color,
      quantity,
      sold,
      regularPrice,
      price,
      description,
      image,
      ratings,
    } = req.body;

    if (!name || !price || !category || !brand || !quantity || !description) {
      return res.status(400).send("Please add the compulsory fields");
    }

    // CREATE A Product

    const product = await Product.create({
      name,
      sku,
      category,
      brand,
      color,
      quantity,
      sold,
      regularPrice,
      price,
      description,
      image,
      ratings,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

module.exports = createProduct;
