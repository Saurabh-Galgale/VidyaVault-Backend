const express = require("express");
const router = express.Router();
const {
    signup,
    signin,
    createCourse,
    upload,
    getFeed,
    getUser,
    Subscribe
} = require("../controllers/controller");
const { auth } = require("../authorization/auth");

router.route("/signup").post(signup);
router.route("/signin").post(signin);

router.route("/cc/:id").post(createCourse);
// router.route("/upload").post(auth, upload);

router.route("/feed").get(getFeed);
router.route("/user/:id").get(getUser);
router.route("/user/subscribe/:id").post(Subscribe);





// router.route("/income/all").post(authenticate, getIncomeByUser);
// router.route("/income/add").post(authenticate, incomeAdd);
// router.route("/income/delete/:incomeId").delete(authenticate, incomeDelete);

// router.route("/expense/all").post(authenticate, getExpenseByUser);
// router.route("/expense/add").post(authenticate, expenseAdd);
// router.route("/expense/delete/:expenseId").delete(authenticate, expenseDelete);

// router.route("/summary").post(authenticate, getSummaryReport);

module.exports = router;
