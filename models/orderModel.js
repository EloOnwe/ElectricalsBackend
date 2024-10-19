const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productDetails: {
      type: Array,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      default: "",
    },

    customerId: {
      type: String,
      default: "",
    },

    paymentId: {
      type: String,
      default: null,
    },
    payment_method_types: {
      type: Array,
      default: [],
    },
    payment_status: {
      type: String,
      default: "",
    },

    address: {
      type: Object,
      default: {},
    },

    amount_total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
