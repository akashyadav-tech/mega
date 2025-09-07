const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const upload = require("../middleware/upload");

const router = express.Router();

// REGISTER
router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      photo: req.file ? "/uploads/" + req.file.filename : null
    });

    await newUser.save();

    res.json({ 
      msg: "Registered successfully",
      user: { name: newUser.name, email: newUser.email, photo: newUser.photo }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error: " + err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ 
    msg: "Login successful", 
    token, 
    user: { name: user.name, email: user.email, photo: user.photo } 
  });
});

module.exports = router;
