//import dependencies
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//import User Model
const User = require("../models/User");

// @POST - api/users - register new user - Public
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Simple Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    //check for existing user
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({ name, email, password });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (err) {
    return res.status(422).send(err);
  }
});

module.exports = router;