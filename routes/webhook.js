const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");

let endpointSecret;
endpointSecret =
  "whsec_c87bb6f8bd2ded9dd5fa154c062b9bf340875a764eef32bf8d0f18d85c3d5bbe";

router.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let orderDetails;
    let event;

    const payloadString = JSON.stringify(request.body);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = request.body.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getProductItems(lineItems);

      orderDetails = {
        productDetails: productDetails,
        email: session.customer_details.email,
        userId: session.metadata.userId,
        customerId: session.customer,
        paymentId: session.payment_intent,
        payment_method_types: session.payment_method_types,
        payment_status: session.payment_status,
        address: session.shipping_details.address,
        amount_total: session.amount_total / 100,
      };

      const newOrder = new Order(orderDetails);

      const orderSaved = await newOrder.save();

      console.log("order saved in nongodb", orderSaved);
    }

    response.status(200).send();
  }
);

const getProductItems = async (lineItems) => {
  let productItems = [];
  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);

      const productData = {
        productId: product.id,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };

      productItems.push(productData);
    }
  }
  return productItems;
};

module.exports = router;
