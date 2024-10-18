const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems, userId } = req.body;

  const customer = await stripe.customers.create({
    metadata: {
      userId,
    },
  });

  const line_items = cartItems.map((item) => {
    const validImageUrls = item.image.filter((url) => url.length <= 2048);
    const images =
      validImageUrls.length > 0
        ? validImageUrls
        : ["https://www.mon-site-bug.fr/uploads/products/default-product.png"];
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
          images,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.productqty || 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    metadata: {
      userId: req.body.userId,
    },
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["US", "NG"],
    },
    success_url: `${process.env.CLIENT_URL}checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}cart`,
  });

  res.send(session.url);
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.

module.exports = router;
