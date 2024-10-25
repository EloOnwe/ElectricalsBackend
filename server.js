const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const connectToDB = require("./dbConnection/dbConnect");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const stripeRoute = require("./routes/stripe");
const webhookRoute = require("./routes/webhook");
const orderRoute = require("./routes/orderRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend origin
    credentials: true, // Include cookies or other credentials in the request if needed
  })
);

const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));

app.use(userRoute);
app.use(productRoute);
app.use(stripeRoute);
app.use(webhookRoute);
app.use(orderRoute);

// app.use(errorHandler);
const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDB();
  app.listen(port, () => {
    console.log(`The port is running on port: ${port}...`);
  });
};

startServer();
