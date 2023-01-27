const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.signup_get =(req,res) => {
  res.render('signup');
};

// signup user
module.exports.signup_post = async (req, res) => {

  // get firstname, lastname, email, password from request object
  let { firstname, lastname, email, password } = req.body;
  
  //   generate salt to the password
  const salt = await bcrypt.genSalt();

  //   hash the password
  password = await bcrypt.hash(password, salt);

  //   create a new user in database
  try {
    const user = await User.create({
       firstname,
       lastname,
       email,
       password,
    });
      if (user.role === 'cashier') {
        res.render('cashier/cashierdashboard', {user})

      } else {
        res.render('manager/managerdashboard', {user})
      }
    // res.status(201).json(user);
    
  } catch (error) {
    res.status(401).json({ message: "error user not created" });
  }
};

module.exports.login_get =(req, res) => {
  res.render('login');
};
// login user
module.exports.login_post = async (req, res) => {
  // get email & password from request object
  const { email, password } = req.body;

  //   find user by email
  try {
    const user = await User.findOne({ email });
    // check if password is correct
    if (user) {
      // compare password with hashed password
      const auth = await bcrypt.compare(password, user.password);

      if (auth) {

        if (user.role === 'cashier') {
          res.render('cashier/cashierdashboard', {user})

        } else {
          res.render('manager/managerdashboard', {user})
        }

      } else {
        res.status(400).json({ message: "Invalid login datails" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "no user with that email" });
  }
};

// find a single user
module.exports.get_singleUser = async (req, res) => {
  const _id = req.params.id;

  const user = await User.findById(_id);
  if (user) {
    return res.status(201).json(user);
  } else {
    res.status(401).json({ message: "error in getting user" });
  }
};

//  Delete user
module.exports.delete_user = (req, res) => {
  const _id = req.params.id;

  User.findByIdAndDelete(_id)
    .then(() => {
      res.status(200).json({ message: "user deleted" });
    })
    .catch(() => {
      res.status(400).json({ message: "error user not deleted" });
    });
};


