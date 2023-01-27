require("dotenv").config();
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const product = require("../models/productModel");


const tokenKey = process.env.TOKEN_KEY;

const verifyToken = (req) => {
  const token = req.cookies.jwt;

  //verify token
  jwt.verify(token, tokenKey, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      // redirect to login
      res.redirect("/login");
    } else {
      return decodedToken;
    }
  });
};

const isUser = (req, res, next) => {
  // get id from decoded token
  const id = verifyToken(req);

  //find user with decoded id
  user.findById(id)
    .then((user) => {
      // continue execution of route
      next();
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Access Denied, Not Authorized" });
    });
};

const isproduct = (req, res, next) => {
  // get id from decoded token
  const id = verifyToken(req);

  //find product with decoded id
  product.findById(id)
    .then((product) => {
      // continue execution of route
      next();
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "product not found, Try again" });
    });
};

module.exports = {
  isuser,
  isproduct,
};
