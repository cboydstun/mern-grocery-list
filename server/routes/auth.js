//import dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

//import security middleware
const requireAuth = require("../middleware/auth");

// User Model
const User = require("../models/User");

// @POST - api/auth - authenticate user - Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    //Simple Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    //check for existing user
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exists" });
    }

    await user.comparePassword(password);
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(401).send({ error: "Invalid password or email" });
  }
});

//@GET - /api/auth/user - get user information - Private
router.get("/user", requireAuth, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;