const express = require("express");
const {
    signup,
    signin,
    getUser,
    updateUser,
    userResetPass,
} = require("../controllers/UserController");
const { auth } = require("../authorization/auth");
const {
    adminSignup,
    adminResetPass } = require("../controllers/AdminController");

const router = express.Router();

// user routes
router.route("/user/signup").post(signup);
router.route("/user/signin").post(signin);
router.route("/user/resetpassword").post(userResetPass);
router.route("/user/:id").get(auth, getUser);
router.route("/user/:id").post(auth, updateUser);

// Admin routes
router.route("/admin/signup").post(adminSignup);
router.route("/admin/signin").post(signin);
router.route("/admin/resetpassword").post(adminResetPass);
router.route("/admin/:id").get(auth, getUser);
router.route("/admin/:id").post(auth, updateUser);


module.exports = router;