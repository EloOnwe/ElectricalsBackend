const asyncHandler = require("express-async-handler");
const Product = require("../../models/productModel");

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name,
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
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
    throw new Error("error", error);
  }
});

module.exports = updateProduct;
