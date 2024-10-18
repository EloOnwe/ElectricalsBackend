const router = require("express").Router();

const createUserController = require("../controllers/userControllers/createUser");
const getUsers = require("../controllers/userControllers/getAllUsers");
const getSingleUser = require("../controllers/userControllers/getSingleUser");
const getLoginStatus = require("../controllers/userControllers/loginStatus");
const loginUser = require("../controllers/userControllers/loginUser");
const logOutUser = require("../controllers/userControllers/logOutUser");
const {
  updateUserData,
  updateUserPhoto,
} = require("../controllers/userControllers/UpdataUser");
const admin = require("../middlewares/adminMiddleware");
const protect = require("../middlewares/authMiddleware");

router.post("/api/createuser", createUserController);
router.post("/api/login", loginUser);
router.get("/api/users", getUsers);
router.get("/api/loginstatus", getLoginStatus);
router.get("/api/logout", logOutUser);
router.get("/api/user", protect, getSingleUser);
router.put("/api/updateuser", protect, updateUserData);
router.put("/api/updateuserphoto", protect, updateUserPhoto);

module.exports = router;
