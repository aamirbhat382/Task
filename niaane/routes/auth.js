const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const { signup, signin } = require("../controllers/auth");

// Signup
router.post(
  "/signup",
  [
    check("name", "Name should be at least 3  ").isLength({ min: 5 }),
    check("email", "Email is required").isEmail(),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long"),
  ],
  signin
);

// Signin
// router.post(
//   "/signin",
//   [
//     check("email", "Email is required").isEmail(),
//     check('password' , "Password is required")
//     .isLength({ min: 5 })
//     .withMessage('Password must be at least 5 chars long')
//
//   ],
//
//   signin
// );

// Signout
// router.get("/signout", signout);

module.exports = router;
