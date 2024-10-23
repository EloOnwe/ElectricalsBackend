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

const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL // Production backend URL
    : "http://localhost:5173"; // Local development URL

const allowedOrigins = [
  "http://localhost:5173",
  "https://mickielect.onrender.com",
];

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Enable cookies and other credentials
  })
);

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
