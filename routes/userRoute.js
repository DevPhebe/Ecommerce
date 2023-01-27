const express = require("express");
const userController = require("../controllers/usercontroller");
const router = express();

router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup_post);

router.get("/login", userController.login_get);
router.post("/login", userController.login_post);

router.get("/users/:id", userController.get_singleUser);

router.delete("/user/:id", userController.delete_user)

module.exports = router;
