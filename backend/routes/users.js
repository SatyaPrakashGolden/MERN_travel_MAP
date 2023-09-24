const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
router.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        if (!req.body.password) {
            throw new Error('Password is required');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      res.status(200).json({ _id: user._id, username: user.username });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error in login" });
    }
  });
module.exports = router;