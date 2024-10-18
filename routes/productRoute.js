const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const createProduct = require("../controllers/productControllers/createProduct");
const getAllProducts = require("../controllers/productControllers/getAllProducts");
const getSingleProduct = require("../controllers/productControllers/getSingleProduct");
const updateProduct = require("../controllers/productControllers/updateProduct");
const deleteProduct = require("../controllers/productControllers/deleteProduct");

router.post("/api/createproduct", protect, admin, createProduct);
router.get("/api/products", getAllProducts);
router.get("/api/product/:id", getSingleProduct);
router.put("/api/updateproduct/:id", protect, admin, updateProduct);
router.delete("/api/delete/:id", protect, admin, deleteProduct);

module.exports = router;
