const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the product name"],
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Please add the product category"],
      trim: true,
    },

    brand: {
      type: String,
      required: [true, "Please add the product bra d"],
      trim: true,
    },

    color: {
      type: String,
      required: [true, "Please add the product color"],
      default: "As seen",
      trim: true,
    },

    quantity: {
      type: Number,
      // required: [true, "Please add the product quantity"],
      trim: true,
    },

    sold: {
      type: Number,
      default: 0,
      trim: true,
    },

    regularPrice: {
      type: Number,
      // required: [true, "Please add the product name"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Please add the product price"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please add the product description"],
      trim: true,
    },

    image: {
      type: [String],
    },

    ratings: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
